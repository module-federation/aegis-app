exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! namespace exports */
/*! export WebSwitch [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/webswitch.js .WebSwitch */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSwitch": () => /* reexport safe */ _webswitch__WEBPACK_IMPORTED_MODULE_0__.WebSwitch
/* harmony export */ });
/* harmony import */ var _webswitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webswitch */ "./src/config/webswitch.js");


/***/ }),

/***/ "./src/config/webswitch.js":
/*!*********************************!*\
  !*** ./src/config/webswitch.js ***!
  \*********************************/
/*! namespace exports */
/*! export WebSwitch [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSwitch": () => /* binding */ WebSwitch
/* harmony export */ });
/* harmony import */ var _domain_webswitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/webswitch */ "./src/domain/webswitch.js");



/**
 * @type {import('../domain').ModelSpecification}
 */

var WebSwitch = {
  modelName: 'webswitch',
  endpoint: 'service-mesh',
  factory: _domain_webswitch__WEBPACK_IMPORTED_MODULE_0__.makeClient,
  internal: true,
  ports: {
    serviceLocatorInit: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    serviceLocatorAsk: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    serviceLocatorListen: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    serviceLocatorAnswer: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketConnect: {
      service: 'websocket',
      stype: 'outbound',
      timeout: 3000
    },
    websocketPing: {
      service: 'websocket',
      stype: 'outbound',
      timeout: 3000
    },
    websocketSend: {
      service: 'websocket',
      type: 'outbound',
      timeout: 3000
    },
    websocketClose: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketStatus: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketTerminate: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketDisconnected: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnClose: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnOpen: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnMessage: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnError: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnPong: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    }
  }
};

/***/ }),

/***/ "./src/domain/bind-adapters.js":
/*!*************************************!*\
  !*** ./src/domain/bind-adapters.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ makeAdapters
/* harmony export */ });


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeAdapters(ports, adapters, services) {
  if (!ports || !adapters) {
    return;
  }

  return Object.keys(ports).map(function (port) {
    if (!adapters[port]) {
      return;
    }

    try {
      return _defineProperty({}, port, adapters[port](services[ports[port].service]));
    } catch (e) {
      console.warn(e.message);
    }
  }).reduce(function (p, c) {
    return _objectSpread(_objectSpread({}, p), c);
  });
}

/***/ }),

/***/ "./src/domain/index.js":
/*!*****************************!*\
  !*** ./src/domain/index.js ***!
  \*****************************/
/*! namespace exports */
/*! export models [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "models": () => /* binding */ models
/* harmony export */ });
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins */ "./src/domain/mixins.js");
/* harmony import */ var _bind_adapters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bind-adapters */ "./src/domain/bind-adapters.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services */ "./src/services/index.js");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters */ "./src/adapters/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./src/config/index.js");

/**
 * @typedef {string} eventName
 */

/**
 * @typedef  Model
 * @property {string} _Symbol_id - immutable/private uuid
 * @property {string} _Symbol_modelName - immutable/private name
 * @property {string} _Symbol_createTime - immutable/private createTime
 * @property {onUpdate} _Symbol_onUpdate - immutable/private update function
 * @property {onDelete} _Symbol_onDelete
 * @property {function(Object)} update - use this function to update model
 * specify changes in an object
 * @property {function()} toJSON - de/serialization logic
 * @property {function(eventName,function(eventName,Model):void)} addListener listen for domain events
 * @property {function(eventName,Model):Promise<void>} emit emit domain event
 * @property {function(function():Promise<Model>):Promise<Model>} [port] - when a
 * port is configured, the framework generates a function to invoke it. When data
 * arrives on the port, depending on the implementation, the port's adapter invokes
 * the callback specified in the port configuration, or as an argument to the port
 * function. The callback returns an updated Model, and control is returned to the
 * caller. Optionally, an event is fired to trigger the next port function to run
 * @property {function():Promise<any>} [relation] - when you configure a relation,
 * the framework generates a function that your code can call to run the query
 * @property {function(*):*} [command] - the framework will call any model method
 * you specify when passed as a parameter or query in an API call.
 */

