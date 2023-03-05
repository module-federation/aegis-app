exports.id = 334;
exports.ids = [334];
exports.modules = {

/***/ "./src/domain/check-payload.js":
/*!*************************************!*\
  !*** ./src/domain/check-payload.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkPayload
/* harmony export */ });


/**
 * Check the payload for expected properties.
 * @param {string|string[]} key name of property or properties
 * @param {*} options
 * @param {*} payload
 * @param {*} port
 */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function checkPayload(key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var port = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : checkPayload.name;
  var model = options.model;
  if (!model || Object.keys(payload) < 1 || !key) {
    throw new Error({
      desc: 'model, payload, or key is missing',
      model: model,
      port: port,
      error: error,
      payload: payload,
      key: key
    });
  }
  if (Array.isArray(key)) {
    var keys = key.map(function (k) {
      return checkPayload(k, options, payload, port);
    });
    return keys.reduce(function (p, c) {
      return _objectSpread(_objectSpread({}, p), c);
    });
  }
  if (payload[key]) {
    return _defineProperty({}, key, payload[key]);
  }
  if (model[key]) {
    return _defineProperty({}, key, model[key]);
  }
  return model.find().then(function (latest) {
    return _defineProperty({}, key, latest[key]);
  })["catch"](function (error) {
    throw new Error('property is missing' + key, port, error, payload, model);
  });
}

/***/ }),

/***/ "./src/domain/customer.js":
/*!********************************!*\
  !*** ./src/domain/customer.js ***!
  \********************************/
/*! namespace exports */
/*! export doesFieldExist [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeCustomerFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export okToDelete [provided] [no usage info] [missing usage info prevents renaming] */
/*! export runFibonacciCust [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeCustomerFactory": () => /* binding */ makeCustomerFactory,
/* harmony export */   "okToDelete": () => /* binding */ okToDelete,
/* harmony export */   "runFibonacciCust": () => /* binding */ runFibonacciCust,
/* harmony export */   "doesFieldExist": () => /* binding */ doesFieldExist
/* harmony export */ });


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function makeCustomerFactory(dependencies) {
  return function createCustomer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      firstName = _ref.firstName,
      lastName = _ref.lastName,
      shippingAddress = _ref.shippingAddress,
      creditCardNumber = _ref.creditCardNumber,
      _ref$billingAddress = _ref.billingAddress,
      billingAddress = _ref$billingAddress === void 0 ? shippingAddress : _ref$billingAddress,
      phone = _ref.phone,
      email = _ref.email,
      userId = _ref.userId;
    return Object.freeze({
      customerId: dependencies.uuid(),
      firstName: firstName,
      lastName: lastName,
      creditCardNumber: creditCardNumber,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      phone: phone,
      email: email,
      userId: userId
    });
  };
}
function okToDelete(_x) {
  return _okToDelete.apply(this, arguments);
}
function _okToDelete() {
  _okToDelete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(customer) {
    var orders;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return customer.orders();
        case 2:
          orders = _context.sent;
          if (!((orders === null || orders === void 0 ? void 0 : orders.length) > 0)) {
            _context.next = 5;
            break;
          }
          throw new Error('cant delete customer with open orders');
        case 5:
          return _context.abrupt("return", customer);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _okToDelete.apply(this, arguments);
}
function fibonacci(x) {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return fibonacci(x - 1) + fibonacci(x - 2);
}
function runFibonacciCust(_x2) {
  return _runFibonacciCust.apply(this, arguments);
}
function _runFibonacciCust() {
  _runFibonacciCust = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var param, start;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log({
            data: data
          });
          param = parseInt(data.args.fibonacci || 20);
          start = Date.now();
          return _context2.abrupt("return", {
            fibonacci: param,
            result: fibonacci(param),
            time: Date.now() - start
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _runFibonacciCust.apply(this, arguments);
}
function doesFieldExist(_x3) {
  return _doesFieldExist.apply(this, arguments);
}
function _doesFieldExist() {
  _doesFieldExist = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var _data$args, _data$args2, _data$args3;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log({
            name: (_data$args = data.args) === null || _data$args === void 0 ? void 0 : _data$args.name
          });
          _context3.t0 = (_data$args2 = data.args) === null || _data$args2 === void 0 ? void 0 : _data$args2.name;
          _context3.next = 4;
          return this.fetchRelatedService('ORDER');
        case 4:
          _context3.next = 6;
          return _context3.sent.getFieldList();
        case 6:
          _context3.t1 = _context3.sent.includes((_data$args3 = data.args) === null || _data$args3 === void 0 ? void 0 : _data$args3.name);
          return _context3.abrupt("return", {
            field: _context3.t0,
            exists: _context3.t1
          });
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return _doesFieldExist.apply(this, arguments);
}

/***/ }),

/***/ "./src/domain/mixins.js":
/*!******************************!*\
  !*** ./src/domain/mixins.js ***!
  \******************************/
/*! namespace exports */
/*! export RegEx [provided] [no usage info] [missing usage info prevents renaming] */
/*! export allowProperties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createMethod [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export encryptPersonalInfo [provided] [no usage info] [missing usage info prevents renaming] */
/*! export encryptProperties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export execMethod [provided] [no usage info] [missing usage info prevents renaming] */
/*! export freezeProperties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hashPasswords [provided] [no usage info] [missing usage info prevents renaming] */
/*! export invokePort [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mixinSets [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mixinType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export prevmodel [provided] [no usage info] [missing usage info prevents renaming] */
/*! export processUpdate [provided] [no usage info] [missing usage info prevents renaming] */
/*! export requireProperties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export updateMixins [provided] [no usage info] [missing usage info prevents renaming] */
/*! export updateProperties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export validateModel [provided] [no usage info] [missing usage info prevents renaming] */
/*! export validateProperties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export validations [provided] [no usage info] [missing usage info prevents renaming] */
/*! export withValidFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prevmodel": () => /* binding */ prevmodel,
/* harmony export */   "validations": () => /* binding */ validations,
/* harmony export */   "mixinType": () => /* binding */ mixinType,
/* harmony export */   "mixinSets": () => /* binding */ mixinSets,
/* harmony export */   "processUpdate": () => /* binding */ processUpdate,
/* harmony export */   "updateMixins": () => /* binding */ updateMixins,
/* harmony export */   "validateModel": () => /* binding */ validateModel,
/* harmony export */   "encryptProperties": () => /* binding */ encryptProperties,
/* harmony export */   "freezeProperties": () => /* binding */ freezeProperties,
/* harmony export */   "requireProperties": () => /* binding */ requireProperties,
/* harmony export */   "hashPasswords": () => /* binding */ hashPasswords,
/* harmony export */   "allowProperties": () => /* binding */ allowProperties,
/* harmony export */   "RegEx": () => /* binding */ RegEx,
/* harmony export */   "validateProperties": () => /* binding */ validateProperties,
/* harmony export */   "updateProperties": () => /* binding */ updateProperties,
/* harmony export */   "invokePort": () => /* binding */ invokePort,
/* harmony export */   "execMethod": () => /* binding */ execMethod,
/* harmony export */   "createMethod": () => /* binding */ createMethod,
/* harmony export */   "withValidFormat": () => /* binding */ withValidFormat,
/* harmony export */   "checkFormat": () => /* binding */ checkFormat,
/* harmony export */   "encryptPersonalInfo": () => /* binding */ encryptPersonalInfo,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _domain_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/utils */ "./src/domain/utils.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);


var _mixinSets;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * Functional mixin created by `functionalMixinFactory`
 * @callback functionalMixin
 * @param {Object} o Object to compose
 * @returns {Object} Composed object
 */

/**
 * Functional mixin factory - partial application - returns mixin function
 * @callback functionalMixinFactory
 * @param {*} mixinParams params for mixin function
 * @returns {functionalMixin}
 */

/**
 * @typedef {import("../domain/index").Model} Model
 */

/**
 * Private key to access previous version of the model
 */
var prevmodel = Symbol('prevModel');
/**
 * private key to access validation config
 */
var validations = Symbol('validations');
/**
 * Process mixin pre or post update
 */
var mixinType = {
  pre: Symbol('pre'),
  post: Symbol('post')
};

/**
 * Stored mixins - use private symbol as key to prevent overwrite
 */
var mixinSets = (_mixinSets = {}, _defineProperty(_mixinSets, mixinType.pre, Symbol('preUpdateMixins')), _defineProperty(_mixinSets, mixinType.post, Symbol('postUpdateMixins')), _mixinSets);

/**
 * Set of pre mixins
 */
var premixins = mixinSets[mixinType.pre];
/**
 * Set of post mixins
 */
var postmixins = mixinSets[mixinType.post];

/**
 * Apply any pre and post mixins and return the result.
 * @deprecated
 * @param {*} model - current model
 * @param {*} changes - object containing changes
 * @returns {import('.').Model} updated model
 */
function processUpdate(model, changes) {
  changes[prevmodel] = JSON.parse(JSON.stringify(model)); // keep history

  var updates = model[premixins] ? _domain_utils__WEBPACK_IMPORTED_MODULE_0__.compose.apply(void 0, _toConsumableArray(model[premixins].values()))(changes) : changes;
  var updated = _objectSpread(_objectSpread({}, model), updates);
  return model[postmixins] ? _domain_utils__WEBPACK_IMPORTED_MODULE_0__.compose.apply(void 0, _toConsumableArray(model[postmixins].values()))(updated) : updated;
}

/**
 * @deprecated
 * Store mixins for execution on update
 * @param {mixinType} type
 * run before changes are applied or afterward
 * @param {*} o  Object containing changes to apply (pre)
 * or new object after changes have been applied (post)
 * @param {string} name `Function.name`
 * @param {functionalMixin} cb mixin function
 */
function updateMixins(type, o, name, cb) {
  if (!mixinSets[type]) {
    throw new Error('invalid mixin type');
  }
  var mixinSet = o[mixinSets[type]] || new Map();
  if (!mixinSet.has(name)) {
    mixinSet.set(name, cb());
    return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, mixinSets[type], mixinSet));
  }
  return o;
}

