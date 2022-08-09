exports.id = 867;
exports.ids = [867];
exports.modules = {

/***/ "./src/adapters/index.js":
/*!*******************************!*\
  !*** ./src/adapters/index.js ***!
  \*******************************/
/*! namespace exports */
/*! export ServiceLocator [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/service-locator.js .ServiceLocator */
/*! export serviceLocatorAnswer [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/service-locator.js .serviceLocatorAnswer */
/*! export serviceLocatorAsk [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/service-locator.js .serviceLocatorAsk */
/*! export serviceLocatorInit [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/service-locator.js .serviceLocatorInit */
/*! export serviceLocatorListen [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/service-locator.js .serviceLocatorListen */
/*! export websockeTerminate [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websockeTerminate */
/*! export websocketClose [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketClose */
/*! export websocketConnect [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketConnect */
/*! export websocketDisconnected [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketDisconnected */
/*! export websocketOnClose [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketOnClose */
/*! export websocketOnMessage [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketOnMessage */
/*! export websocketOnOpen [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketOnOpen */
/*! export websocketOnPong [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketOnPong */
/*! export websocketPing [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketPing */
/*! export websocketSend [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketSend */
/*! export websocketStatus [provided] [no usage info] [missing usage info prevents renaming] -> ./src/adapters/websocket-adapter.js .websocketStatus */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceLocator": () => /* reexport safe */ _service_locator__WEBPACK_IMPORTED_MODULE_0__.ServiceLocator,
/* harmony export */   "serviceLocatorAnswer": () => /* reexport safe */ _service_locator__WEBPACK_IMPORTED_MODULE_0__.serviceLocatorAnswer,
/* harmony export */   "serviceLocatorAsk": () => /* reexport safe */ _service_locator__WEBPACK_IMPORTED_MODULE_0__.serviceLocatorAsk,
/* harmony export */   "serviceLocatorInit": () => /* reexport safe */ _service_locator__WEBPACK_IMPORTED_MODULE_0__.serviceLocatorInit,
/* harmony export */   "serviceLocatorListen": () => /* reexport safe */ _service_locator__WEBPACK_IMPORTED_MODULE_0__.serviceLocatorListen,
/* harmony export */   "websockeTerminate": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websockeTerminate,
/* harmony export */   "websocketClose": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketClose,
/* harmony export */   "websocketConnect": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketConnect,
/* harmony export */   "websocketDisconnected": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketDisconnected,
/* harmony export */   "websocketOnClose": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketOnClose,
/* harmony export */   "websocketOnMessage": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketOnMessage,
/* harmony export */   "websocketOnOpen": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketOnOpen,
/* harmony export */   "websocketOnPong": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketOnPong,
/* harmony export */   "websocketPing": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketPing,
/* harmony export */   "websocketSend": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketSend,
/* harmony export */   "websocketStatus": () => /* reexport safe */ _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__.websocketStatus
/* harmony export */ });
/* harmony import */ var _service_locator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-locator */ "./src/adapters/service-locator.js");
/* harmony import */ var _websocket_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket-adapter */ "./src/adapters/websocket-adapter.js");




/**
 * @typedef {import('../domain').Model} Model
 * @typedef {function(function(eventCallback):Promise<Model>)} adapterFunction
 */

/***/ }),

/***/ "./src/adapters/service-locator.js":
/*!*****************************************!*\
  !*** ./src/adapters/service-locator.js ***!
  \*****************************************/