/**
 * @callback onUpdate called to handle model updates
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback onDelete
 * @param {Model} model
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback validate called to handle model updates
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback onLoad
 * @param {Model} savedModel rehydrated model
 * @returns {Model | Error} updated model or throw
 */

/**
 * @typedef {string} service - name of the service object to inject in adapter
 * @typedef {number} timeout - call to adapter will timeout after `timeout` milliseconds
 *
 * @typedef {{
 *  [x: string]: {
 *    service: service,
 *    timeout?: timeout,
 *    callback?: function({model: Model})
 *    errorCallback?: function({model: Model, port: string, error:Error}),
 *    timeoutCallback?: function({model: Model, port: string}),
 *    consumesEvent?:string,
 *    producesEvent?:string,
 *    type?:'inbound'|'outbound',
 *    disabled?: boolean,
 *    adapter?: string,
 *    circuitBreaker?: thresholds
 *  }
 * }} ports - input/output ports for the domain
 */

/**
 * @typedef {{
 *  [x:string]: {
 *    errorRate:number
 *    callVolume:number,
 *    intervalMs:number,
 *    fallbackFn:function()
 *  },
 * }} thresholds - thresholds for different errors
 */

/**
 * @typedef {{
 *  [x: string]: {
 *    modelName:string,
 *    type:"oneToMany"|"oneToOne"|"manyToOne",
 *    foreignKey:any,
 *  }
 * }} relations - define related domain entities
 *
 * @typedef {Array<function({
 *  eventName:string,
 *  eventType:string,
 *  eventTime:string,
 *  modelName:string,
 *  model:Model
 * }):Promise<void>>} eventHandler - callbacks invoked to handle domain and
 * application events
 */

/**
 *
 * @typedef {string} key
 * @typedef {*} value
 */

/**
 * @typedef {{
 *  on: "serialize" | "deserialize",
 *  key: string | RegExp | "*" | (function(key,value):boolean)
 *  type: "string" | "object" | "number" | "function" | "any" | (function(key,value):boolean)
 *  value(key, value):value
 * }} serializer
 */

/**
 * @typedef {{
 *  [x:string]: {
 *    allow:string|function(*):boolean|Array<string|function(*):boolean>
 *    deny:string|function(*):boolean|Array<string|function(*):boolean>
 *    type:"role"|"relation"|"command"
 *    desc?:string
 *  }
 * }} accessControlList
 */

/**
 * @typedef {{
 *  [x: string]: {
 *    command:string|function(Model):Promise<any>,
 *    acl:accessControlList[]
 *  }
 * }} commands - configure functions to execute when specified in a
 * URL parameter or query of the auto-generate REST API
 */

/**
 * @callback controller
 * @param {Request} req
 * @param {Response} res
 */

/**
 * @typedef {{
 *  [path: string]: {
 *    get?: controller,
 *    post?: controller,
 *    patch?: controller,
 *    delete?:controller
 *   }
 * }} endpoints
 */

/**
 * @callback modelSpecFactoryFn
 * @param {object} dependencies
 * @returns {function(...args):Readonly<object>}
 */

