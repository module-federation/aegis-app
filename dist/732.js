exports.id = 732;
exports.ids = [732];
exports.modules = {

/***/ "./src/services/address-service.js":
/*!*****************************************!*\
  !*** ./src/services/address-service.js ***!
  \*****************************************/
/*! namespace exports */
/*! export Address [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Address": () => /* binding */ Address
/* harmony export */ });


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var uuid = __webpack_require__(/*! ../domain/utils */ "./src/domain/utils.js").uuid;
var SmartyStreetsSDK = __webpack_require__(/*! smartystreets-javascript-sdk */ "webpack/sharing/consume/default/smartystreets-javascript-sdk/smartystreets-javascript-sdk");
var SmartyStreetsCore = SmartyStreetsSDK.core;
var Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
var disabled = process.env.SMARTY_DISABLED || false;
var authId = process.env.SMARTY_AUTH_ID;
var authToken = process.env.SMARTY_AUTH_TOKEN;
var credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
var client = SmartyStreetsCore.buildClient.usStreet(credentials);

/**
 * @typedef {{function(address):Promise<string>}} Address
 */
var Address = {
  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields
  validateAddress: function validateAddress(address) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var lookup, response, candidate, validatedAddress;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            console.log("REAL validating address...".concat(address));
            if (address) {
              _context.next = 4;
              break;
            }
            console.log('no address');
            return _context.abrupt("return");
          case 4:
            if (!disabled) {
              _context.next = 7;
              break;
            }
            console.log('address service disabled');
            return _context.abrupt("return", address);
          case 7:
            _context.prev = 7;
            lookup = new Lookup();
            lookup.inputId = uuid();
            lookup.street = address;
            lookup.maxCandidates = 1;
            _context.prev = 12;
            _context.next = 15;
            return client.send(lookup);
          case 15:
            response = _context.sent;
            _context.next = 21;
            break;
          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](12);
            throw new Error(_context.t0);
          case 21:
            candidate = response.lookups[0].result[0];
            if (candidate) {
              _context.next = 24;
              break;
            }
            throw new Error('invalid address');
          case 24:
            validatedAddress = [candidate.deliveryLine1, candidate.deliveryLine2, candidate.lastLine].join(' ');
            console.log("address: ".concat(validatedAddress));
            if (validatedAddress) {
              _context.next = 28;
              break;
            }
            throw new Error('invalid address');
          case 28:
            return _context.abrupt("return", validatedAddress);
          case 31:
            _context.prev = 31;
            _context.t1 = _context["catch"](7);
            console.error(_context.t1);
            throw new Error('Address service error', _context.t1.message);
          case 35:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[7, 31], [12, 18]]);
    }))();
  }
};

/***/ }),

/***/ "./src/services/event-bus.js":
/*!***********************************!*\
  !*** ./src/services/event-bus.js ***!
  \***********************************/
/*! namespace exports */
/*! export EventBus [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventBus": () => /* binding */ EventBus
/* harmony export */ });
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapters */ "./src/adapters/index.js");
/* harmony import */ var _event_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-service */ "./src/services/event-service.js");


// Build EventBus client for host


var _notify = (0,_adapters__WEBPACK_IMPORTED_MODULE_0__.notify)(_event_service__WEBPACK_IMPORTED_MODULE_1__.Event);
var _listen = (0,_adapters__WEBPACK_IMPORTED_MODULE_0__.listen)(_event_service__WEBPACK_IMPORTED_MODULE_1__.Event);
var model = {
  listen: _listen
};
var EventBus = {
  notify: function notify(topic, message) {
    return _notify({
      model: model,
      args: [topic, message]
    });
  },
  listen: function listen(options) {
    return _listen({
      model: model,
      args: [options]
    });
  }
};

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/*! namespace exports */
/*! export Address [provided] [no usage info] [missing usage info prevents renaming] -> ./src/services/address-service.js .Address */
/*! export Event [provided] [no usage info] [missing usage info prevents renaming] -> ./src/services/event-service.js .Event */
/*! export EventBus [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export Payment [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export Shipping [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export default [not provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] -> ./src/services/inventory-service.js */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.n, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Address": () => /* reexport safe */ _address_service__WEBPACK_IMPORTED_MODULE_0__.Address,
/* harmony export */   "Event": () => /* reexport safe */ _event_service__WEBPACK_IMPORTED_MODULE_1__.Event,
/* harmony export */   "Payment": () => /* reexport safe */ _payment_service__WEBPACK_IMPORTED_MODULE_3__.Payment,
/* harmony export */   "Shipping": () => /* reexport safe */ _shipping_service__WEBPACK_IMPORTED_MODULE_4__.Shipping,
/* harmony export */   "EventBus": () => /* reexport safe */ _event_bus__WEBPACK_IMPORTED_MODULE_5__.EventBus
/* harmony export */ });
/* harmony import */ var _address_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./address-service */ "./src/services/address-service.js");
/* harmony import */ var _event_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-service */ "./src/services/event-service.js");
/* harmony import */ var _inventory_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inventory-service */ "./src/services/inventory-service.js");
/* harmony import */ var _inventory_service__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_inventory_service__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _inventory_service__WEBPACK_IMPORTED_MODULE_2__) if(["default","Address","Event"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _inventory_service__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _payment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment-service */ "./src/services/payment-service.js");
/* harmony import */ var _shipping_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shipping-service */ "./src/services/shipping-service.js");
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event-bus */ "./src/services/event-bus.js");