/*! namespace exports */
/*! export ServiceLocator [provided] [no usage info] [missing usage info prevents renaming] */
/*! export serviceLocatorAnswer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export serviceLocatorAsk [provided] [no usage info] [missing usage info prevents renaming] */
/*! export serviceLocatorInit [provided] [no usage info] [missing usage info prevents renaming] */
/*! export serviceLocatorListen [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceLocator": () => /* binding */ ServiceLocator,
/* harmony export */   "serviceLocatorInit": () => /* binding */ serviceLocatorInit,
/* harmony export */   "serviceLocatorAsk": () => /* binding */ serviceLocatorAsk,
/* harmony export */   "serviceLocatorListen": () => /* binding */ serviceLocatorListen,
/* harmony export */   "serviceLocatorAnswer": () => /* binding */ serviceLocatorAnswer
/* harmony export */ });
/* harmony import */ var multicast_dns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! multicast-dns */ "./node_modules/multicast-dns/index.js");
/* harmony import */ var multicast_dns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(multicast_dns__WEBPACK_IMPORTED_MODULE_0__);


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var debug = /true/i.test(process.env.DEBUG);
var ServiceLocator = /*#__PURE__*/function () {
  function ServiceLocator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        serviceUrl = _ref.serviceUrl,
        _ref$primary = _ref.primary,
        primary = _ref$primary === void 0 ? false : _ref$primary,
        _ref$backup = _ref.backup,
        backup = _ref$backup === void 0 ? false : _ref$backup,
        _ref$maxRetries = _ref.maxRetries,
        maxRetries = _ref$maxRetries === void 0 ? 20 : _ref$maxRetries,
        _ref$retryInterval = _ref.retryInterval,
        retryInterval = _ref$retryInterval === void 0 ? 8000 : _ref$retryInterval;

    _classCallCheck(this, ServiceLocator);

    this.url = serviceUrl;
    this.name = name;
    this.dns = multicast_dns__WEBPACK_IMPORTED_MODULE_0___default()();
    this.isPrimary = primary;
    this.isBackup = backup;
    this.maxRetries = maxRetries;
    this.retryInterval = retryInterval;
  }

  _createClass(ServiceLocator, [{
    key: "runningAsService",
    value: function runningAsService() {
      return this.isPrimary || this.isBackup && this.activateBackup;
    }
    /**
     * Query DNS for the webswitch service.
     * Recursively retry by incrementing a
     * counter we pass to ourselves on the
     * stack. Once the URL is populated, exit.
     *
     * @param {number} retries number of query attempts
     * @returns
     */

  }, {
    key: "ask",
    value: function ask() {
      var _this = this;

      var retries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // have we found the url?
      if (this.url) {
        console.log('url found');
        return;
      } // if designated as backup, takeover for primary after maxRetries


      if (retries > this.maxRetries && this.isBackup) {
        this.activateBackup = true;
        this.answer();
        return;
      }

      debug && console.debug('looking for srv %s retries: %d', this.name, retries); // then query the service name

      this.dns.query({
        questions: [{
          name: this.name,
          type: 'SRV'
        }]
      }); // keep asking

      setTimeout(function () {
        return _this.ask(++retries);
      }, this.retryInterval);
    }
  }, {
    key: "answer",
    value: function answer() {
      var _this2 = this;

      this.dns.on('query', function (query) {
        debug && console.debug('got a query packet:', query);
        var fromClient = query.questions.find(function (question) {
          return question.name === _this2.name;
        });

        if (fromClient && _this2.runningAsService()) {
          var url = new URL(_this2.url);
          var answer = {
            answers: [{
              name: _this2.name,
              type: 'SRV',
              data: {
                port: url.port,
                target: url.hostname
              }
            }]
          };
          console.info('advertising this location', url);

          _this2.dns.respond(answer);
        }
      });
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this3 = this;

      console.log('resolving service url');
      return new Promise(function (resolve) {
        var buildUrl = function buildUrl(response) {
          debug && console.debug({
            answers: response.answers
          });
          var fromServer = response.answers.find(function (answer) {
            return answer.name === _this3.name && answer.type === 'SRV';
          });

          if (fromServer) {
            var _fromServer$data = fromServer.data,
                target = _fromServer$data.target,
                port = _fromServer$data.port;
            var protocol = port === 443 ? 'wss' : 'ws';
            _this3.url = "".concat(protocol, "://").concat(target, ":").concat(port);
            console.info({
              msg: 'found dns service record for',
              service: _this3.name,
              url: _this3.url
            });

            _this3.dns.off('response', buildUrl);

            resolve(_this3.url);
          }
        };

        console.log('looking for service', _this3.name);

        _this3.dns.on('response', buildUrl);

        _this3.ask();
      });
    }
  }]);

  return ServiceLocator;
}();
var locator;
function serviceLocatorInit() {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref2) {
      var _ref2$args, options;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$args = _slicedToArray(_ref2.args, 1), options = _ref2$args[0];
              console.debug('serviceLocatorInit called');
              locator = new ServiceLocator(options);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }();
}
function serviceLocatorAsk() {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", locator.ask());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}
function serviceLocatorListen() {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", locator.listen());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}
function serviceLocatorAnswer() {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", locator.answer());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
}

/***/ }),

/***/ "./src/adapters/websocket-adapter.js":
/*!*******************************************!*\
  !*** ./src/adapters/websocket-adapter.js ***!
  \*******************************************/