/**
 * @typedef {object} ModelSpecification Specify domain model properties and functions
 * @property {string} modelName name of model (case-insenstive)
 * @property {string} endpoint URI reference (e.g. plural of `modelName` noun)
 * @property {modelSpecFactoryFn} factory returns factory function that creates the model instance
 * @property {object} [dependencies] injected into the model for inverted dependency/control
 * @property {Array<import("./mixins").functionalMixin>} [mixins] - use functional mixins
 * to compose the object from common domain logic, like input validation.
 * @property {onUpdate} [onUpdate] - Function called to handle update requests. Called
 * before save.
 * @property {onDelete} [onDelete] - Function called before deletion.
 * @property {validate} [validate] - called to validate model updates
 * @property {ports} [ports] - input/output ports for the domain
 * @property {eventHandler[]} [eventHandlers] - callbacks invoked to handle application
 * events, e.g. CRUD events
 * @property {serializer[]} [serializers] - use for custom de/serialization of the model
 * when reading or writing to storage or network
 * @property {relations} [relations] - create related models or query in aggregate
 * @property {commands} [commands] - define functions to execute when specified in a
 * URL parameter or query of the auto-generated REST API
 * @property {accessControlList} [accessControlList] - configure authorization
 * @property {endpoints} [routes] - additional custom API endpoints - specify inbound port
 * @property {{factory:import("../adapters/datasources/datasource-mongodb"),url:string,credentials?:string}} [datasource] - custom datasource
 * for this model. If not set, the default set by the server is used.
 *
 */

/**
 * @callback addModqqqqel
 * @param {{ searchTerm1, searchTerm2, searchTermN }} input
 * @returns {Promise<Model>}
 */

/**
 * @callback editModel
 * @param {{ id:string, changes:object }} input
 * @returns { Promise<Model> }
 */

/**
 * @callback findModel
 * @param {{ id:string, query:object }} input
 * @returns { Promise<Model> }
 */

/**
 * @callback findRelatedModels
 * @param {{ query:object, relation:string }} input
 * @returns { Promise<{Model,[Model]}> }
 */

/**
 * @callback listModels
 * @param {{ query:object }} input e.g. { searchTerm1 : 'val', ...etc }
 * @returns { [Promise<Model>] }
 */

/**
 * @callback executeCommand
 * @param {{ id:string }} input
 * @returns { Model }
 */

/**
 * @typedef DomainPortAPI
 * @property { addModel } addModel
 * @property { editModel } editModel
 * @property { listModels } listModels
 * @property { findModel } findModel
 * @property { findRelatedModels } findModel
 * @property { removeModel } removeModel
 * @property { executeCommand } executeCommand
 */

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // Service dependencies


 // Models


/**
 *
 * @param {ModelSpecification} spec
 */

function validateSpec(spec) {
  var missing = ['modelName', 'endpoint', 'factory'].filter(function (key) {
    return !spec[key];
  });

  if ((missing === null || missing === void 0 ? void 0 : missing.length) > 0) {
    throw new Error("missing properties: ".concat(missing, ", spec: ").concat(Object.entries(spec)));
  }
}
/**
 * @param {ModelSpecification} spec
 * @param {*} dependencies - services injected
 */


function makeModel(spec) {
  validateSpec(spec);
  var mixins = spec.mixins || [];
  var dependencies = spec.dependencies || {};
  return _objectSpread(_objectSpread({}, spec), {}, {
    mixins: mixins.concat(_mixins__WEBPACK_IMPORTED_MODULE_0__.default),
    dependencies: _objectSpread(_objectSpread({}, dependencies), (0,_bind_adapters__WEBPACK_IMPORTED_MODULE_1__.default)(spec.ports, _adapters__WEBPACK_IMPORTED_MODULE_3__, _services__WEBPACK_IMPORTED_MODULE_2__))
  });
}

var models = Object.values(_config__WEBPACK_IMPORTED_MODULE_4__).map(function (spec) {
  return makeModel(spec);
});

/***/ }),

/***/ "./src/domain/webswitch.js":
/*!*********************************!*\
  !*** ./src/domain/webswitch.js ***!
  \*********************************/