/***/ }),

/***/ "./src/services/inventory-service.js":
/*!*******************************************!*\
  !*** ./src/services/inventory-service.js ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

"use strict";


// JSON.stringify({
//     eventType: "Command",
//     eventTime: new Date().toISOString(),
//     eventSource: "orderService",
//     eventData: {
//       replyChannel: "orderChannel",
//       commandName: "pickOrder",
//       commandArgs: {
//       }

/***/ }),

/***/ "./src/services/payment-service.js":
/*!*****************************************!*\
  !*** ./src/services/payment-service.js ***!
  \*****************************************/
/*! namespace exports */
/*! export Payment [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Payment": () => /* binding */ Payment
/* harmony export */ });


/**
 * @callback authorizePaymentType
 * @param {string} id
 * @param {number} amount
 * @param {string} source_id
 * @param {string} customer_id
 * @param {boolean} [autocomplete]
 * @returns {Promise<string>}
 */

/**
 * @typedef PaymentService
 * @property {authorizePaymentType} authorizePayment
 * @property {function()} completePayment
 * @property {function()} refundPayment
 */

// import { Client, Environment, ApiError } from "square";

// const client = new Client({
//   environment: Environment.Sandbox,
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
// });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Payment = {
  /**
   * @type {authorizePaymentType}
   * @param {*} id
   * @param {*} amount
   * @param {*} source_id
   * @param {*} customer_id
   * @param {*} autocomplete
   * @param {*} currency
   */
  authorizePayment: function authorizePayment(id, amount, source_id, customer_id) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var autocomplete, currency, payload;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            autocomplete = _arguments.length > 4 && _arguments[4] !== undefined ? _arguments[4] : false;
            currency = _arguments.length > 5 && _arguments[5] !== undefined ? _arguments[5] : "USD";
            payload = {
              idempotency_key: id,
              amount_money: {
                amount: amount,
                currency: currency
              },
              source_id: source_id,
              autocomplete: autocomplete,
              customer_id: customer_id,
              location_id: "XK3DBG77NJBFX",
              reference_id: "123456",
              note: "Brief description",
              app_fee_money: {
                amount: 10,
                currency: "USD"
              }
            };
            /*
            const bodyAmountMoney = {};
            bodyAmountMoney.amount = 200;
            bodyAmountMoney.currency = "USD";
             const bodyTipMoney = {};
            bodyTipMoney.amount = 198;
            bodyTipMoney.currency = "CHF";
             const bodyAppFeeMoney = {};
            bodyAppFeeMoney.amount = 10;
            bodyAppFeeMoney.currency = "USD";
             const body = {
              sourceId: "ccof:uIbfJXhXETSP197M3GB",
              idempotencyKey: "4935a656-a929-4792-b97c-8848be85c27c",
              amountMoney: bodyAmountMoney,
            };
             body.tipMoney = bodyTipMoney;
            body.appFeeMoney = bodyAppFeeMoney;
            body.delayDuration = "delay_duration6";
            body.autocomplete = true;
            body.orderId = "order_id0";
            body.customerId = "VDKXEEKPJN48QDG3BGGFAK05P8";
            body.locationId = "XK3DBG77NJBFX";
            body.referenceId = "123456";
            body.note = "Brief description";
             // try {
            //   const {
            //     result,
            //     ...httpResponse
            //   } = await client.paymentsApi.createPayment(body);
            //   // Get more response info...
            //   // const { statusCode, headers } = httpResponse;
            // } catch (error) {
            //   if (error instanceof ApiError) {
            //     const errors = error.result;
            //     // const { statusCode, headers } = error;
            //   }
            // }
            */
            return _context.abrupt("return", "1234");
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  /*
  const response ={
  "payment": {
    "id": "GQTFp1ZlXdpoW4o6eGiZhbjosiDFf",
    "created_at": "2019-07-10T13:23:49.154Z",
    "updated_at": "2019-07-10T13:23:49.446Z",
    "amount_money": {
      "amount": 200,
      "currency": "USD"
    },
    "app_fee_money": {
      "amount": 10,
      "currency": "USD"
    },
    "total_money": {
      "amount": 200,
      "currency": "USD"
    },
    "status": "COMPLETED",
    "source_type": "CARD",
    "card_details": {
      "status": "CAPTURED",
      "card": {
        "card_brand": "VISA",
        "last_4": "1111",
        "exp_month": 7,
        "exp_year": 2026,
        "fingerprint": "sq-1-TpmjbNBMFdibiIjpQI5LiRgNUBC7u1689i0TgHjnlyHEWYB7tnn-K4QbW4ttvtaqXw",
        "card_type": "DEBIT",
        "prepaid_type": "PREPAID",
        "bin": "411111"
      },
      "entry_method": "ON_FILE",
      "cvv_status": "CVV_ACCEPTED",
      "avs_status": "AVS_ACCEPTED",
      "auth_result_code": "nsAyY2",
      "statement_description": "SQ *MY MERCHANT"
    },
    "location_id": "XTI0H92143A39",
    "order_id": "m2Hr8Hk8A3CTyQQ1k4ynExg92tO3",
    "reference_id": "123456",
    "note": "Brief description",
    "customer_id": "RDX9Z4XTIZR7MRZJUXNY9HUK6I",
    "receipt_number": "GQTF",
    "receipt_url": "https://squareup.com/receipt/preview/GQTFp1ZlXdpoW4o6eGiZhbjosiDFf"
  }
  }
  /*
  {
  "errors": [
    {
      "code": "VALUE_EMPTY",
      "detail": "Field must not be blank",
      "field": "source_id",
      "category": "INVALID_REQUEST_ERROR"
    },
    {
      "code": "VALUE_EMPTY",
      "detail": "Field must not be blank",
      "field": "idempotency_key",
      "category": "INVALID_REQUEST_ERROR"
    },
    {
      "code": "MISSING_REQUIRED_PARAMETER",
      "detail": "Field must be set",
      "field": "amount_money",
      "category": "INVALID_REQUEST_ERROR"
    }
  ]
  }
  */
  completePayment: function completePayment(model) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            console.log("REAL completing payment: %s", model.orderNo);
            return _context2.abrupt("return", "1234");
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  refundPayment: function refundPayment(model) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            console.log("REAL refunding payment: %s", model.orderNo);
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  }
};