/**
 * bitmask for identifying events
 */
var eventMask = {
  update: 1,
  //  0001 Update
  create: 1 << 1,
  //  0010 Create
  onload: 1 << 2 //  0100 Load
};

function handleUpdateEvent(model, updates, event) {
  var isUpdate = eventMask.update & event;
  var decrypted = isUpdate ? model.decrypt() : {};
  return _objectSpread(_objectSpread(_objectSpread({}, model), updates), decrypted);
}
function isObject(p) {
  return p != null && _typeof(p) === 'object';
}
function containsUpdates(model, changes, event) {
  try {
    if (!changes) return false;
    if (eventMask.update & event) {
      var changeList = Object.keys(changes);
      if (changeList.length < 1) return false;
      if (changeList.every(function (k) {
        return model[k] && util__WEBPACK_IMPORTED_MODULE_1___default().isDeepStrictEqual(changes[k], model[k]);
      })) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error({
      fn: containsUpdates.name,
      error: error
    });
  }
  return false;
}

/**
 * Run validation functions enabled for a given event.
 * @param {Model} model - the composed object
 * @param {*} changes - object containing changes
 * @param {Number} event - Indicates what event is occuring:
 * 1st bit turned on means update, 2nd bit create, 3rd load,
 * see {@link eventMask}.
 */
function validateModel(model, changes, event) {
  if (!model || !changes || !event) return {};
  // if there are no changes, and the event is an update, return
  if (!containsUpdates(model, changes, event)) {
    return model;
  }

  // keep a history of the last saved model
  var input = _objectSpread(_objectSpread({}, changes), {}, _defineProperty({}, prevmodel, JSON.parse(JSON.stringify(model || {}))));

  // Validate just the input data
  var updates = model[validations].filter(function (v) {
    return v.input & event;
  }).sort(function (a, b) {
    return a.order - b.order;
  }).map(function (v) {
    return model[v.name].apply(input);
  }).reduce(function (p, c) {
    return _objectSpread(_objectSpread({}, p), c);
  }, input);
  var updated = _objectSpread(_objectSpread({}, model), updates);

  // Validate the updated model
  return updated[validations].filter(function (v) {
    return v.output & event;
  }).sort(function (a, b) {
    return a.order - b.order;
  }).map(function (v) {
    return updated[v.name]();
  }).reduce(function (p, c) {
    return _objectSpread(_objectSpread({}, p), c);
  }, updated);
}

/**
 * Enable validation to run on specific events.
 * @param {boolean} onUpdate - whether or not to run the validation on update.
 * Defaults to `true`.
 * @param {boolean} onCreate - whether or not to run the validation on create.
 * Defaults to `true`.
 * @param {boolean} onLoad - whether or not to run the validation when
 * the object is being loaded into memory after being deserialized.
 * Defaults to `false`.
 */
function enableEvent(_ref) {
  var _ref$onUpdate = _ref.onUpdate,
    onUpdate = _ref$onUpdate === void 0 ? true : _ref$onUpdate,
    _ref$onCreate = _ref.onCreate,
    onCreate = _ref$onCreate === void 0 ? true : _ref$onCreate,
    _ref$onLoad = _ref.onLoad,
    onLoad = _ref$onLoad === void 0 ? false : _ref$onLoad;
  var enabled = 0;
  if (onUpdate) {
    enabled |= eventMask.update;
  }
  if (onCreate) {
    enabled |= eventMask.create;
  }
  if (onLoad) {
    enabled |= eventMask.onload;
  }
  return enabled;
}

/**
 * Specify when validations run.
 */
var enableValidation = function () {
  return {
    /**
     * Validation runs on update.
     */
    onUpdate: enableEvent({
      onUpdate: true,
      onCreate: false,
      onLoad: false
    }),
    /**
     * Validation runs on create.
     */
    onCreate: enableEvent({
      onUpdate: false,
      onCreate: true,
      onLoad: false
    }),
    /**
     * Validation runs on both create and update.
     */
    onCreateAndUpdate: enableEvent({
      onUpdate: true,
      onCreate: true,
      onLoad: false
    }),
    /**
     * Validation runs on load.
     */
    onLoad: enableEvent({
      onUpdate: false,
      onCreate: false,
      onLoad: true
    }),
    /**
     * Validation runs on load and create.
     */
    onLoadAndCreate: enableEvent({
      onUpdate: false,
      onCreate: true,
      onLoad: true
    }),
    /**
     * Validation runs on load and create.
     */
    onLoadAndUpdate: enableEvent({
      onUpdate: true,
      onCreate: false,
      onLoad: true
    }),
    /**
     * Validation runs on all events.
     */
    onAll: enableEvent({
      onUpdate: true,
      onCreate: true,
      onLoad: true
    })
  };
}();

/**
 * Add a validation function to be called for a given event.
 * @typedef {object} validationConfig
 * @property {*} o - the composed object
 * @property {string} name - name of function to run
 * @property {number} input - "input" validations run against
 * the data passed by the caller in the request. Use `enableValidation`
 * to provide a value for this param.
 * @property {number} output - "output" functions run against the
 * model after the changes have been applied.
 * @property {number} order - order in which validation runs
 * @param {validationConfig} param0
 */
function addValidation(_ref2) {
  var model = _ref2.model,
    name = _ref2.name,
    _ref2$input = _ref2.input,
    input = _ref2$input === void 0 ? 0 : _ref2$input,
    _ref2$output = _ref2.output,
    output = _ref2$output === void 0 ? 0 : _ref2$output,
    _ref2$order = _ref2.order,
    order = _ref2$order === void 0 ? 50 : _ref2$order;
  var config = model[validations] || [];
  if (config.some(function (v) {
    return v.name === name;
  })) {
    console.warn('duplicate validation name', name);
    return model;
  }
  return _objectSpread(_objectSpread({}, model), {}, _defineProperty({
    validateModel: validateModel
  }, validations, [].concat(_toConsumableArray(config), [{
    name: name,
    input: input,
    output: output,
    order: order
  }])));
}

/**
 * Resolve keys:
 * If the value includes an array, flatten it, then for each element:
 * If the value is "*", return all keys of the object.
 * If the value is a function, execute it to get a dynamic key or key list.
 * If the value is a RegExp, test it to get dynamic key list.
 * If any of the above produce an array of keys, flatten it.
 * @param {*} o - Object to compose
 * @param  {Array<string | function(*):string>} propKeys -
 * Names (or functions that return names) of properties
 * @returns {string[]} list of (resolved) property keys
 */
function parseKeys(o) {
  for (var _len = arguments.length, propKeys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    propKeys[_key - 1] = arguments[_key];
  }
  if (!propKeys || !o) return null;
  var keys = propKeys.flat().map(function (k) {
    if (typeof k === 'function') return k(o);
    if (k instanceof RegExp) return Object.keys(o).filter(function (key) {
      return k.test(key);
    });
    if (k === '*') return Object.keys(o);
    return k;
  });
  return keys.flat();
}

/**
 * Encrypt properties. Properties remain encrypted indefinitely, and
 * must be explicitly decrypted as needed, e.g. reading values in memory,
 * from storage, serializing and sending to an external system.
 * @param  {Array<string | function(*):string>} propKeys -
 * Names (or functions that return names) of properties to encrypt
 * @returns {functionalMixin} mixin function
 */
var encryptProperties = function encryptProperties() {
  for (var _len2 = arguments.length, propKeys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    propKeys[_key2] = arguments[_key2];
  }
  return function (o) {
    var keys = parseKeys.apply(void 0, [o].concat(propKeys));
    var encryptProps = function encryptProps(obj) {
      return keys.map(function (key) {
        return obj[key] ? _defineProperty({}, key, (0,_domain_utils__WEBPACK_IMPORTED_MODULE_0__.encrypt)(obj[key])) : {};
      }).reduce(function (p, c) {
        return _objectSpread(_objectSpread({}, p), c);
      });
    };
    return _objectSpread(_objectSpread({
      encryptProperties: function encryptProperties() {
        return encryptProps(this);
      }
    }, addValidation({
      model: o,
      name: encryptProperties.name,
      input: enableValidation.onUpdate,
      output: enableValidation.onCreate,
      order: 100
    })), {}, {
      decrypt: function decrypt() {
        var _this = this;
        return keys.map(function (key) {
          return _this[key] ? _defineProperty({}, key, (0,_domain_utils__WEBPACK_IMPORTED_MODULE_0__.decrypt)(_this[key])) : {};
        }).reduce(function (p, c) {
          return _objectSpread(_objectSpread({}, p), c);
        }, {});
      }
    });
  };
};

/**
 * Prevent properties from being modified.
 * Accepts a property name or a function that returns a property name.
 * @param  {Array<string | function(*):string | RegExp>} propKeys - names of properties to freeze
 */
var freezeProperties = function freezeProperties() {
  for (var _len3 = arguments.length, propKeys = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    propKeys[_key3] = arguments[_key3];
  }
  return function (o) {
    var preventUpdates = function preventUpdates(obj) {
      var keys = parseKeys.apply(void 0, [obj].concat(propKeys));
      var mutations = Object.keys(obj).filter(function (key) {
        return keys.includes(key);
      });
      if ((mutations === null || mutations === void 0 ? void 0 : mutations.length) > 0) {
        throw new Error("cannot update readonly properties: ".concat(mutations));
      }
    };
    return _objectSpread({
      freezeProperties: function freezeProperties() {
        preventUpdates(this);
      }
    }, addValidation({
      model: o,
      name: freezeProperties.name,
      input: enableValidation.onUpdate,
      order: 20
    }));
  };
};

/**
 * Enforce required fields.
 * @param {Array<string | function(*):string | RegExp>} propKeys -
 * required property key names - can be a function or regex
 * that returns the property key names
 */
var requireProperties = function requireProperties() {
  for (var _len4 = arguments.length, propKeys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    propKeys[_key4] = arguments[_key4];
  }
  return function (o) {
    var keys = parseKeys.apply(void 0, [o].concat(propKeys));
    function requireProps(obj) {
      var missing = keys.filter(function (key) {
        return key && !obj[key];
      });
      if ((missing === null || missing === void 0 ? void 0 : missing.length) > 0) {
        throw new Error("missing required properties: ".concat(missing));
      }
    }
    return _objectSpread({
      requireProperties: function requireProperties() {
        requireProps(this);
      }
    }, addValidation({
      model: o,
      name: requireProperties.name,
      output: enableValidation.onCreateAndUpdate,
      order: 90
    }));
  };
};

/**
 * Hash passwords.
 * @param {*} hash hash algorithm
 * @param  {Array<string | function(*):string | RegExp>} propKeys name of password props
 */
var hashPasswords = function hashPasswords() {
  for (var _len5 = arguments.length, propKeys = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    propKeys[_key5] = arguments[_key5];
  }
  return function (o) {
    var keys = parseKeys.apply(void 0, [o].concat(propKeys));
    function hashPwds(obj) {
      return keys.map(function (key) {
        return obj[key] ? _defineProperty({}, key, (0,_domain_utils__WEBPACK_IMPORTED_MODULE_0__.hash)(obj[key])) : {};
      }).reduce(function (p, c) {
        return _objectSpread(_objectSpread({}, p), c);
      });
    }
    return _objectSpread({
      hashPasswords: function hashPasswords() {
        return hashPwds(this);
      }
    }, addValidation({
      model: o,
      name: hashPasswords.name,
      input: enableValidation.onUpdate,
      output: enableValidation.onCreate,
      order: 100
    }));
  };
};
var internalPropList = [];

/**
 * Reject unknown properties in user input. Allow only approved keys.
 * @param  {...any} propKeys
 */
var allowProperties = function allowProperties() {
  for (var _len6 = arguments.length, propKeys = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    propKeys[_key6] = arguments[_key6];
  }
  return function (o) {
    function rejectUnknownProps() {
      var keys = parseKeys.apply(void 0, [o].concat(propKeys));
      var allowList = keys.concat(internalPropList);
      var unknownProps = Object.keys(o).filter(function (key) {
        return !allowList.includes(key);
      });
      if ((unknownProps === null || unknownProps === void 0 ? void 0 : unknownProps.length) > 0) {
        throw new Error("invalid properties: ".concat(unknownProps));
      }
    }
    return _objectSpread({
      rejectUnknownProperties: function rejectUnknownProperties() {
        return rejectUnknownProps(this);
      }
    }, addValidation({
      model: o,
      name: rejectUnknownProps.name,
      input: enableValidation.onUpdate,
      order: 10
    }));
  };
};

/**
 * Test regular expressions
 */
var RegEx = {
  email: /^(.+)@(.+){2,}\.(.+){2,}$/,
  ipv4Address: /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/,
  ipv6Address: /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/,
  phone: /^[1-9]\d{2}-\d{3}-\d{4}/,
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  ssn: /^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$/,
  /**
   * Allow caller to pass a keyword that refers to one of the regex above
   * @param {regexType} expr
   * @param {*} val
   */
  test: function test(expr, val) {
    var _expr = Object.keys(this).includes(expr) && this[expr] instanceof RegExp ? this[expr] : expr;
    return _expr.test(val);
  }
};

/**
 * @callback isValid
 * @param {Object} o - the property owner
 * @param {*} propVal - the property value
 * @returns {boolean} - true if valid
 *
 * @typedef {'email'|'phone'|'ipv4Address'|'ipv6Address'|'creditCard'|'ssn'|RegExp} regexType
 *
 * @typedef {{
 *  propKey:string,
 *  isValid?:isValid,
 *  values?:any[],
 *  regex?:regexType,
 *  maxlen?:number
 *  maxnum?:numbertp
 *  typeof?:string
 *  unique?:{ encrypted:boolean }
 * }} validation
 */

function evaluateUniqueness(v, o, propVal) {
  var compareVal = v.unique.encrypted ? (0,_domain_utils__WEBPACK_IMPORTED_MODULE_0__.encrypt)(propVal) : propVal;
  return o.listSync(_defineProperty({}, v.propKey, compareVal)).length < 1;
}

/**
 * Run validation tests
 */
var Validator = {
  tests: {
    isValid: function isValid(v, o, propVal) {
      return v.isValid(o, propVal);
    },
    values: function values(v, o, propVal) {
      return v.values.includes(propVal);
    },
    regex: function regex(v, o, propVal) {
      return RegEx.test(v.regex, propVal);
    },
    "typeof": function _typeof(v, o, propVal) {
      return v["typeof"] === _typeof(propVal);
    },
    maxnum: function maxnum(v, o, propVal) {
      return v.maxnum + 1 > propVal;
    },
    maxlen: function maxlen(v, o, propVal) {
      return v.maxlen + 1 > propVal.length;
    },
    unique: function unique(v, o, propVal) {
      return evaluateUniqueness(v, o, propVal);
    }
  },
  /**
   * Returns true if tests pass.
   * @param {validation} v validation config
   * @param {Object} o object to compose
   * @param {*} propVal value of property to validate
   * @returns {boolean} true if tests pass
   */
  isValid: function isValid(v, o, propVal) {
    var _this2 = this;
    return Object.keys(this.tests).every(function (key) {
      if (v[key]) {
        // the test `key` is specified, run it
        return _this2.tests[key](v, o, propVal);
      }
      return true;
    });
  }
};

/**
 * Verify a property value is a member of a list,
 * is unique within a set of model instances,
 * is of a certain length, size or type,
 * matches a regular expression,
 * or satisfies a custom validation function.
 * @param {validation[]} validations
 */
var validateProperties = function validateProperties(validations) {
  return function (o) {
    function validate(obj) {
      var invalid = validations.filter(function (v) {
        var propVal = obj[v.propKey];
        if (!propVal) {
          return false;
        }
        return !Validator.isValid(v, obj, propVal);
      });
      if ((invalid === null || invalid === void 0 ? void 0 : invalid.length) > 0) {
        throw new Error("invalid value for ".concat(_toConsumableArray(invalid.map(function (v) {
          return v.propKey;
        }))));
      }
    }
    return _objectSpread({
      validateProperties: function validateProperties() {
        validate(this);
      }
    }, addValidation({
      model: o,
      name: validateProperties.name,
      input: enableValidation.onUpdate,
      output: enableValidation.onCreate,
      order: 50
    }));
  };
};

/**
 * @callback updaterFn
 * @param {Object} o
 * @param  {*} propVal
 * @returns {Object} object with updated properties
 *
 * @typedef {{
 * propKey: string,
 * update: updaterFn
 * }} updater
 */

/**
 * Respond to property updates by updating addtional (dependent) properties as needed.
 * @param {updater[]} updaters
 */
var updateProperties = function updateProperties(updaters) {
  return function (o) {
    function updateProps(obj) {
      var updates = updaters.filter(function (u) {
        return obj[u.propKey];
      });
      if ((updates === null || updates === void 0 ? void 0 : updates.length) > 0) {
        return updates.map(function (u) {
          return u.update(o, obj[u.propKey]);
        }).reduce(function (p, c) {
          return _objectSpread(_objectSpread({}, p), c);
        });
      }
    }
    return _objectSpread({
      updateProperties: function updateProperties() {
        return updateProps(this);
      }
    }, addValidation({
      model: o,
      name: updateProperties.name,
      output: enableValidation.onUpdate,
      order: 30
    }));
  };
};

/**
 * Set a validation that invokes a port. The port must be configured
 * in the `ModelSpecification`.
 * @param {string} fn - name of port (as it appears in the ModelSpec)
 * @param {boolean} onCreate - invoke on create
 * @param {boolean} onUpdate - invoke on update
 * @param  {...any} args - pass arguments
 */
var invokePort = function invokePort(fn, onCreate, onUpdate) {
  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key7 = 3; _key7 < _len7; _key7++) {
    args[_key7 - 3] = arguments[_key7];
  }
  return /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(o) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _objectSpread(_objectSpread({}, o), {}, {
              invokePort: function invokePort() {
                console.log({
                  func: 'invokePort',
                  fn: fn,
                  args: args
                });
                return this[fn].apply(this, args).then(function (o) {
                  return o;
                });
              }
            }, addValidation({
              model: o,
              name: 'invokePort',
              output: enableValidation.onUpdate,
              order: 85
            })));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref6.apply(this, arguments);
    };
  }();
};