/*! namespace exports */
/*! export ServiceMeshClient [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeClient [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceMeshClient": () => /* binding */ ServiceMeshClient,
/* harmony export */   "makeClient": () => /* binding */ makeClient
/* harmony export */ });
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! os */ "os");
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "webpack/sharing/consume/default/nanoid/nanoid");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nanoid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var async_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! async_hooks */ "async_hooks");
/* harmony import */ var async_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(async_hooks__WEBPACK_IMPORTED_MODULE_3__);
/**
 * webswitch (c)
 *
 * Websocket clients connect to a common ws server,
 * called a webswitch. When a client sends a message,
 * webswitch broadcasts the message to all other
 * connected clients, including a special webswitch
 * server that acts as an uplink to another network,
 * if one is defined. A Webswitch server can also
 * receive messgages from an uplink and will broadcast
 * those messages to its clients as well.
 */


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var HOSTNAME = 'webswitch.local';
var SERVICENAME = 'webswitch';
var TIMEOUTEVENT = 'webswitchTimeout';
var CONNECTERROR = 'webswitchConnect';
var WSOCKETERROR = 'webswitchWsocket';
var isPrimary = /true/i.test(process.env.SWITCH);
var isBackup = /true/i.test(process.env.BACKUP);
var debug = /true/i.test(process.env.DEBUG);
var heartbeatMs = 10000;
var sslEnabled = /true/i.test(process.env.SSL_ENABLED);
var clearPort = process.env.PORT || 80;
var cipherPort = process.env.SSL_PORT || 443;
var activePort = sslEnabled ? cipherPort : clearPort;
var activeProto = sslEnabled ? 'wss' : 'ws';
var activeHost = process.env.DOMAIN || os__WEBPACK_IMPORTED_MODULE_0___default().hostname();
var proto = isPrimary ? activeProto : process.env.SWITCH_PROTO;
var port = isPrimary ? activePort : process.env.SWITCH_PORT;
var host = isPrimary ? activeHost : process.env.SWITCH_HOST;
var apiProto = sslEnabled ? 'https' : 'http';
var apiUrl = "".concat(apiProto, "://").concat(activeHost, ":").concat(activePort);

function localUrl() {
  var url = "".concat(proto, "://").concat(host, ":").concat(port);

  if (proto && host && port) {
    return url;
  }

  if (isPrimary) throw new Error("invalid url ".concat(url));
  return null;
}

var States = {
  STARTING: Symbol('starting'),
  CONNECTED: Symbol('connected'),
  DISCONNECTED: Symbol('disconnected'),
  DISPOSED: Symbol('disposed')
};
/**
 * use binary messages
 */

var primitives = {
  encode: {
    object: function object(msg) {
      return Buffer.from(JSON.stringify(msg));
    },
    string: function string(msg) {
      return Buffer.from(JSON.stringify(msg));
    },
    number: function number(msg) {
      return Buffer.from(JSON.stringify(msg));
    },
    symbol: function symbol(msg) {
      return console.log('unsupported', msg);
    },
    undefined: function undefined(msg) {
      return console.log('undefined', msg);
    }
  },
  decode: {
    object: function object(msg) {
      return JSON.parse(Buffer.from(msg).toString());
    },
    string: function string(msg) {
      return JSON.parse(Buffer.from(msg).toString());
    },
    number: function number(msg) {
      return JSON.parse(Buffer.from(msg).toString());
    },
    symbol: function symbol(msg) {
      return console.log('unsupported', msg);
    },
    undefined: function undefined(msg) {
      return console.error('undefined', msg);
    }
  }
};
/**
 * Service mesh client impl. Uses websocket and service-locator
 * adapters through ports injected into the {@link mesh} model.
 * Cf. modelSpec by the same name, i.e. `webswitch`. Extends
 * {@link AsyncResource} to handle system reload on the main
 * thread, in which two instances are active for a short time.
 */