/***/ }),

/***/ "./src/services/shipping-service.js":
/*!******************************************!*\
  !*** ./src/services/shipping-service.js ***!
  \******************************************/
/*! namespace exports */
/*! export Shipping [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shipping": () => /* binding */ Shipping
/* harmony export */ });


/**
 * @typedef {import('../adapters/event-adapter').EventMessage} EventMessage
 */

/**
 * @typedef {import('../adapters/event-adapter').CommandEvent} CommandEvent
 */

/**
 * @callback shipOrder
 * @param {string} shipTo
 * @param {string} shipFrom
 * @param {string} lineItems
 * @param {string} signature
 * @param {string} externalId
 * @param {string} requester
 * @param {string} respondOn
 * @returns {EventMessage}
 */

/**
 * @callback trackShipment
 * @param {string} shipmentId
 * @param {string} externalId
 * @param {string} requester
 * @param {string} respondOn
 * @returns {EventMessage}
 */

/**
 * @typedef {string} functionName
 */

/**
 * @typedef {Object} shippingService formats and parses shipping event messages
 * @property {string} serviceName - programmatic service name in eventSource/Target
 * @property {string} topic - event topic "shippingChannel" when sending messasges
 * @property {shipOrder} shipOrder - format event message requesting shipping label and pickup of order
 * @property {trackShipment} trackShipment - report on location/status of parcel
 * @property {function():EventMessage} verifyDelivery - ensure customer recieved parcel
 * @property {function():EventMessage} returnShipment - return to sender if refunding
 * @property {function(functionName,EventMessage):{[key]:string}} getPayload - extract payload
 */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function createEventMessage(_ref) {
  var requester = _ref.requester,
    service = _ref.service,
    type = _ref.type,
    name = _ref.name,
    id = _ref.id,
    data = _ref.data;
  return {
    eventSource: requester,
    eventTarget: service,
    eventType: type,
    eventName: name,
    eventTime: new Date().getTime(),
    eventUuid: id,
    eventData: data
  };
}
function createCommandEvent(name, topic, args) {
  return {
    commandName: name,
    commandResp: topic,
    commandArgs: _objectSpread({}, args)
  };
}