/**
 * Set a validation that calls a model method or provided function.
 * @param {string|function(Model, ...any):Promise<any>} fn - callback function
 * or name of method to executee
 * @param {boolean} onCreate - invoke on create
 * @param {boolean} onUpdate - invoke on update
 * @param  {...any} args - pass arguments to the method/function
 * @return {Model}
 */
var execMethod = function execMethod(fn, onCreate, onUpdate) {
  for (var _len8 = arguments.length, args = new Array(_len8 > 3 ? _len8 - 3 : 0), _key8 = 3; _key8 < _len8; _key8++) {
    args[_key8 - 3] = arguments[_key8];
  }
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(o) {
      var functionType;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            functionType = {
              "function": function _function(fn, obj) {
                for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
                  args[_key9 - 2] = arguments[_key9];
                }
                return fn.apply(void 0, [obj].concat(args)).then(function (o) {
                  return o;
                });
              },
              string: function string(fn, obj) {
                for (var _len10 = arguments.length, args = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
                  args[_key10 - 2] = arguments[_key10];
                }
                return obj[fn].apply(obj, args).then(function (o) {
                  return o;
                });
              }
            };
            return _context3.abrupt("return", _objectSpread(_objectSpread({}, o), {}, {
              execMethod: function execMethod() {
                var _this3 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                  var model;
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return functionType[_typeof(fn)].apply(functionType, [fn, _this3].concat(args));
                      case 2:
                        model = _context2.sent;
                        return _context2.abrupt("return", model);
                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }))();
              }
            }, addValidation({
              model: o,
              name: 'execMethod',
              output: enableValidation.onUpdate,
              order: 40
            })));
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref7.apply(this, arguments);
    };
  }();
};