/*! namespace exports */
/*! export websockeTerminate [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketClose [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketConnect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketDisconnected [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketOnClose [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketOnMessage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketOnOpen [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketOnPong [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketPing [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketSend [provided] [no usage info] [missing usage info prevents renaming] */
/*! export websocketStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "websocketConnect": () => /* binding */ websocketConnect,
/* harmony export */   "websocketSend": () => /* binding */ websocketSend,
/* harmony export */   "websocketClose": () => /* binding */ websocketClose,
/* harmony export */   "websocketPing": () => /* binding */ websocketPing,
/* harmony export */   "websocketOnMessage": () => /* binding */ websocketOnMessage,
/* harmony export */   "websocketOnClose": () => /* binding */ websocketOnClose,
/* harmony export */   "websocketOnOpen": () => /* binding */ websocketOnOpen,
/* harmony export */   "websocketOnPong": () => /* binding */ websocketOnPong,
/* harmony export */   "websocketStatus": () => /* binding */ websocketStatus,
/* harmony export */   "websockeTerminate": () => /* binding */ websockeTerminate,
/* harmony export */   "websocketDisconnected": () => /* binding */ websocketDisconnected
/* harmony export */ });
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "./node_modules/ws/index.js");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/** @type {WebSocket} */

var socket;
function websocketConnect() {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var _ref$args, url, options;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref$args = _slicedToArray(_ref.args, 2), url = _ref$args[0], options = _ref$args[1];

              if (!socket) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", socket);

            case 3:
              if (!url) {
                _context.next = 8;
                break;
              }

              socket = new (ws__WEBPACK_IMPORTED_MODULE_0___default())(url, options);
              console.debug('connected');
              if (options !== null && options !== void 0 && options.binary) socket.binaryType = 'arraybuffer';
              return _context.abrupt("return", socket);

            case 8:
              throw new Error('missing url', url);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
}
function websocketSend() {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
      var _ref3$args, data, _ref3$args$, options;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref3$args = _slicedToArray(_ref3.args, 2), data = _ref3$args[0], _ref3$args$ = _ref3$args[1], options = _ref3$args$ === void 0 ? {} : _ref3$args$;

              if (!(socket && socket.readyState === socket.OPEN)) {
                _context2.next = 4;
                break;
              }

              socket.send(data, options);
              return _context2.abrupt("return", true);

            case 4:
              return _context2.abrupt("return", false);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
}
function websocketClose() {
  return /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref5) {
      var _ref5$args, code, reason;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ref5$args = _slicedToArray(_ref5.args, 2), code = _ref5$args[0], reason = _ref5$args[1];

              if (!socket) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", socket.close(code, reason));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
}
function websocketPing() {
  return /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref7) {
      var _ref7$args, options;

      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ref7$args = _slicedToArray(_ref7.args, 1), options = _ref7$args[0];

              if (!socket) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", socket.ping(options));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref8.apply(this, arguments);
    };
  }();
}
function websocketOnMessage() {
  return /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref9) {
      var _ref9$args, callback;

      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ref9$args = _slicedToArray(_ref9.args, 1), callback = _ref9$args[0];

              if (!socket) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return", socket.on('message', callback));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref10.apply(this, arguments);
    };
  }();
}
function websocketOnClose() {
  return /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref11) {
      var _ref11$args, callback;

      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref11$args = _slicedToArray(_ref11.args, 1), callback = _ref11$args[0];
              if (socket) socket.onclose = callback;

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref12.apply(this, arguments);
    };
  }();
}
function websocketOnOpen() {
  return /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref13) {
      var _ref13$args, callback;

      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ref13$args = _slicedToArray(_ref13.args, 1), callback = _ref13$args[0];
              if (socket) socket.onopen = callback;

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x7) {
      return _ref14.apply(this, arguments);
    };
  }();
}
function websocketOnPong() {
  return /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref15) {
      var _ref15$args, callback;

      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ref15$args = _slicedToArray(_ref15.args, 1), callback = _ref15$args[0];
              if (socket) socket.on('pong', callback);

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x8) {
      return _ref16.apply(this, arguments);
    };
  }();
}
function websocketStatus() {
  return /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_ref17) {
      var _ref17$args, callback;

      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ref17$args = _slicedToArray(_ref17.args, 1), callback = _ref17$args[0];

              if (!socket) {
                _context9.next = 3;
                break;
              }

              return _context9.abrupt("return", socket.readyState);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x9) {
      return _ref18.apply(this, arguments);
    };
  }();
}
function websockeTerminate() {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!socket) {
              _context10.next = 2;
              break;
            }

            return _context10.abrupt("return", socket.terminate());

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
}
function websocketDisconnected() {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", socket.readyState !== socket.OPEN);

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
}

/***/ })

};
;
//# sourceMappingURL=867.js.map