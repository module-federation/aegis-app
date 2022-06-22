exports.id = 59;
exports.ids = [59];
exports.modules = {

/***/ "./registry/default/remote-entries/cache.js":
/*!**************************************************!*\
  !*** ./registry/default/remote-entries/cache.js ***!
  \**************************************************/
/*! default exports */
/*! export cache [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

var __dirname = "/";
exports.cache = [{
  name: 'distributed-cache',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'cache',
  path: __dirname,
  type: 'model-cache' // importRemote: async () => import('distributed-cache/model-cache')

}, {
  name: 'adapter-cache',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'cache',
  path: __dirname,
  type: 'adapter-cache' //importRemote: async () => import('distributed-cache/adapter-cache')

}, {
  name: 'service-cache',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'cache',
  path: __dirname,
  type: 'service-cache' //importRemote: async () => import('distributed-cache/service-cache')

}];

/***/ }),

/***/ "./registry/default/remote-entries/customer.js":
/*!*****************************************************!*\
  !*** ./registry/default/remote-entries/customer.js ***!
  \*****************************************************/
/*! default exports */
/*! export customer [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

var __dirname = "/";
/**
 * @typedef {import("../remote-entries-type").remoteEntry} entry
 */

/** @type {entry[]} */
exports.customer = [{
  name: 'customer',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'customer',
  path: __dirname,
  type: 'model' //importRemote: async () => import('customer/models')

}, {
  name: 'adapters',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'customer',
  path: __dirname,
  type: 'adapter' //importRemote: async () => import('customer/adapters')

}, {
  name: 'services',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'customer',
  path: __dirname,
  type: 'service' // importRemote: async () => import('customer/services')

}];

/***/ }),

/***/ "./registry/default/remote-entries/index.js":
/*!**************************************************!*\
  !*** ./registry/default/remote-entries/index.js ***!
  \**************************************************/
/*! default exports */
/*! export cache [provided] [no usage info] [provision prevents renaming (no use info)] -> ./registry/default/remote-entries/cache.js */
/*!   export cache [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export customer [provided] [no usage info] [provision prevents renaming (no use info)] -> ./registry/default/remote-entries/customer.js */
/*!   export customer [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export order [provided] [no usage info] [provision prevents renaming (no use info)] -> ./registry/default/remote-entries/order.js */
/*!   export order [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export wasm [provided] [no usage info] [provision prevents renaming (no use info)] -> ./registry/default/remote-entries/wasm.js */
/*!   export wasm [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.cache = __webpack_require__(/*! ./cache */ "./registry/default/remote-entries/cache.js");
exports.customer = __webpack_require__(/*! ./customer */ "./registry/default/remote-entries/customer.js");
exports.order = __webpack_require__(/*! ./order */ "./registry/default/remote-entries/order.js");
exports.wasm = __webpack_require__(/*! ./wasm */ "./registry/default/remote-entries/wasm.js");

/***/ }),

/***/ "./registry/default/remote-entries/order.js":
/*!**************************************************!*\
  !*** ./registry/default/remote-entries/order.js ***!
  \**************************************************/
/*! default exports */
/*! export order [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __dirname = "/";

/**
 * @typedef {import("../remote-entries-type").remoteEntry} entry
 */

/** @type {entry[]} */

exports.order = [{
  name: 'order',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'master',
  path: __dirname,
  type: 'model',
  importRemote: function importRemote() {
    return __webpack_require__(/*! ../../../src/config/order.js */ "./src/config/order.js");
  }
}, {
  name: 'adapters',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'order',
  path: __dirname,
  type: 'adapter',
  importRemote: function importRemote() {
    return __webpack_require__(/*! ../../../src/adapters */ "./src/adapters/index.js");
  }
}, {
  name: 'services',
  url: 'https://api.github.com',
  repo: 'aegis-application',
  owner: 'module-federation',
  filedir: 'dist',
  branch: 'order',
  path: __dirname,
  type: 'service',
  importRemote: function importRemote() {
    return __webpack_require__(/*! ../../../src/services */ "./src/services/index.js");
  }
}];

/***/ }),

/***/ "./registry/default/remote-entries/wasm.js":
/*!*************************************************!*\
  !*** ./registry/default/remote-entries/wasm.js ***!
  \*************************************************/
/*! default exports */
/*! export wasm [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __dirname = "/";

/**
 * @typedef {import("../remote-entries-type").remoteEntry} entries
 */

var importWebAssembly = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@module-federation/aegis'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).adapters.webassembly.importWebAssembly;
/** @type {entries[]} */


exports.wasm = [{
  name: 'wasm',
  url: 'https://api.github.com',
  repo: 'aegis',
  owner: 'module-federation',
  filedir: 'wasm/build',
  branch: 'main',
  wasm: true,
  path: __dirname,
  type: 'model',
  importRemote: function importRemote() {
    return importWebAssembly(this);
  }
}];

/***/ })

};
;
//# sourceMappingURL=59.js.map