/**
 * Create a method on a model.
 * @param {*} fn
 * @param  {...any} args
 */
var createMethod = function createMethod(fn) {
  for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
    args[_key11 - 1] = arguments[_key11];
  }
  return function (o) {
    return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, fn.name, function () {
      return fn.apply(void 0, args);
    }));
  };
};

/**
 * Check the value of the property before returning its key.
 * @param {*} propKey
 * @param {regexType} expr
 * @returns {function(any):any} dynamic property func
 */
var withValidFormat = function withValidFormat(propKey, expr) {
  return function (o) {
    if (o[propKey] && !RegEx.test(expr, o[propKey])) {
      throw new Error("invalid ".concat(propKey));
    }
    return propKey;
  };
};

/**
 *
 * @param {string} value
 * @param {regexType} expr
 */
var checkFormat = function checkFormat(value, expr) {
  if (value && !RegEx.test(expr, value)) {
    var x = expr instanceof RegExp ? value : expr;
    throw new Error("".concat(x, " invalid"));
  }
};

/**
 * Implement GDPR encryption requirement across models
 */
var encryptPersonalInfo = encryptProperties(/^last.*Name$|^surname$|^family.*Name$/i, /^shipping.*Address$/i, /^billing.*Address$/i, /^home.*Address$/i, /email|e-mail/i, /^phone$|^home.*phone$/i, /^mobile$|^mobile.*number$|^cell.*number$/i, /^credit.*Card/i, /^cvv$/i, /^ssn$|^socialSecurity/i, /^encrypted/i);

/**
 * Global mixins
 */
var GlobalMixins = [encryptPersonalInfo];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalMixins);

/***/ }),

/***/ "./src/domain/order.js":
/*!*****************************!*\
  !*** ./src/domain/order.js ***!
  \*****************************/
/*! namespace exports */
/*! export OrderError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OrderStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export accountOrder [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addressValidated [provided] [no usage info] [missing usage info prevents renaming] */
/*! export approve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export approveOrders [provided] [no usage info] [missing usage info prevents renaming] */
/*! export calcTotal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cancel [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cancelOrders [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cancelPayment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkItems [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createModelEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! export customHttpStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export errorCallback [provided] [no usage info] [missing usage info prevents renaming] */
/*! export freezeOnApproval [provided] [no usage info] [missing usage info prevents renaming] */
/*! export freezeOnCompletion [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFieldList [provided] [no usage info] [missing usage info prevents renaming] */
/*! export handleOrderEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! export itemCount [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeOrderFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export orderPicked [provided] [no usage info] [missing usage info prevents renaming] */
/*! export orderShipped [provided] [no usage info] [missing usage info prevents renaming] */
/*! export orderTotalValid [provided] [no usage info] [missing usage info prevents renaming] */
/*! export paymentAuthorized [provided] [no usage info] [missing usage info prevents renaming] */
/*! export paymentCompleted [provided] [no usage info] [missing usage info prevents renaming] */
/*! export readyToDelete [provided] [no usage info] [missing usage info prevents renaming] */
/*! export recalcTotal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export refundPayment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export requiredForApproval [provided] [no usage info] [missing usage info prevents renaming] */
/*! export requiredForCompletion [provided] [no usage info] [missing usage info prevents renaming] */
/*! export requiredForGuest [provided] [no usage info] [missing usage info prevents renaming] */
/*! export returnDelivery [provided] [no usage info] [missing usage info prevents renaming] */
/*! export returnInventory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export returnShipment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export runFibonacciJs [provided] [no usage info] [missing usage info prevents renaming] */
/*! export runOrderWorkflow [provided] [no usage info] [missing usage info prevents renaming] */
/*! export statusChangeValid [provided] [no usage info] [missing usage info prevents renaming] */
/*! export testContainsMany [provided] [no usage info] [missing usage info prevents renaming] */
/*! export timeoutCallback [provided] [no usage info] [missing usage info prevents renaming] */
/*! export trackAsyncContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export updateSignature [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderStatus": () => /* binding */ OrderStatus,
/* harmony export */   "checkItem": () => /* binding */ checkItem,
/* harmony export */   "checkItems": () => /* binding */ checkItems,
/* harmony export */   "calcTotal": () => /* binding */ calcTotal,
/* harmony export */   "itemCount": () => /* binding */ itemCount,
/* harmony export */   "freezeOnApproval": () => /* binding */ freezeOnApproval,
/* harmony export */   "freezeOnCompletion": () => /* binding */ freezeOnCompletion,
/* harmony export */   "requiredForGuest": () => /* binding */ requiredForGuest,
/* harmony export */   "requiredForApproval": () => /* binding */ requiredForApproval,
/* harmony export */   "requiredForCompletion": () => /* binding */ requiredForCompletion,
/* harmony export */   "statusChangeValid": () => /* binding */ statusChangeValid,
/* harmony export */   "orderTotalValid": () => /* binding */ orderTotalValid,
/* harmony export */   "recalcTotal": () => /* binding */ recalcTotal,
/* harmony export */   "updateSignature": () => /* binding */ updateSignature,
/* harmony export */   "readyToDelete": () => /* binding */ readyToDelete,
/* harmony export */   "paymentCompleted": () => /* binding */ paymentCompleted,
/* harmony export */   "orderShipped": () => /* binding */ orderShipped,
/* harmony export */   "orderPicked": () => /* binding */ orderPicked,
/* harmony export */   "addressValidated": () => /* binding */ addressValidated,
/* harmony export */   "paymentAuthorized": () => /* binding */ paymentAuthorized,
/* harmony export */   "refundPayment": () => /* binding */ refundPayment,
/* harmony export */   "runOrderWorkflow": () => /* binding */ runOrderWorkflow,
/* harmony export */   "handleOrderEvent": () => /* binding */ handleOrderEvent,
/* harmony export */   "makeOrderFactory": () => /* binding */ makeOrderFactory,
/* harmony export */   "approve": () => /* binding */ approve,
/* harmony export */   "cancel": () => /* binding */ cancel,
/* harmony export */   "checkout": () => /* binding */ checkout,
/* harmony export */   "errorCallback": () => /* binding */ errorCallback,
/* harmony export */   "timeoutCallback": () => /* binding */ timeoutCallback,
/* harmony export */   "returnInventory": () => /* binding */ returnInventory,
/* harmony export */   "returnShipment": () => /* binding */ returnShipment,
/* harmony export */   "accountOrder": () => /* binding */ accountOrder,
/* harmony export */   "returnDelivery": () => /* binding */ returnDelivery,
/* harmony export */   "cancelPayment": () => /* binding */ cancelPayment,
/* harmony export */   "OrderError": () => /* binding */ OrderError,
/* harmony export */   "cancelOrders": () => /* binding */ cancelOrders,
/* harmony export */   "approveOrders": () => /* binding */ approveOrders,
/* harmony export */   "trackAsyncContext": () => /* binding */ trackAsyncContext,
/* harmony export */   "customHttpStatus": () => /* binding */ customHttpStatus,
/* harmony export */   "testContainsMany": () => /* binding */ testContainsMany,
/* harmony export */   "runFibonacciJs": () => /* binding */ runFibonacciJs,
/* harmony export */   "getFieldList": () => /* binding */ getFieldList,
/* harmony export */   "createModelEvent": () => /* binding */ createModelEvent
/* harmony export */ });
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins */ "./src/domain/mixins.js");
/* harmony import */ var _domain_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/utils */ "./src/domain/utils.js");
/* harmony import */ var _check_payload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./check-payload */ "./src/domain/check-payload.js");
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stream */ "stream");
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(stream__WEBPACK_IMPORTED_MODULE_3__);


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _OrderActions;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/** @typedef { import('../domain/index.js').ModelSpecification} ModelSpecification */
/** @typedef {string|RegExp} topic*/
/** @typedef {function(string)} eventCallback*/
/** @typedef {import('../adapters/index').adapterFunction} adapterFunction*/
/** @typedef {string} id */
/** @typedef {import("./customer").Customer} Customer */
/** @typedef {function(Order)} undoFunction */
/**
 * @callback logMessageFn
 * @param {object|string} message
 * @param {logType} [type]
 *
 */

/** @typedef {'first'|'last'|'lastStateChange'|'stateChange'|'error'|'undo'} logType */

/**
 * @typedef readLogType
 * @property {number} index
 * @property  {logType} type
 */

/**
 * @typedef {{
 *  itemId: string,
 *  price: number,
 *  qty?: number
 * }} orderItemType
 */

/**
 * @callback relationFunction
 * @property {...args}
 * @returns {Promise<Model>}
 * } relationFunction
 */

