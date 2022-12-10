import { watch } from 'node:fs'
import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

/**
 * Get all files in `dir` and in all directories it contains
 * @param {string} dir directory to read
 * @returns
 */
async function walk (dir) {
  let files = await fs.readdir(dir)

  files = await Promise.all(
    files.map(async file => {
      const filePath = path.join(dir, file)
      const stats = await fs.stat(filePath)
      if (stats.isDirectory()) return walk(filePath)
      else if (stats.isFile()) return filePath
    })
  )

  return files.reduce((all, contents) => all.concat(contents), [])
}

let run = true

function action (file, cb, ms) {
  return function (eventType, filename) {
    console.log(eventType, filename)
    if (ms) {
      if (!run) return
      run = false
      setTimeout(() => (run = true && exec(file, cb)), ms)
    } else {
      exec(file, cb)
    }
  }
}

function log (error, stdout, stdin) {
  if (error) return console.error(error)
  console.log(stdout || stdin)
}

/**
 * Watch for changes to source files. For any change, recompile and hot reload.
 * @param {string} filePath - relative path to file from pwd
 */
function monitor (filePath, cb, options = {}) {
  console.debug('watching ', filePath)
  watch(filePath, options, cb)
}

if (/linux/i.test(os.platform()))
  walk('./src').then(files =>
    files.forEach(file => monitor(file, action('./watch.sh', log, 500)))
  )
else monitor('./src', action('./watch.sh', log), { recursive: true })