var ServiceMeshClient = /*#__PURE__*/function (_AsyncResource) {
  _inherits(ServiceMeshClient, _AsyncResource);

  var _super = _createSuper(ServiceMeshClient);

  function ServiceMeshClient(mesh) {
    var _this;

    _classCallCheck(this, ServiceMeshClient);

    _this = _super.call(this, 'webswitch');
    _this.url = localUrl();
    _this.mesh = mesh;
    _this.name = SERVICENAME;
    _this.isPrimary = isPrimary;
    _this.isBackup = isBackup;
    _this.pong = new Map();
    _this.heartbeatTimer = new Map();
    _this.state = new Map();
    _this.broker = new (events__WEBPACK_IMPORTED_MODULE_1___default())();
    _this.headers = {
      'x-webswitch-host': os__WEBPACK_IMPORTED_MODULE_0___default().hostname(),
      'x-webswitch-role': 'node',
      'x-webswitch-pid': process.pid
    };
    return _this;
  }
  /**
   *
   * @param {number} asyncId id's instance to kill
   * @returns {{telemetry:{mem:number,cpu:number}}}
   */


  _createClass(ServiceMeshClient, [{
    key: "telemetry",
    value: function telemetry(asyncId) {
      return {
        eventName: 'telemetry',
        proto: this.name,
        apiUrl: apiUrl,
        heartbeatMs: heartbeatMs,
        hostname: os__WEBPACK_IMPORTED_MODULE_0___default().hostname(),
        role: 'node',
        pid: process.pid,
        telemetry: _objectSpread(_objectSpread({}, process.memoryUsage()), process.cpuUsage()),
        services: this.mesh.listServices(),
        socketState: this.mesh.websocketStatus() || 'undefined',
        clientState: this.state.toString(),
        asyncId: asyncId
      };
    }
    /**
     * Zero-config, self-forming mesh network:
     * Discover URL of service to connect to or, if
     * this is the service, multicast this url
     * @returns {Promise<string>} url
     */

  }, {
    key: "resolveUrl",
    value: function () {
      var _resolveUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.debug('resolveUrl called');
                _context.next = 3;
                return this.mesh.serviceLocatorInit({
                  serviceUrl: localUrl(),
                  name: this.name,
                  primary: this.isPrimary,
                  backup: this.isBackup
                });

              case 3:
                if (!this.isPrimary) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return this.mesh.serviceLocatorAnswer();

              case 6:
                return _context.abrupt("return", localUrl());

              case 7:
                return _context.abrupt("return", this.mesh.serviceLocatorListen());

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolveUrl() {
        return _resolveUrl.apply(this, arguments);
      }

      return resolveUrl;
    }()
    /**
     * Connect to service mesh broker and run stateful
     * callbacks in async context to distinguish the old
     * client instance from the new one created when the
     * system hot-reloads. Allow listeners to subscribe
     * to indivdual or all events. Use multicast dns to
     * resolve broker url. Send binary messages with
     * protocol and idempotentency headers. Send telemetry
     * data, including asyncId for identifying context
     * on socket close.
     *
     * @param {*} options
     * @returns
     */

  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2 = this;

        var options,
            _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {
                  binary: true
                };

                if (!(options.asyncId && this.state.get(options.asyncId) === States.DISPOSED)) {
                  _context2.next = 4;
                  break;
                }

                console.info('client is disposed');
                return _context2.abrupt("return");

              case 4:
                this.options = options;
                _context2.next = 7;
                return this.resolveUrl();

              case 7:
                this.url = _context2.sent;
                _context2.next = 10;
                return this.mesh.websocketConnect(this.url, {
                  agent: false,
                  headers: this.headers,
                  protocol: SERVICENAME
                });

              case 10:
                this.mesh.websocketOnOpen(function () {
                  _this2.runInAsyncScope(function () {
                    _this2.state.set(_this2.asyncId(), States.CONNECTED);

                    console.log('connection open');

                    _this2.send(_this2.encode(_this2.telemetry(_this2.asyncId())));

                    _this2.broker.once('timeout', function () {
                      return _this2.timeout(_this2.asyncId());
                    });

                    _this2.heartbeat(_this2.asyncId());

                    setTimeout(function () {
                      return _this2.sendQueuedMsgs();
                    }, 3000).unref();
                  }, _this2);
                });
                this.mesh.websocketOnMessage(function (message) {
                  try {
                    var event = _this2.decode(message);

                    if (!event.eventName) {
                      debug && console.debug({
                        missingEventName: event
                      });

                      _this2.broker.emit('missingEventName', event);

                      return;
                    }

                    _this2.broker.emit(event.eventName, event);

                    _this2.broker.listeners('*').forEach(function (listener) {
                      return listener(event);
                    });
                  } catch (error) {
                    console.error({
                      fn: _this2.connect.name,
                      error: error
                    });
                  }
                });
                this.mesh.websocketOnError(function (error) {
                  _this2.emit(WSOCKETERROR, error);

                  console.error({
                    fn: _this2.connect.name,
                    error: error
                  });
                });
                this.mesh.websocketOnPong(function () {
                  return _this2.runInAsyncScope(function () {
                    return _this2.pong.set(_this2.asyncId(), true), _this2;
                  });
                });
                this.websocketOnClose(function () {
                  _this2.runInAsyncScope(function (code, reason) {
                    _this2.state.set(_this2.asyncId(), States.DISCONNECTED);

                    console.log({
                      msg: 'received close frame',
                      asyncId: _this2.asyncId(),
                      code: code,
                      reason: reason === null || reason === void 0 ? void 0 : reason.toString()
                    });
                    clearTimeout(_this2.heartbeatTimer.get(_this2.asyncId()));

                    if (code === 4040 && reason === _this2.asyncId()) {
                      console.log('got dup code for this ctx (ie obj inst): die.');
                      return;
                    }

                    setTimeout(function () {
                      console.debug('reconnect due to socket close');

                      _this2.connect({
                        asyncId: _this2.asyncId()
                      });
                    }, 10000).unref();
                  });
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "timeout",
    value: function timeout(asyncId) {
      var _this3 = this;

      console.warn('timeout');
      this.emit(TIMEOUTEVENT, this.telemetry(asyncId));
      this.mesh.websocketTerminate();
      this.state.set(asyncId, States.DISCONNECTED);
      setTimeout(function () {
        console.debug('reconnect due to timeout', asyncId);

        _this3.connect({
          asyncId: asyncId
        });
      }, 5000).unref();
    }
  }, {
    key: "heartbeat",
    value: function heartbeat(asyncId) {
      var _this4 = this;

      if (this.pong) {
        this.pong.set(asyncId, false);
        this.mesh.websocketPing();
        this.heartbeatTimer.set(asyncId, setTimeout(function () {
          return _this4.heartbeat(asyncId);
        }, heartbeatMs));
        this.heartbeatTimer.get(asyncId).unref();
      } else {
        clearTimeout(this.heartbeatTimer.get(asyncId));
        this.broker.emit('timeout', asyncId);
      }
    }
  }, {
    key: "encode",
    value: function encode(msg) {
      var encoded = primitives.encode[_typeof(msg)](msg);

      debug && console.debug({
        encoded: encoded
      });
      return encoded;
    }
  }, {
    key: "decode",
    value: function decode(msg) {
      var decoded = primitives.decode[_typeof(msg)](msg);

      debug && console.debug({
        decoded: decoded
      });
      return decoded;
    }
    /**
     * Convert message to binary and send with protocol and idempotency headers.
     * If message cannot be sent because of connection state or buffering queue
     * message in domain object for retry later. Using a domain object ensures
     * persistence of the queue.
     *
     * @param {object} msg
     * @returns {Promise<boolean>} true if sent, false if not
     */

  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(msg) {
        var sent;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.mesh.websocketSend(this.encode(msg), {
                  binary: true,
                  headers: _objectSpread(_objectSpread({}, this.headers), {}, {
                    'idempotency-key': (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)()
                  })
                });

              case 2:
                sent = _context3.sent;

                if (!sent) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", true);

              case 5:
                this.mesh.pushSendQueue(msg);
                return _context3.abrupt("return", false);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
    /**
     * Send any messages buffered in `sendQueue`.
     */

  }, {
    key: "sendQueuedMsgs",
    value: function () {
      var _sendQueuedMsgs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var sent;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                sent = true;

              case 2:
                if (!(this.mesh.sendQueueLength() > 0 && sent)) {
                  _context4.next = 9;
                  break;
                }

                console.debug('sending queued message');
                _context4.next = 6;
                return this.send(this.mesh.popSendQueue());

              case 6:
                sent = _context4.sent;
                _context4.next = 2;
                break;

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                console.error({
                  fn: this.sendQueuedMsgs.name,
                  error: _context4.t0
                });

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function sendQueuedMsgs() {
        return _sendQueuedMsgs.apply(this, arguments);
      }

      return sendQueuedMsgs;
    }()
    /**
     * Connects if needed then sends message to mesh broker service.
     * @param {*} msg
     */

  }, {
    key: "publish",
    value: function () {
      var _publish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(msg) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.mesh.websocketDisconnected()) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.connect();

              case 3:
                return _context5.abrupt("return", this.send(msg));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function publish(_x2) {
        return _publish.apply(this, arguments);
      }

      return publish;
    }()
    /**
     * Register handler to fire on event.
     * @param {string} eventName
     * @param {function()} callback
     */

  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      this.broker.on(eventName, callback);
    }
    /**
     * A new object will be created on system reload.
     * Dispose of the old one. Run in context to
     * distinguish between the new and old instance.
     *
     * @param {*} code
     * @param {*} reason
     */

  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(code, reason) {
        var _this5 = this;

        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.runInAsyncScope( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          console.debug('closing socket, asyncId:', _this5.asyncId());

                          _this5.mesh.websocketClose(code, reason);

                          _this5.state.set(_this5.asyncId(), States.DISPOSED);

                          _context6.next = 5;
                          return _this5.mesh.save();

                        case 5:
                          // save queued messages
                          _this5.broker.removeAllListeners();

                          _this5.emitDestroy();

                        case 7:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                })), this);

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function close(_x3, _x4) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return ServiceMeshClient;
}(async_hooks__WEBPACK_IMPORTED_MODULE_3__.AsyncResource);
/**
 * Domain model factory function. This model is
 * used internally by the Aegis framework as a
 * pluggable service mesh client. Implement the
 * the methods below to create a new plugin.
 *
 * @param {*} dependencies injected depedencies
 * @returns
 */

function makeClient(dependencies) {
  var client;
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_ref2) {
      var listServices;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              listServices = _ref2.listServices;
              return _context11.abrupt("return", {
                listServices: listServices,
                sendQueue: [],
                sendQueueMax: 1000,
                sendQueueLength: function sendQueueLength() {
                  return this.sendQueue.length;
                },
                pushSendQueue: function pushSendQueue(msg) {
                  this.sendQueue.push(msg);
                },
                popSendQueue: function popSendQueue() {
                  return this.sendQueue.pop();
                },
                getClient: function getClient() {
                  if (client) return client;
                  client = new ServiceMeshClient(this);
                  return client;
                },
                connect: function connect(options) {
                  var _this6 = this;

                  return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
                    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _this6.getClient().connect(options);

                          case 1:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }))();
                },
                publish: function publish(event) {
                  var _this7 = this;

                  return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
                    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _this7.getClient().publish(event);

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }))();
                },
                subscribe: function subscribe(eventName, handler) {
                  this.getClient().subscribe(eventName, handler);
                },
                close: function close(code, reason) {
                  var _this8 = this;

                  return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _this8.getClient().close(code, reason);

                          case 1:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }))();
                }
              });

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }();
}

/***/ })

};
;
//# sourceMappingURL=829.js.map