/**
 *  @typedef {Object} Order The Order Service
 * @property {function(topic,eventCallback)} listen - listen for events
 * @property {import('../adapters/event-adapter').notifyType} notify
 * @property {adapterFunction} validateAddress - returns valid address or throws exception
 * @property {adapterFunction} completePayment - completes payment for an authorized charge
 * @property {adapterFunction} verifyDelivery - verify the order was received by the customer
 * @property {adapterFunction} trackShipment
 * @property {adapterFunction} refundPayment
 * @property {relationFunction} inventory - reserve inventory items
 * @property {adapterFunction} undo - undo all transactions up to this point
 * @property {function():Promise<Order>} pickOrder - pick items from warehouse and prepare for shipment
 * @property {adapterFunction} authorizePayment - verify payment, i.e. reserve the balance due
 * @property {import('../adapters/shipping-adapter').shipOrder} shipOrder -
 * calls shipping service to print label and request delivery
 * @property {function(Order):Promise<void>} save - saves order
 * @property {function():Promise<Order>} find - finds order
 * @property {string} shippingAddress
 * @property {string} orderNo = the order number
 * @property {string} trackingId - id given by tracking status for this `orderNo`
 * @property {function():Order} decrypt - decrypts sensitive properties
 * @property {function({key1:any,keyN:any}, boolean):Promise<Order>} update - update the order,
 * set the second arg to false to turn off validation.
 * @property {'PENDING'|'APPROVED'|'SHIPPING'|'CANCELED'|'COMPLETED'} orderStatus
 * @property {function(...args):Promise<import("../domain/index").Model>} customer - retrieves related customer object,
 * or if args are provided, creates a new customer object, using the provided args as the input.
 * @property {function(string,Order):Promise} emit - broadcast domain event
 * @property {function():boolean} paymentAccepted - payment approved and funds reserved
 * @property {function():boolean} autoCheckout - whether or not to immediately submit the order
 * @property {boolean} saveShippingDetails save shipping and payment details in a new customer record
 * @property {{itemId:string,price:number,qty:number}[]} orderItems
 * @property {Symbol} customerId {@link Customer}
 * @property {logMessageFn} logEvent
 * @property {logMessageFn} logError
 * @property {logMessageFn} logUndo
 * @property {logMessageFn} logStateChange
 * @property {readMessageFn} readLog
 */

var orderStatus = 'orderStatus';
var orderTotal = 'orderTotal';
var orderNo = 'orderNo';
var OrderStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  SHIPPING: 'SHIPPING',
  COMPLETE: 'COMPLETE',
  CANCELED: 'CANCELED'
};

/**
 *
 * @param {orderItemType} orderItem
 * @returns {boolean} true if item is valid
 */
var checkItem = function checkItem(orderItem) {
  return typeof orderItem.itemId === 'string' && typeof orderItem.price === 'number';
};

/**
 * @param {orderItemType[]} orderItems
 */
var checkItems = function checkItems(orderItems) {
  if (!orderItems || orderItems.length < 1) {
    throw new Error('order contains no items');
  }
  var items = Array.isArray(orderItems) ? orderItems : [orderItems];
  if (items.length > 0 && items.every(checkItem)) {
    return items;
  }
  throw new Error('order items invalid', {
    items: items
  });
};

/**
 * Calculate order total
 * @param {orderItemType[]} orderItems
 */
var calcTotal = function calcTotal(orderItems) {
  var items = checkItems(orderItems);
  return items.reduce(function (total, item) {
    var qty = item.qty || 1;
    return total += item.price * qty;
  }, 0);
};

/**
 * @param {orderItemType[]} orderItems
 * @returns {number} number of items
 */
var itemCount = function itemCount(orderItems) {
  return orderItems.reduce(function (total, item) {
    return total += item.qty || 1;
  });
};

/**
 * No changes to `propKey` properties once the order is approved
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
var freezeOnApproval = function freezeOnApproval(propKey) {
  return function (o) {
    return o.orderStatus && o.orderStatus !== OrderStatus.PENDING ? propKey : null;
  };
};
var finalStatus = function finalStatus(status) {
  return [OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(status);
};

/**
 * No changes to `propKey` once order is complete or canceled
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
var freezeOnCompletion = function freezeOnCompletion(propKey) {
  return function (o) {
    return finalStatus(o.orderStatus) ? null : propKey;
  };
};

/**
 * If not a registered customer, provide shipping & payment details.
 * @param {*} o
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
var requiredForGuest = function requiredForGuest(propKey) {
  return function (o) {
    return o.customerId ? null : propKey;
  };
};

/**
 * Value required to approve order.
 * @param {*} propKey
 */
var requiredForApproval = function requiredForApproval(propKey) {
  return function (o) {
    return o.orderStatus === OrderStatus.APPROVED ? propKey : null;
  };
};

/**
 * Value required to complete order
 * @param {object} o
 * @param {string | string[]} propKey these props are required to comlete the order
 * @returns {string | void} the key or `void`
 */
var requiredForCompletion = function requiredForCompletion(propKey) {
  return function (o) {
    return o.orderStatus === OrderStatus.COMPLETE ? propKey : null;
  };
};

/**
 *
 * @param {enum} from
 * @param {enum} to
 * @returns
 */
var invalidStatusChange = function invalidStatusChange(from, to) {
  return function (o, propVal) {
    return propVal === to && o[_mixins__WEBPACK_IMPORTED_MODULE_0__.prevmodel].orderStatus === from;
  };
};
var invalidStatusChanges = [
// Can't change back to pending once approved
invalidStatusChange(OrderStatus.APPROVED, OrderStatus.PENDING),
// Can't change back to pending once shipped
invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.PENDING),
// Can't change back to approved once shipped
invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.APPROVED),
// Can't change directly to shipping from pending
invalidStatusChange(OrderStatus.PENDING, OrderStatus.SHIPPING),
// Can't change directly to complete from pending
invalidStatusChange(OrderStatus.PENDING, OrderStatus.COMPLETE),
// Can't change final status
invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.PENDING), invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.SHIPPING), invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.APPROVED), invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.CANCELED),
// Can't change final status
invalidStatusChange(OrderStatus.CANCELED, OrderStatus.PENDING), invalidStatusChange(OrderStatus.CANCELED, OrderStatus.SHIPPING), invalidStatusChange(OrderStatus.CANCELED, OrderStatus.APPROVED), invalidStatusChange(OrderStatus.CANCELED, OrderStatus.COMPLETE)];

/**
 * Check that status changes are valid
 */
var statusChangeValid = function statusChangeValid(o, propVal) {
  if (invalidStatusChanges.some(function (i) {
    return i(o, propVal);
  })) {
    throw new Error('invalid status change');
  }
  return true;
};

/**
 *
 * @param {*} o
 * @param {*} propVal
 */
var orderTotalValid = function orderTotalValid(o, propVal) {
  return calcTotal(o.orderItems) === propVal;
};

/**
 * Recalculate order total
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
var recalcTotal = function recalcTotal(o, propVal) {
  return {
    orderTotal: calcTotal(propVal)
  };
};

/**
 * Updated signature requirement if `orderTotal` above certain value
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
var updateSignature = function updateSignature(o, propVal) {
  return {
    signatureRequired: calcTotal(propVal) > 999.99 || o.signatureRequired
  };
};

/**
 * Don't delete orders before they're complete.
 */