/**
 * Shipping service events
 * @type {shippingService}
 */
var Shipping = {
  serviceName: "shippingService",
  topic: "shippingChannel",
  /**
   *
   * @param {*} param0
   * @returns {shipMessage}
   */
  shipOrder: function shipOrder(_ref2) {
    var shipTo = _ref2.shipTo,
      shipFrom = _ref2.shipFrom,
      lineItems = _ref2.lineItems,
      signature = _ref2.signature,
      externalId = _ref2.externalId,
      requester = _ref2.requester,
      respondOn = _ref2.respondOn;
    return createEventMessage({
      requester: requester,
      service: this.serviceName,
      type: "command",
      name: this.shipOrder.name,
      id: externalId,
      data: createCommandEvent(this.shipOrder.name, respondOn, {
        shipTo: shipTo,
        shipFrom: shipFrom,
        lineItems: lineItems,
        signature: signature,
        externalId: externalId
      })
    });
  },
  /**
   *
   * @param {*} param0
   * @returns {EventMessage}
   */
  trackShipment: function trackShipment(_ref3) {
    var externalId = _ref3.externalId,
      shipmentId = _ref3.shipmentId,
      trackingId = _ref3.trackingId,
      requester = _ref3.requester,
      respondOn = _ref3.respondOn;
    return createEventMessage({
      requester: requester,
      service: this.serviceName,
      type: "command",
      name: this.trackShipment.name,
      id: externalId,
      data: createCommandEvent(this.trackShipment.name, respondOn, {
        externalId: externalId,
        shipmentId: shipmentId,
        trackingId: trackingId
      })
    });
  },
  /**
   *
   * @param {*} param0
   * @returns {EventMessage}
   */
  verifyDelivery: function verifyDelivery(_ref4) {
    var requester = _ref4.requester,
      respondOn = _ref4.respondOn,
      trackingId = _ref4.trackingId,
      externalId = _ref4.externalId;
    return createEventMessage({
      requester: requester,
      service: this.serviceName,
      type: "command",
      name: this.verifyDelivery.name,
      id: externalId,
      data: createCommandEvent(this.verifyDelivery.name, respondOn, {
        externalId: externalId,
        trackingId: trackingId
      })
    });
  },
  returnShipment: function returnShipment(_ref5) {
    var requester = _ref5.requester,
      respondOn = _ref5.respondOn,
      shipmentId = _ref5.shipmentId,
      externalId = _ref5.externalId;
    return createEventMessage({
      requester: requester,
      service: this.serviceName,
      type: "command",
      id: externalId,
      name: this.returnShipment.name,
      data: createCommandEvent(this.returnShipment, respondOn, {
        shipmentId: shipmentId,
        externalId: externalId
      })
    });
  },
  getPayload: function getPayload(func, event) {
    var _payloads;
    var payloads = (_payloads = {}, _defineProperty(_payloads, this.shipOrder.name, {
      shipmentId: event.eventData.shipmentId
    }), _defineProperty(_payloads, this.trackShipment.name, {
      trackingId: event.eventData.trackingId,
      trackingStatus: event.eventData.trackingStatus
    }), _defineProperty(_payloads, this.verifyDelivery.name, {
      proofOfDelivery: event.eventData.proofOfDelivery
    }), _payloads);
    return payloads[func];
  },
  getProperty: function getProperty(event, key) {
    return event.eventData[key];
  }
};

/***/ })

};
;
//# sourceMappingURL=732.js.map