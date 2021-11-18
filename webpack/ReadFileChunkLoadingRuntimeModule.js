/*
	MIT License http://www.opensource.org/licenses/mit-license.php
*/

'use strict'

const RuntimeGlobals = require('webpack/lib/RuntimeGlobals')
const RuntimeModule = require('webpack/lib/RuntimeModule')
const Template = require('webpack/lib/Template')
const {
  chunkHasJs,
  getChunkFilenameTemplate
} = require('webpack/lib/javascript/JavascriptModulesPlugin')
const compileBooleanMatcher = require('webpack/lib/util/compileBooleanMatcher')
const { getUndoPath } = require('webpack/lib/util/identifier')

class ReadFileChunkLoadingRuntimeModule extends RuntimeModule {
  constructor (runtimeRequirements) {
    super('readFile chunk loading', 10)
    this.runtimeRequirements = runtimeRequirements
  }

  /**
   * @returns {string} runtime code
   */
  generate () {
    const { chunk } = this
    const { chunkGraph, runtimeTemplate } = this.compilation
    const fn = RuntimeGlobals.ensureChunkHandlers
    const withExternalInstallChunk = this.runtimeRequirements.has(
      RuntimeGlobals.externalInstallChunk
    )
    const withLoading = this.runtimeRequirements.has(
      RuntimeGlobals.ensureChunkHandlers
    )
    const withHmr = this.runtimeRequirements.has(
      RuntimeGlobals.hmrDownloadUpdateHandlers
    )
    const withHmrManifest = this.runtimeRequirements.has(
      RuntimeGlobals.hmrDownloadManifest
    )
    const hasJsMatcher = compileBooleanMatcher(
      chunkGraph.getChunkConditionMap(chunk, chunkHasJs)
    )

    const outputName = this.compilation.getPath(
      getChunkFilenameTemplate(chunk, this.compilation.outputOptions),
      {
        chunk,
        contentHashType: 'javascript'
      }
    )
    const rootOutputDir = getUndoPath(outputName, false)

    return Template.asString([
      `
const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: token });

function githubFetch(url) {
  console.info("github url", url);
  const owner = url.searchParams.get("owner");
  const repo = url.searchParams.get("repo");
  const filedir = url.searchParams.get("filedir");
  const branch = url.searchParams.get("branch");
  return new Promise(function (resolve, reject) {
    octokit
      .request(
        "GET /repos/{owner}/{repo}/contents/{filedir}?ref={branch}",
        {
          owner,
          repo,
          filedir,
          branch
        }
      )
      .then(function (rest) {
        if (!rest?.data) {
          console.error('cannot find file')
          return
        }
        const file = rest.data.find(d => "/" + d.name === url.pathname);

        if (!file?.sha) {
          console.error('cannot read file or sha')
          return
        }
        return file.sha;
      })
      .then(function (sha) {
        if (!sha) {
          console.error('cannot find sha')
          return
        }
        console.log(sha);
        return octokit.request(
          "GET /repos/{owner}/{repo}/git/blobs/{sha}",
          {
            owner,
            repo,
            sha,
          }
        );
      })
      .then(function (rest) {
        resolve(Buffer.from(rest.data.content, "base64").toString("utf-8"));
      });
  });
}

function httpRequest(url) {
  if (/github/i.test(url.hostname)) 
    return githubFetch(url)
  return httpGet(url)
}

function httpGet(params) {
  return new Promise(function(resolve, reject) {
    var req = require(params.protocol.slice(0, params.protocol.length - 1)).request(params, function(res) {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
      }
      var body = [];
      res.on('data', function(chunk) {
        body.push(chunk);
      });
      res.on('end', function() {
        try {
          body = Buffer.concat(body).toString();
        } catch(e) {
          reject(e);
        }
        resolve(body);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });
}
`,
      '// object to store loaded chunks',
      '// "0" means "already loaded", Promise means loading',
      'var installedChunks = {',
      Template.indent(
        chunk.ids.map(id => `${JSON.stringify(id)}: 0`).join(',\n')
      ),
      '};',
      '',
      withLoading || withExternalInstallChunk
        ? `var installChunk = ${runtimeTemplate.basicFunction('chunk', [
            'var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;',
            'for(var moduleId in moreModules) {',
            Template.indent([
              `if(${RuntimeGlobals.hasOwnProperty}(moreModules, moduleId)) {`,
              Template.indent([
                `${RuntimeGlobals.moduleFactories}[moduleId] = moreModules[moduleId];`
              ]),
              '}'
            ]),
            '}',
            `if(runtime) runtime(__webpack_require__);`,
            'var callbacks = [];',
            'for(var i = 0; i < chunkIds.length; i++) {',
            Template.indent([
              'if(installedChunks[chunkIds[i]])',
              Template.indent([
                'callbacks = callbacks.concat(installedChunks[chunkIds[i]][0]);'
              ]),
              'installedChunks[chunkIds[i]] = 0;'
            ]),
            '}',
            'for(i = 0; i < callbacks.length; i++)',
            Template.indent('callbacks[i]();')
          ])};`
        : '// no chunk install function needed',
      '',
      withLoading
        ? Template.asString([
            '// ReadFile + VM.run chunk loading for javascript',
            `${fn}.readFileVm = function(chunkId, promises) { console.log(">>>>>>>>>chunkId",chunkId);`,
            hasJsMatcher !== false
              ? Template.indent([
                  '',
                  'var installedChunkData = installedChunks[chunkId];',
                  'if(installedChunkData !== 0) { // 0 means "already installed".',
                  Template.indent([
                    '// array of [resolve, reject, promise] means "currently loading"',
                    'if(installedChunkData) {',
                    Template.indent(['promises.push(installedChunkData[2]);']),
                    '} else {',
                    Template.indent([
                      hasJsMatcher === true
                        ? 'if(true) { // all chunks have JS'
                        : `if(${hasJsMatcher('chunkId')}) {`,
                      Template.indent([
                        '// load the chunk and return promise to it',
                        'var promise = new Promise(function(resolve, reject) {',
                        Template.indent([
                          'installedChunkData = installedChunks[chunkId] = [resolve, reject];',
                          `var chunkFileName = "/" + ${RuntimeGlobals.getChunkScriptFilename}(chunkId);`,
                          `var url = new (require("url").URL)(${RuntimeGlobals.publicPath})`,
                          'url.pathname = chunkFileName;',
                          `httpRequest(url)`,
                          Template.indent([
                            '.then((content) => {',
                            Template.indent([
                              'var chunk = {};',
                              "require('vm').runInThisContext('(function(exports, require, __dirname, __filename) {' + content + '\\n})', chunkFileName)" +
                                '(chunk, require, __dirname, chunkFileName);',
                              'installChunk(chunk);'
                            ]),
                            '}).catch((err) => {',
                            Template.indent(['reject(err);']),
                            '});'
                          ])
                        ]),
                        '});',
                        'promises.push(installedChunkData[2] = promise);'
                      ]),
                      '} else installedChunks[chunkId] = 0;'
                    ]),
                    '}'
                  ]),
                  '}'
                ])
              : Template.indent(['installedChunks[chunkId] = 0;']),
            '};'
          ])
        : '// no chunk loading',
      '',
      withExternalInstallChunk
        ? Template.asString([
            'module.exports = __webpack_require__;',
            `${RuntimeGlobals.externalInstallChunk} = installChunk;`
          ])
        : '// no external install chunk',
      '',
      withHmr
        ? Template.asString([
            'function loadUpdateChunk(chunkId, updatedModulesList) {',
            Template.indent([
              'return new Promise(function(resolve, reject) {',
              Template.indent([
                `var filename = require('path').join(__dirname, ${JSON.stringify(
                  rootOutputDir
                )} + ${RuntimeGlobals.getChunkUpdateScriptFilename}(chunkId));`,
                "require('fs').readFile(filename, 'utf-8', function(err, content) {",
                Template.indent([
                  'if(err) return reject(err);',
                  'var update = {};',
                  "require('vm').runInThisContext('(function(exports, require, __dirname, __filename) {' + content + '\\n})', filename)" +
                    "(update, require, require('path').dirname(filename), filename);",
                  'var updatedModules = update.modules;',
                  'var runtime = update.runtime;',
                  'for(var moduleId in updatedModules) {',
                  Template.indent([
                    `if(${RuntimeGlobals.hasOwnProperty}(updatedModules, moduleId)) {`,
                    Template.indent([
                      `currentUpdate[moduleId] = updatedModules[moduleId];`,
                      'if(updatedModulesList) updatedModulesList.push(moduleId);'
                    ]),
                    '}'
                  ]),
                  '}',
                  'if(runtime) currentUpdateRuntime.push(runtime);',
                  'resolve();'
                ]),
                '});'
              ]),
              '});'
            ]),
            '}',
            '',
            Template.getFunctionContent(
              require('webpack/lib/hmr/JavascriptHotModuleReplacement.runtime.js')
            )
              .replace(/\$key\$/g, 'readFileVm')
              .replace(/\$installedChunks\$/g, 'installedChunks')
              .replace(/\$loadUpdateChunk\$/g, 'loadUpdateChunk')
              .replace(/\$moduleCache\$/g, RuntimeGlobals.moduleCache)
              .replace(/\$moduleFactories\$/g, RuntimeGlobals.moduleFactories)
              .replace(
                /\$ensureChunkHandlers\$/g,
                RuntimeGlobals.ensureChunkHandlers
              )
              .replace(/\$hasOwnProperty\$/g, RuntimeGlobals.hasOwnProperty)
              .replace(/\$hmrModuleData\$/g, RuntimeGlobals.hmrModuleData)
              .replace(
                /\$hmrDownloadUpdateHandlers\$/g,
                RuntimeGlobals.hmrDownloadUpdateHandlers
              )
              .replace(
                /\$hmrInvalidateModuleHandlers\$/g,
                RuntimeGlobals.hmrInvalidateModuleHandlers
              )
          ])
        : '// no HMR',
      '',
      withHmrManifest
        ? Template.asString([
            `${RuntimeGlobals.hmrDownloadManifest} = function() {`,
            Template.indent([
              'return new Promise(function(resolve, reject) {',
              Template.indent([
                `var filename = require('path').join(__dirname, ${JSON.stringify(
                  rootOutputDir
                )} + ${RuntimeGlobals.getUpdateManifestFilename}());`,
                "require('fs').readFile(filename, 'utf-8', function(err, content) {",
                Template.indent([
                  'if(err) {',
                  Template.indent([
                    'if(err.code === "ENOENT") return resolve();',
                    'return reject(err);'
                  ]),
                  '}',
                  'try { resolve(JSON.parse(content)); }',
                  'catch(e) { reject(e); }'
                ]),
                '});'
              ]),
              '});'
            ]),
            '}'
          ])
        : '// no HMR manifest'
    ])
  }
}

module.exports = ReadFileChunkLoadingRuntimeModule