function readyToDelete(model) {
  if (![OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(model.orderStatus)) {
    throw new Error('order must be canceled or completed');
  }
  return model;
}

/**
 *
 * @param {Error} error
 * @param {Order} order
 * @param {*} func
 */
function handleError(error, order, func) {
  var errMsg = {
    func: func,
    orderNo: order.orderNo,
    error: error
  };
  if (order) order.emit('orderError', errMsg);
  throw new Error(JSON.stringify(errMsg));
}

/**
 * Callback invoked by adapter when payment is complete
 * @param {{model:Order}} options
 */
function paymentCompleted() {
  return _paymentCompleted.apply(this, arguments);
}

/**
 * Callback invoked by shipping adapter when order is picked up.
 * @param {{model:Order}} options
 * @param {string} shipmentId
 */
function _paymentCompleted() {
  _paymentCompleted = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var options,
      payload,
      order,
      changes,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
          payload = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          order = options.model;
          changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('confirmationCode', options, payload, paymentCompleted.name);
          return _context4.abrupt("return", order.update(_objectSpread(_objectSpread({}, changes), {}, {
            orderStatus: OrderStatus.COMPLETE
          })));
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _paymentCompleted.apply(this, arguments);
}
function orderShipped() {
  return _orderShipped.apply(this, arguments);
}

/**
 * Callback invoked when order is ready for pickup
 * @param {{ model:Order }} options
 */
function _orderShipped() {
  _orderShipped = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var options,
      payload,
      order,
      shipmentPayload,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          payload = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          order = options.model;
          shipmentPayload = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('shipmentId', options, payload, orderShipped.name);
          return _context5.abrupt("return", order.update({
            shipmentId: shipmentPayload.shipmentId,
            orderStatus: OrderStatus.SHIPPING
          }));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _orderShipped.apply(this, arguments);
}
function orderPicked() {
  return _orderPicked.apply(this, arguments);
}

/**
 * Callback invoked when shippingAddress is verified (and possibly corrected)
 * @param {{ model:Order }} options
 * @param {string} shippingAddress
 */
function _orderPicked() {
  _orderPicked = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var options,
      payload,
      order,
      changes,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          options = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
          payload = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          order = options.model;
          changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('pickupAddress', options, payload, addressValidated.name);
          return _context6.abrupt("return", order.update(changes));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _orderPicked.apply(this, arguments);
}
function addressValidated() {
  return _addressValidated.apply(this, arguments);
}

/**
 * Called by adapter when port recevies response from payment service.
 * @param {{ model:Order }} options
 * @param {*} paymentAuthorization
 */
function _addressValidated() {
  _addressValidated = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var options,
      payload,
      order,
      addressPayload,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          options = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
          payload = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
          order = options.model;
          addressPayload = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('shippingAddress', options, payload, addressValidated.name);
          return _context7.abrupt("return", order.update({
            shippingAddress: addressPayload.shippingAddress
          }));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _addressValidated.apply(this, arguments);
}
function paymentAuthorized() {
  return _paymentAuthorized.apply(this, arguments);
}

/**
 * Called to refund payment when order is canceled.
 * @param {*} options
 * @param {*} payload
 * @returns
 */
function _paymentAuthorized() {
  _paymentAuthorized = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var options,
      payload,
      order,
      changes,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
          payload = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
          order = options.model;
          changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('paymentStatus', options, payload, paymentAuthorized.name);
          return _context8.abrupt("return", order.update(_objectSpread(_objectSpread({}, changes), {}, {
            paymentStatus: paymentStatus
          }), false));
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _paymentAuthorized.apply(this, arguments);
}
function refundPayment(_x) {
  return _refundPayment.apply(this, arguments);
}

/**
 *
 * @param {Order} order
 * @returns {Promise<Order>}
 */
function _refundPayment() {
  _refundPayment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(order) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          // call port by same name.
          order.refundPayment(function (options, payload) {
            var changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('refundReceipt', options, payload, refundPayment.name);
            return order.update(_objectSpread(_objectSpread({}, changes), {}, {
              orderStatus: OrderStatus.CANCELED
            }));
          });
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _refundPayment.apply(this, arguments);
}
function verifyAddress(_x2) {
  return _verifyAddress.apply(this, arguments);
}
/**
 * Request the bank or lender to place a hold on
 * the customer account in the amount of the payment
 * due, to be withdrawn once the shipment is safely
 * in our customer's hands, or credited back if things
 * don't work out.
 *
 * @param {Order} order
 * @returns {Promise<Order>}
 */
function _verifyAddress() {
  _verifyAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(order) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          console.debug({
            fn: verifyAddress.name,
            validateAddress: order.validateAddress
          });
          return _context10.abrupt("return", order.validateAddress(addressValidated));
        case 2:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _verifyAddress.apply(this, arguments);
}
function verifyPayment(_x3) {
  return _verifyPayment.apply(this, arguments);
}
/**
 *
 * @param {Order} order
 * @returns {Promise<Order>}
 * @throws {'oInventory'}
 */
function _verifyPayment() {
  _verifyPayment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(order) {
    var authorizeOrder;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return order.authorizePayment(paymentAuthorized);
        case 3:
          authorizeOrder = _context11.sent;
          if (authorizeOrder.paymentDeclined) {
            _context11.next = 6;
            break;
          }
          throw new Error('payment declined');
        case 6:
          return _context11.abrupt("return", authorizeOrder);
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          handleError(_context11.t0, order, verifyPayment.name);
        case 12:
          return _context11.abrupt("return", order);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return _verifyPayment.apply(this, arguments);
}
function verifyInventory(_x4) {
  return _verifyInventory.apply(this, arguments);
}
/**
 * Copy existing customer data into the order
 * or create new customer from order details.
 *
 * @param {Order} order
 * @throws {'InvalidCustomerId'}
 */
function _verifyInventory() {
  _verifyInventory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(order) {
    var inventory, insufficient;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return order.inventory();
        case 2:
          inventory = _context12.sent;
          if (!(inventory.length < 1)) {
            _context12.next = 5;
            break;
          }
          throw new Error('bad inventory ID');
        case 5:
          insufficient = order.orderItems.filter(function (item) {
            var inv = inventory.find(function (i) {
              return i.id === item.itemId;
            });
            if (!inv) return true;
            if (inv.quantity < item.qty) return true;
            return false;
          });
          if (!(insufficient.length > 0)) {
            _context12.next = 9;
            break;
          }
          order.emit('lowOrOutOfStock', insufficient);
          throw new Error("low or out of stock: ".concat(insufficient.map(function (i) {
            return i.itemId;
          })));
        case 9:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _verifyInventory.apply(this, arguments);
}
function getCustomerOrder(_x5) {
  return _getCustomerOrder.apply(this, arguments);
}
/**
 * Handle a new order:
 * - fetch or save customer info
 * - check item availability
 * - authorize payment
 * - verify shipping address
 */
function _getCustomerOrder() {
  _getCustomerOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(order) {
    var customer, custInfo, update, _custInfo, _customer;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (!order.customerId) {
            _context13.next = 13;
            break;
          }
          if (!order.customer) {
            console.log({
              order: order
            });
          }
          // Use the relation defined in the spec
          _context13.next = 4;
          return order.customer();
        case 4:
          customer = _context13.sent;
          if (customer) {
            _context13.next = 7;
            break;
          }
          throw new Error('invalid customer id', order.customerId);
        case 7:
          // Add customer data to the order
          custInfo = _objectSpread(_objectSpread({}, customer.decrypt()), {}, {
            firstName: customer.firstName
          });
          _context13.next = 10;
          return order.update(custInfo);
        case 10:
          update = _context13.sent;
          console.info('update order with data from existing customer', custInfo);
          return _context13.abrupt("return", update);
        case 13:
          if (!order.saveShippingDetails) {
            _context13.next = 20;
            break;
          }
          _custInfo = _objectSpread(_objectSpread({}, order.decrypt()), {}, {
            firstName: order.firstName
          });
          _context13.next = 17;
          return order.customer(_custInfo);
        case 17:
          _customer = _context13.sent;
          console.info('create new customer with data from order', _customer);
          return _context13.abrupt("return", order);
        case 20:
          return _context13.abrupt("return", order);
        case 21:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return _getCustomerOrder.apply(this, arguments);
}
var processPendingOrder = (0,_domain_utils__WEBPACK_IMPORTED_MODULE_1__.asyncPipe)(getCustomerOrder, verifyInventory, verifyPayment, verifyAddress);

/**
 * Implements the beginging of the order service workflow.
 * The rest is implemented by the {@link ModelSpecification}.
 * See the port configuration section of {@link Order}.
 */
var OrderActions = (_OrderActions = {}, _defineProperty(_OrderActions, OrderStatus.PENDING, function (order) {
  // return processPendingOrder(order)

  if (order.autoCheckout) /**@type {Order} */
    getCustomerOrder(order).then(function (order) {
      return runOrderWorkflow(order.updateSync({
        orderStatus: OrderStatus.APPROVED
      }));
    });
}), _defineProperty(_OrderActions, OrderStatus.APPROVED, function (order) {
  try {
    //if (/approved/i.test(order.paymentStatus))
    return order.pickOrder(orderPicked);

    // order.emit('PayAuthFail', 'Payment authorization problem')
    // return order
  } catch (error) {
    console.log({
      error: error
    });
    handleError(error, order, OrderStatus.APPROVED);
  }
  return order;
}), _defineProperty(_OrderActions, OrderStatus.SHIPPING, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(order) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          order.trackShipment(trackingUpdate);
          console.debug({
            func: OrderStatus.SHIPPING,
            order: order
          });
          _context.next = 5;
          return order.update({
            orderStatus: OrderStatus.SHIPPING
          });
        case 5:
          _context.next = 7;
          return _context.sent.emit('orderPicked');
        case 7:
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          handleError(_context.t0, order, OrderStatus.SHIPPING);
        case 12:
          return _context.abrupt("return", order);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x6) {
    return _ref.apply(this, arguments);
  };
}()), _defineProperty(_OrderActions, OrderStatus.CANCELED, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(order) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.debug({
            func: OrderStatus.CANCELED,
            desc: 'order canceled, calling undo',
            orderNo: order.orderNo
          });
          return _context2.abrupt("return", order.undo());
        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          handleError(_context2.t0, order, OrderStatus.CANCELED);
        case 8:
          return _context2.abrupt("return", order);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function (_x7) {
    return _ref2.apply(this, arguments);
  };
}()), _defineProperty(_OrderActions, OrderStatus.COMPLETE, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(order) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // send route to questionnaire, perform analysis, schedule follow-up
          console.log('customer sentiment analysis, customer care, sales analysis');
          return _context3.abrupt("return", order);
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x8) {
    return _ref3.apply(this, arguments);
  };
}()), _OrderActions);

/**
 * Call order service workflow - controlled by status
 * @param {Order} order
 * @returns {Promise<Readonly<Order>>}
 */
function runOrderWorkflow(order) {
  console.log({
    orderStatus: order.orderStatus
  });
  OrderActions[order.orderStatus](order);
}

/**
 * Called on create, update, delete of model instance.
 * @param {{model:Promise<ReadOnly<Order>>}}
 */
function handleOrderEvent(_ref4) {
  var order = _ref4.model,
    eventType = _ref4.eventType,
    changes = _ref4.changes;
  if (changes !== null && changes !== void 0 && changes.orderStatus || eventType === 'CREATE') {
    // console.debug({ fn: handleOrderEvent.name, order })
    runOrderWorkflow(order);
  }
}

/**
 * Require a signature for orders $1000 and up
 * @param {*} input
 * @param {*} orderTotal
 */
function needsSignature(input, orderTotal) {
  return typeof input === 'boolean' ? input : orderTotal > 999.99;
}

/** format and classify log entries */
function logMessage(message, type) {
  var msg = typeof message === 'string' ? message : JSON.stringify(message);
  return {
    desc: msg.substring(0, 140),
    type: type,
    time: Date.now(),
    toJSON: function toJSON() {
      return {
        desc: this.desc,
        type: type,
        time: new Date(this.time).toISOString()
      };
    }
  };
}

/**
 * Returns factory function for the Order model.
 * @type {import('../domain/index.js').modelSpecFactoryFn}
 * @param {*} dependencies - inject dependencies
 */
function makeOrderFactory(dependencies) {
  return function createOrder(_ref5) {
    var _order;
    var orderItems = _ref5.orderItems,
      _ref5$email = _ref5.email,
      email = _ref5$email === void 0 ? null : _ref5$email,
      _ref5$lastName = _ref5.lastName,
      lastName = _ref5$lastName === void 0 ? null : _ref5$lastName,
      _ref5$firstName = _ref5.firstName,
      firstName = _ref5$firstName === void 0 ? null : _ref5$firstName,
      _ref5$customerId = _ref5.customerId,
      customerId = _ref5$customerId === void 0 ? null : _ref5$customerId,
      _ref5$billingAddress = _ref5.billingAddress,
      billingAddress = _ref5$billingAddress === void 0 ? null : _ref5$billingAddress,
      _ref5$shippingAddress = _ref5.shippingAddress,
      shippingAddress = _ref5$shippingAddress === void 0 ? null : _ref5$shippingAddress,
      _ref5$creditCardNumbe = _ref5.creditCardNumber,
      creditCardNumber = _ref5$creditCardNumbe === void 0 ? null : _ref5$creditCardNumbe,
      _ref5$shippingPriorit = _ref5.shippingPriority,
      shippingPriority = _ref5$shippingPriorit === void 0 ? null : _ref5$shippingPriorit,
      _ref5$autoCheckout = _ref5.autoCheckout,
      _autoCheckout = _ref5$autoCheckout === void 0 ? false : _ref5$autoCheckout,
      _ref5$saveShippingDet = _ref5.saveShippingDetails,
      saveShippingDetails = _ref5$saveShippingDet === void 0 ? false : _ref5$saveShippingDet,
      requireSignature = _ref5.requireSignature,
      _ref5$fibonacci = _ref5.fibonacci,
      fibonacci = _ref5$fibonacci === void 0 ? 10 : _ref5$fibonacci;
    //const signatureRequired = needsSignature(requireSignature, total)
    var order = (_order = {
      email: email,
      lastName: lastName,
      firstName: firstName,
      customerId: customerId,
      orderItems: orderItems,
      creditCardNumber: creditCardNumber,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      signatureRequired: false,
      saveShippingDetails: saveShippingDetails,
      shippingPriority: shippingPriority,
      fibonacci: fibonacci,
      result: 0,
      time: 0,
      estimatedArrival: null,
      log: [logMessage('order created')]
    }, _defineProperty(_order, orderTotal, 0), _defineProperty(_order, orderStatus, OrderStatus.PENDING), _defineProperty(_order, orderNo, dependencies.uuid()), _defineProperty(_order, "desc", 'new order 25'), _defineProperty(_order, "itemId", null), _defineProperty(_order, "paymentAccepted", function paymentAccepted() {
      return true;
    }), _defineProperty(_order, "autoCheckout", function autoCheckout() {
      return _autoCheckout;
    }), _defineProperty(_order, "totalItems", function totalItems() {
      return itemCount(this.orderItems);
    }), _defineProperty(_order, "total", function total() {
      return calcTotal(this.orderItems);
    }), _defineProperty(_order, "addItem", function addItem(item) {
      if (checkItem(item)) {
        this.orderItems.push(item);
        return true;
      }
      return false;
    }), _defineProperty(_order, "logEvent", function logEvent(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      this.log.push(logMessage(message, type));
    }), _defineProperty(_order, "logError", function logError(message) {
      this.logEvent(message, 'error');
    }), _defineProperty(_order, "logUndo", function logUndo(message) {
      this.logEvent(message, 'undo');
    }), _defineProperty(_order, "logStateChange", function logStateChange(message) {
      this.logEvent(message, 'stateChange');
    }), _defineProperty(_order, "readLog", function readLog(_ref6) {
      var _ref6$index = _ref6.index,
        index = _ref6$index === void 0 ? null : _ref6$index,
        _ref6$type = _ref6.type,
        type = _ref6$type === void 0 ? null : _ref6$type;
      var indx = parseInt(index);
      if (indx < this.log.length && indx !== NaN) return this.log[indx];
      if (type === 'first') return this.log[0];
      if (type === 'last') return this.log[this.log.length - 1];
      if (type === 'lastStateChange') return this.log[this.log.lastIndexOf({
        type: 'stateChange'
      })];
      if (type === 'stateChanges') return this.log.filter(function (l) {
        return l.type === 'stateChange';
      });
      if (type === 'error') return this.log.filter(function (l) {
        return l.type === 'error';
      });
      if (type === 'undo') return this.log.filter(function (l) {
        return l.type === 'undo';
      });
      return this.log;
    }), _order);
    return Object.freeze(order);
  };
}

/**
 * Called as command to approve/submit order.
 * @param {Order} order
 */
function approve(_x9) {
  return _approve.apply(this, arguments);
}

/**
 * Called as command to cancel order.
 * @param {Order} order
 */
function _approve() {
  _approve = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(order) {
    var approvedOrder;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          console.debug({
            msg: 'got order',
            order: order
          });
          approvedOrder = order.updateSync({
            orderStatus: OrderStatus.APPROVED
          }, false);
          console.debug({
            approvedOrder: approvedOrder
          });
          approvedOrder.logStateChange(OrderStatus.APPROVED);
          return _context14.abrupt("return", runOrderWorkflow(approvedOrder));
        case 5:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _approve.apply(this, arguments);
}
function cancel(_x10) {
  return _cancel.apply(this, arguments);
}

/**
 * Alias of `approve`
 * @param {Order} order
 * @returns
 */
function _cancel() {
  _cancel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(order) {
    var canceledOrder;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return order.update({
            orderStatus: OrderStatus.CANCELED
          });
        case 2:
          canceledOrder = _context15.sent;
          canceledOrder.logStateChange(OrderStatus.CANCELED);
          return _context15.abrupt("return", runOrderWorkflow(canceledOrder));
        case 5:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _cancel.apply(this, arguments);
}
function checkout(_x11) {
  return _checkout.apply(this, arguments);
}

/**
 *
 * @param {{model:Order}} param0
 */
function _checkout() {
  _checkout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(order) {
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", approve(order));
        case 1:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _checkout.apply(this, arguments);
}
function errorCallback(_ref7) {
  var port = _ref7.port,
    order = _ref7.model,
    error = _ref7.error;
  var errMsg = _defineProperty({
    error: error,
    port: port
  }, "error", error);
  console.error(errorCallback.name, errMsg);
  order.logEvent(errMsg);
  order.emit(errorCallback.name, errMsg);
  return order.undo();
}

/**
 *
 * @param {{model:Order}} param0
 */
function timeoutCallback(_ref8) {
  var port = _ref8.port,
    ports = _ref8.ports,
    adapterFn = _ref8.adapterFn,
    order = _ref8.model;
  console.error('timeout...', port);
  //order.logError(timeoutCallback.name, 'timeout')
  order.emit(timeoutCallback.name, errMsg);
}

/**
 * @type {undoFunction}
 * Start process to return canceled order items to inventory.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */
function returnInventory(_x12) {
  return _returnInventory.apply(this, arguments);
}

/**
 * @type {undoFunction}
 * Start process for the shipper to pick the items to return.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */
function _returnInventory() {
  _returnInventory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(order) {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          console.log(returnInventory.name);
          order.logEvent(returnInventory.name, 'timeout');
          order.emit(returnInventory.name, errMsg);
          return _context17.abrupt("return", order.update({
            orderStatus: OrderStatus.CANCELED
          }));
        case 4:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _returnInventory.apply(this, arguments);
}
function returnShipment(_x13) {
  return _returnShipment.apply(this, arguments);
}
function _returnShipment() {
  _returnShipment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(order) {
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          console.log(returnShipment.name);
          order.logUndo(returnShipment.name);
          return _context18.abrupt("return", order.update({
            orderStatus: OrderStatus.CANCELED
          }));
        case 3:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return _returnShipment.apply(this, arguments);
}
function accountOrder(req, res) {}

/**
 * @type {undoFunction}
 * Start process to return canceled order items to inventory.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */
function returnDelivery(_x14) {
  return _returnDelivery.apply(this, arguments);
}

/**
 * @type {undoFunction}
 */
function _returnDelivery() {
  _returnDelivery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(order) {
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          console.log(returnDelivery.name);
          return _context19.abrupt("return", order.update({
            orderStatus: OrderStatus.CANCELED
          }));
        case 2:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return _returnDelivery.apply(this, arguments);
}
function cancelPayment(_x15) {
  return _cancelPayment.apply(this, arguments);
}
function _cancelPayment() {
  _cancelPayment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(order) {
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          console.log(cancelPayment.name);
          return _context20.abrupt("return", order.update({
            orderStatus: OrderStatus.CANCELED
          }));
        case 2:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return _cancelPayment.apply(this, arguments);
}
var OrderError = /*#__PURE__*/function (_Error) {
  _inherits(OrderError, _Error);
  var _super = _createSuper(OrderError);
  function OrderError(error, code) {
    var _this;
    _classCallCheck(this, OrderError);
    _this = _super.call(this, error);
    _this.code = code;
    return _this;
  }
  return _createClass(OrderError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 *
 * @param {Date.now} data
 * @returns
 */
function cancelOrders(_x16) {
  return _cancelOrders.apply(this, arguments);
}

/**
 *
 * @param {Date.now} data
 * @returns
 */
function _cancelOrders() {
  _cancelOrders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(data) {
    var cancelOrdersTransform;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          cancelOrdersTransform = new stream__WEBPACK_IMPORTED_MODULE_3__.Transform({
            objectMode: true,
            transform: function transform(chunk, _encoding, done) {
              done(null, JSON.stringify(_objectSpread(_objectSpread({}, chunk), {}, {
                orderStatus: OrderStatus.CANCELED
              })));
            }
          });
          _context21.next = 3;
          return this.list({
            writable: this.createWriteStream(),
            transform: cancelOrdersTransform,
            serialize: false
          });
        case 3:
          return _context21.abrupt("return", {
            status: '🏆'
          });
        case 4:
        case "end":
          return _context21.stop();
      }
    }, _callee21, this);
  }));
  return _cancelOrders.apply(this, arguments);
}
function approveOrders(_x17) {
  return _approveOrders.apply(this, arguments);
}

/**
 *
 * @returns
 */
function _approveOrders() {
  _approveOrders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(data) {
    var _this2 = this;
    var approveOrdersTransform;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          approveOrdersTransform = new stream__WEBPACK_IMPORTED_MODULE_3__.Transform({
            objectMode: true,
            transform: function transform(chunk, encoding, done) {
              if (chunk._id) delete chunk._id;
              _this2.push(JSON.stringify(_objectSpread(_objectSpread({}, chunk), {}, {
                orderStatus: OrderStatus.APPROVED
              })));
              done();
            }
          });
          _context22.next = 3;
          return this.list({
            writable: this.createWriteStream(),
            transform: approveOrdersTransform
          });
        case 3:
          return _context22.abrupt("return", {
            status: '🏆'
          });
        case 4:
        case "end":
          return _context22.stop();
      }
    }, _callee22, this);
  }));
  return _approveOrders.apply(this, arguments);
}
function trackAsyncContext() {
  return _trackAsyncContext.apply(this, arguments);
}
function _trackAsyncContext() {
  _trackAsyncContext = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
    var ctx, dur, startTime, metric;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          ctx = this.getContext();
          dur = 'test-duration';
          startTime = Date.now();
          _context23.next = 5;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 100);
          });
        case 5:
          // require('fs')
          //   .stream('/etc/hosts')
          //   .pipe(ctx.get('res'))

          ctx.set(dur, Date.now() - startTime);
          metric = {
            requestId: ctx.get('id'),
            fn: trackAsyncContext.name,
            duration: ctx.get(dur),
            context: _toConsumableArray(ctx)
          };
          this.emit('metric', metric);
          console.log(metric.ctx);
          return _context23.abrupt("return", metric);
        case 10:
        case "end":
          return _context23.stop();
      }
    }, _callee23, this);
  }));
  return _trackAsyncContext.apply(this, arguments);
}
function customHttpStatus(_x18) {
  return _customHttpStatus.apply(this, arguments);
}
function _customHttpStatus() {
  _customHttpStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(data) {
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          if (!data.args.code) {
            _context24.next = 2;
            break;
          }
          throw new OrderError(data.args.message || 'custom status', data.args.code);
        case 2:
          _context24.prev = 2;
          console.log(x);
          _context24.next = 9;
          break;
        case 6:
          _context24.prev = 6;
          _context24.t0 = _context24["catch"](2);
          throw new OrderError(_context24.t0, 500);
        case 9:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[2, 6]]);
  }));
  return _customHttpStatus.apply(this, arguments);
}
function testContainsMany(_x19) {
  return _testContainsMany.apply(this, arguments);
}
function _testContainsMany() {
  _testContainsMany = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(data) {
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          console.log({
            fn: testContainsMany.name,
            data: data
          });
          _context25.next = 3;
          return this.inventory();
        case 3:
          _context25.t0 = _context25.sent;
          return _context25.abrupt("return", {
            status: '👍',
            inventory: _context25.t0
          });
        case 5:
        case "end":
          return _context25.stop();
      }
    }, _callee25, this);
  }));
  return _testContainsMany.apply(this, arguments);
}
function fibonacci(x) {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return fibonacci(x - 1) + fibonacci(x - 2);
}
function runFibonacciJs(_x20) {
  return _runFibonacciJs.apply(this, arguments);
}
function _runFibonacciJs() {
  _runFibonacciJs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(data) {
    var param, start;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          console.log({
            data: data
          });
          param = parseInt(data.args.fibonacci || 20);
          start = Date.now();
          return _context26.abrupt("return", {
            fibonacci: param,
            result: fibonacci(param),
            time: Date.now() - start
          });
        case 4:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return _runFibonacciJs.apply(this, arguments);
}
function getFieldList() {
  return _getFieldList.apply(this, arguments);
}
function _getFieldList() {
  _getFieldList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
    var model;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return this.list({
            query: {
              __limit: 1
            }
          });
        case 2:
          model = _context27.sent;
          console.log({
            model: model[0]
          });
          return _context27.abrupt("return", Object.keys(model[0]));
        case 5:
        case "end":
          return _context27.stop();
      }
    }, _callee27, this);
  }));
  return _getFieldList.apply(this, arguments);
}
function createModelEvent() {
  return _createModelEvent.apply(this, arguments);
}
function _createModelEvent() {
  _createModelEvent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
    var _this3 = this;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          return _context28.abrupt("return", new Promise(function (resolve) {
            _this3.emit('createModel_ORDER', {
              cb: function cb(model) {
                return resolve(model);
              },
              args: {
                a: 1,
                b: 2
              }
            });
          }));
        case 1:
        case "end":
          return _context28.stop();
      }
    }, _callee28);
  }));
  return _createModelEvent.apply(this, arguments);
}

/***/ }),

/***/ "./src/domain/ports.js":
/*!*****************************!*\
  !*** ./src/domain/ports.js ***!
  \*****************************/
/*! namespace exports */
/*! export approveOrders [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .approveOrders */
/*! export cancelOrders [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .cancelOrders */
/*! export createModelEvent [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .createModelEvent */
/*! export customHttpStatus [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .customHttpStatus */
/*! export doesFieldExist [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/customer.js .doesFieldExist */
/*! export getFieldList [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .getFieldList */
/*! export runFibonacciCust [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/customer.js .runFibonacciCust */
/*! export runFibonacciJs [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .runFibonacciJs */
/*! export testContainsMany [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .testContainsMany */
/*! export trackAsyncContext [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .trackAsyncContext */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cancelOrders": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.cancelOrders,
/* harmony export */   "approveOrders": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.approveOrders,
/* harmony export */   "trackAsyncContext": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.trackAsyncContext,
/* harmony export */   "customHttpStatus": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.customHttpStatus,
/* harmony export */   "testContainsMany": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.testContainsMany,
/* harmony export */   "runFibonacciJs": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.runFibonacciJs,
/* harmony export */   "getFieldList": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.getFieldList,
/* harmony export */   "createModelEvent": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.createModelEvent,
/* harmony export */   "runFibonacciCust": () => /* reexport safe */ _customer__WEBPACK_IMPORTED_MODULE_1__.runFibonacciCust,
/* harmony export */   "doesFieldExist": () => /* reexport safe */ _customer__WEBPACK_IMPORTED_MODULE_1__.doesFieldExist
/* harmony export */ });
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order */ "./src/domain/order.js");
/* harmony import */ var _customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customer */ "./src/domain/customer.js");
// import { systemsInGalaxy } from './SolarSystem'



// export { listSolarSystems, sendGalaticSignal } from './Galaxy'
// export {
//   systemsInGalaxy,
//   sendSolarSignal,
//   receiveGalacticSignal
// } from './SolarSystem'
// export { receiveSolarSignal, planetsInSolarSystem } from './Planet'
// export {
//   qeRunFibonacci,
//   qeCustomHttpStatus,
//   qeGetPublicIpAddressIn
// } from './query-engine'
// export { damBrowseIn, damDownloadIn, damSearchIn, damUploadIn } from './dam-api'
// export { tmListEventsIn } from './ticket-master'
// export { callFetchService } from './access-controller'

/***/ }),

/***/ "./src/domain/utils.js":
/*!*****************************!*\
  !*** ./src/domain/utils.js ***!
  \*****************************/
/*! namespace exports */
/*! export async [provided] [no usage info] [missing usage info prevents renaming] */
/*! export asyncPipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export compose [provided] [no usage info] [missing usage info prevents renaming] */
/*! export composeAsync [provided] [no usage info] [missing usage info prevents renaming] */
/*! export decrypt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export encrypt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hash [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export uuid [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compose": () => /* binding */ compose,
/* harmony export */   "composeAsync": () => /* binding */ composeAsync,
/* harmony export */   "asyncPipe": () => /* binding */ asyncPipe,
/* harmony export */   "encrypt": () => /* binding */ encrypt,
/* harmony export */   "decrypt": () => /* binding */ decrypt,
/* harmony export */   "hash": () => /* binding */ hash,
/* harmony export */   "uuid": () => /* binding */ uuid,
/* harmony export */   "makeArray": () => /* binding */ makeArray,
/* harmony export */   "makeObject": () => /* binding */ makeObject,
/* harmony export */   "async": () => /* binding */ async
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "webpack/sharing/consume/default/nanoid/nanoid");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nanoid__WEBPACK_IMPORTED_MODULE_1__);


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  return function (initVal) {
    return funcs.reduceRight(function (val, func) {
      return func(val);
    }, initVal);
  };
}
function composeAsync() {
  for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }
  return function (initVal) {
    return funcs.reduceRight(function (val, func) {
      return val.then(func);
    }, Promise.resolve(initVal));
  };
}

/**
 * @callback pipeFn
 * @param {object} obj - the object to compose
 * @returns {object} - the composed object
 */

/**
 * @param {pipeFn} func
 */
var asyncPipe = function asyncPipe() {
  for (var _len3 = arguments.length, func = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    func[_key3] = arguments[_key3];
  }
  return function (obj) {
    return func.reduce(function (o, f) {
      return o.then(f);
    }, Promise.resolve(obj));
  };
};
var passwd = process.env.ENCRYPTION_PWD;
var algo = 'aes-192-cbc';
var key = crypto__WEBPACK_IMPORTED_MODULE_0___default().scryptSync(String(passwd), 'salt', 24);
var iv = Buffer.alloc(16, 0);
function encrypt(text) {
  var cipher = crypto__WEBPACK_IMPORTED_MODULE_0___default().createCipheriv(algo, key, iv);
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher["final"]('hex');
  return encrypted;
}
function decrypt(cipherText) {
  console.log('decrypt(%s)', cipherText);
  var decipher = crypto__WEBPACK_IMPORTED_MODULE_0___default().createDecipheriv(algo, key, iv);
  var decrypted = decipher.update(cipherText, 'hex', 'utf8');
  decrypted += decipher["final"]('utf8');
  return decrypted;
}
function hash(data) {
  return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('sha1').update(data).digest('hex');
}
function uuid() {
  // return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
  //   (c ^ (crypto.randomBytes(16)[0] & (15 >> (c / 4)))).toString(16)
  // );
  return (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)();
}
function makeArray(v) {
  return Array.isArray(v) ? v : [v];
}
function makeObject(prop) {
  if (Array.isArray(prop)) {
    return prop.reduce(function (p, c) {
      return _objectSpread(_objectSpread({}, p), c);
    });
  }
  return prop;
}

/**
 *
 * @param {Promise<{
 * ok:()=>any,
 *
 * }} promise
 * @returns
 */
function async(promise) {
  return promise.then(function (result) {
    return {
      ok: true,
      object: result,
      asObject: function asObject() {
        return makeObject(result);
      },
      asArray: function asArray() {
        return makeArray(result);
      }
    };
  })["catch"](function (error) {
    console.error(error);
    return Promise.resolve({
      ok: false,
      error: error
    });
  });
}

/***/ })

};
;
//# sourceMappingURL=334.js.map