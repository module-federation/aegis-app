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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
/*! export makeCustomerFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export okToDelete [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeCustomerFactory": () => /* binding */ makeCustomerFactory,
/* harmony export */   "okToDelete": () => /* binding */ okToDelete
/* harmony export */ });


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

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
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return customer.orders();

          case 3:
            orders = _context.sent;
            return _context.abrupt("return", orders.length > 0);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error({
              func: okToDelete.name,
              error: _context.t0
            });
            return _context.abrupt("return", true);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _okToDelete.apply(this, arguments);
}

/***/ }),

/***/ "./src/domain/inventory.js":
/*!*********************************!*\
  !*** ./src/domain/inventory.js ***!
  \*********************************/
/*! namespace exports */
/*! export assetTypes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export categories [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeInventoryFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export properties [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assetTypes": () => /* binding */ assetTypes,
/* harmony export */   "properties": () => /* binding */ properties,
/* harmony export */   "categories": () => /* binding */ categories,
/* harmony export */   "makeInventoryFactory": () => /* binding */ makeInventoryFactory
/* harmony export */ });


var assetTypes = ['rotating-asset', 'spare-part'];
var properties = ['height', 'length', 'width', 'weight', 'color'];
var categories = ['home', 'auto', 'business'];
var makeInventoryFactory = function makeInventoryFactory(dependencies) {
  return function (_ref) {
    var category = _ref.category,
        properties = _ref.properties,
        price = _ref.price,
        discount = _ref.discount,
        name = _ref.name,
        desc = _ref.desc,
        sku = _ref.sku,
        purchaseOrder = _ref.purchaseOrder,
        vendor = _ref.vendor,
        inStock = _ref.inStock,
        assetType = _ref.assetType,
        quantity = _ref.quantity;
    return Object.freeze({
      category: category,
      properties: properties,
      price: price - (discount || 0.0),
      name: name,
      desc: desc,
      sku: sku,
      purchaseOrder: purchaseOrder,
      vendor: vendor,
      inStock: inStock,
      assetType: assetType,
      quantity: quantity
    });
  };
};

/***/ }),

/***/ "./src/domain/order.js":
/*!*****************************!*\
  !*** ./src/domain/order.js ***!
  \*****************************/
/*! namespace exports */
/*! export OrderStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export accountOrder [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addressValidated [provided] [no usage info] [missing usage info prevents renaming] */
/*! export approve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export calcTotal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cancel [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cancelPayment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkItems [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export errorCallback [provided] [no usage info] [missing usage info prevents renaming] */
/*! export freezeOnApproval [provided] [no usage info] [missing usage info prevents renaming] */
/*! export freezeOnCompletion [provided] [no usage info] [missing usage info prevents renaming] */
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
/*! export runOrderWorkflow [provided] [no usage info] [missing usage info prevents renaming] */
/*! export statusChangeValid [provided] [no usage info] [missing usage info prevents renaming] */
/*! export timeoutCallback [provided] [no usage info] [missing usage info prevents renaming] */
/*! export updateSignature [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
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
/* harmony export */   "cancelPayment": () => /* binding */ cancelPayment
/* harmony export */ });
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins */ "./src/domain/mixins.js");
/* harmony import */ var _domain_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/utils */ "./src/domain/utils.js");
/* harmony import */ var _check_payload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./check-payload */ "./src/domain/check-payload.js");


var _OrderActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

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

  throw new Error('order items invalid');
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

var invalidStatusChanges = [// Can't change back to pending once approved
invalidStatusChange(OrderStatus.APPROVED, OrderStatus.PENDING), // Can't change back to pending once shipped
invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.PENDING), // Can't change back to approved once shipped
invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.APPROVED), // Can't change directly to shipping from pending
invalidStatusChange(OrderStatus.PENDING, OrderStatus.SHIPPING), // Can't change directly to complete from pending
invalidStatusChange(OrderStatus.PENDING, OrderStatus.COMPLETE), // Can't change final status
invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.PENDING), invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.SHIPPING), invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.APPROVED), invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.CANCELED), // Can't change final status
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
  _paymentCompleted = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var options,
        payload,
        order,
        changes,
        _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            options = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
            payload = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
            order = options.model;
            changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('confirmationCode', options, payload, paymentCompleted.name);
            return _context7.abrupt("return", order.update(_objectSpread(_objectSpread({}, changes), {}, {
              orderStatus: OrderStatus.COMPLETE
            })));

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
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
  _orderShipped = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var options,
        payload,
        order,
        shipmentPayload,
        _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
            payload = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
            order = options.model;
            shipmentPayload = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('shipmentId', options, payload, orderShipped.name);
            return _context8.abrupt("return", order.update({
              shipmentId: shipmentPayload.shipmentId,
              orderStatus: OrderStatus.SHIPPING
            }));

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
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
  _orderPicked = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var options,
        payload,
        order,
        changes,
        _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
            payload = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
            order = options.model;
            changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('pickupAddress', options, payload, addressValidated.name);
            return _context9.abrupt("return", order.update(changes));

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
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
  _addressValidated = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var options,
        payload,
        order,
        addressPayload,
        _args10 = arguments;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            options = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
            payload = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
            order = options.model;
            addressPayload = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('shippingAddress', options, payload, addressValidated.name);
            return _context10.abrupt("return", order.update({
              shippingAddress: addressPayload.shippingAddress
            }));

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
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
  _paymentAuthorized = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var options,
        payload,
        order,
        changes,
        _args11 = arguments;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            options = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
            payload = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
            order = options.model;
            changes = (0,_check_payload__WEBPACK_IMPORTED_MODULE_2__.default)('paymentStatus', options, payload, paymentAuthorized.name);
            return _context11.abrupt("return", order.update(_objectSpread(_objectSpread({}, changes), {}, {
              paymentStatus: paymentStatus
            }), false));

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
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
  _refundPayment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(order) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
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
            return _context12.stop();
        }
      }
    }, _callee12);
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
  _verifyAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(order) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            console.debug({
              fn: verifyAddress.name,
              validateAddress: order.validateAddress
            });
            return _context13.abrupt("return", order.validateAddress(addressValidated));

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
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
 * @throws {'InsufficientInventory'}
 */


function _verifyPayment() {
  _verifyPayment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(order) {
    var authorizeOrder;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return order.authorizePayment(paymentAuthorized);

          case 3:
            authorizeOrder = _context14.sent;

            if (authorizeOrder.paymentDeclined) {
              _context14.next = 6;
              break;
            }

            throw new Error('payment declined');

          case 6:
            return _context14.abrupt("return", authorizeOrder);

          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14["catch"](0);
            handleError(_context14.t0, order, verifyPayment.name);

          case 12:
            return _context14.abrupt("return", order);

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 9]]);
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
  _verifyInventory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(order) {
    var inventory, insufficient;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return order.inventory();

          case 2:
            inventory = _context15.sent;

            if (!(inventory.length < 1)) {
              _context15.next = 5;
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
              _context15.next = 9;
              break;
            }

            order.emit('lowOrOutOfStock', insufficient);
            throw new Error("low or out of stock: ".concat(insufficient.map(function (i) {
              return i.itemId;
            })));

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
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
  _getCustomerOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(order) {
    var customer, custInfo, update, _custInfo, _customer;

    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (!order.customerId) {
              _context16.next = 13;
              break;
            }

            if (!order.customer) {
              console.log({
                order: order
              });
            } // Use the relation defined in the spec


            _context16.next = 4;
            return order.customer();

          case 4:
            customer = _context16.sent;

            if (customer) {
              _context16.next = 7;
              break;
            }

            throw new Error('invalid customer id', order.customerId);

          case 7:
            // Add customer data to the order
            custInfo = _objectSpread(_objectSpread({}, customer.decrypt()), {}, {
              firstName: customer.firstName
            });
            _context16.next = 10;
            return order.update(custInfo);

          case 10:
            update = _context16.sent;
            console.info('update order with data from existing customer', custInfo);
            return _context16.abrupt("return", update);

          case 13:
            if (!order.saveShippingDetails) {
              _context16.next = 20;
              break;
            }

            _custInfo = _objectSpread(_objectSpread({}, order.decrypt()), {}, {
              firstName: order.firstName
            });
            _context16.next = 17;
            return order.customer(_custInfo);

          case 17:
            _customer = _context16.sent;
            console.info('create new customer with data from order', _customer);
            return _context16.abrupt("return", order);

          case 20:
            return _context16.abrupt("return", order);

          case 21:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _getCustomerOrder.apply(this, arguments);
}

var processPendingOrder = (0,_domain_utils__WEBPACK_IMPORTED_MODULE_1__.asyncPipe)(getCustomerOrder, verifyInventory, verifyPayment, verifyAddress);
/**
 * Implements the beginging of the order service workflow.
 * The rest is implemented by the {@link ModelSpecification}.
 * See the port configuration section of {@link Order}.
 */

var OrderActions = (_OrderActions = {}, _defineProperty(_OrderActions, OrderStatus.PENDING, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(order) {
    var processedOrder;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return processPendingOrder(order);

          case 3:
            processedOrder = _context.sent;

            if (processedOrder.autoCheckout()) {
              runOrderWorkflow(processedOrder.update({
                OrderStatus: OrderStatus.APPROVED
              }, false));
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 10:
            return _context.abrupt("return", order);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x6) {
    return _ref.apply(this, arguments);
  };
}()), _defineProperty(_OrderActions, OrderStatus.APPROVED, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(order) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('typeof order', _typeof(order));
            _context2.prev = 1;

            if (!/approved/i.test(order.paymentStatus)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", order.pickOrder(orderPicked));

          case 4:
            _context2.next = 6;
            return order.emit('PayAuthFail', 'Payment authorization problem');

          case 6:
            return _context2.abrupt("return", order);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log({
              error: _context2.t0
            });
            handleError(_context2.t0, order, OrderStatus.APPROVED);

          case 13:
            return _context2.abrupt("return", order);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function (_x7) {
    return _ref2.apply(this, arguments);
  };
}()), _defineProperty(_OrderActions, OrderStatus.SHIPPING, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(order) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            order.trackShipment(trackingUpdate);
            console.debug({
              func: OrderStatus.SHIPPING,
              order: order
            });
            _context3.next = 5;
            return order.update({
              orderStatus: OrderStatus.SHIPPING
            });

          case 5:
            _context3.next = 7;
            return _context3.sent.emit('orderPicked');

          case 7:
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            handleError(_context3.t0, order, OrderStatus.SHIPPING);

          case 12:
            return _context3.abrupt("return", order);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x8) {
    return _ref3.apply(this, arguments);
  };
}()), _defineProperty(_OrderActions, OrderStatus.CANCELED, function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(order) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            console.debug({
              func: OrderStatus.CANCELED,
              desc: 'order canceled, calling undo',
              orderNo: order.orderNo
            });
            return _context4.abrupt("return", order.undo());

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            handleError(_context4.t0, order, OrderStatus.CANCELED);

          case 8:
            return _context4.abrupt("return", order);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 5]]);
  }));

  return function (_x9) {
    return _ref4.apply(this, arguments);
  };
}()), _defineProperty(_OrderActions, OrderStatus.COMPLETE, function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(order) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // send route to questionnaire, perform analysis, schedule follow-up
            console.log('customer sentiment analysis, customer care, sales analysis');
            return _context5.abrupt("return", order);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x10) {
    return _ref5.apply(this, arguments);
  };
}()), _OrderActions);
/**
 * Call order service workflow - controlled by status
 * @param {Order} order
 * @returns {Promise<Readonly<Order>>}
 */

function runOrderWorkflow(_x11) {
  return _runOrderWorkflow.apply(this, arguments);
}
/**
 * Called on create, update, delete of model instance.
 * @param {{model:Promise<ReadOnly<Order>>}}
 */

function _runOrderWorkflow() {
  _runOrderWorkflow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(order) {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            return _context17.abrupt("return", OrderActions[order.orderStatus](order));

          case 1:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _runOrderWorkflow.apply(this, arguments);
}

function handleOrderEvent(_x12) {
  return _handleOrderEvent.apply(this, arguments);
}
/**
 * Require a signature for orders $1000 and up
 * @param {*} input
 * @param {*} orderTotal
 */

function _handleOrderEvent() {
  _handleOrderEvent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(_ref6) {
    var order, eventType, changes;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            order = _ref6.model, eventType = _ref6.eventType, changes = _ref6.changes;

            if (!(changes !== null && changes !== void 0 && changes.orderStatus || eventType === 'CREATE')) {
              _context18.next = 3;
              break;
            }

            return _context18.abrupt("return", runOrderWorkflow(order));

          case 3:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _handleOrderEvent.apply(this, arguments);
}

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
        time: new Date(this.time).toUTCString()
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
  return /*#__PURE__*/function () {
    var _createOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref7) {
      var _order;

      var orderItems, _ref7$email, email, _ref7$lastName, lastName, _ref7$firstName, firstName, _ref7$customerId, customerId, _ref7$billingAddress, billingAddress, _ref7$shippingAddress, shippingAddress, _ref7$creditCardNumbe, creditCardNumber, _ref7$shippingPriorit, shippingPriority, _ref7$autoCheckout, _autoCheckout, _ref7$saveShippingDet, saveShippingDetails, requireSignature, _ref7$fibonacci, fibonacci, total, signatureRequired, order;

      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              orderItems = _ref7.orderItems, _ref7$email = _ref7.email, email = _ref7$email === void 0 ? null : _ref7$email, _ref7$lastName = _ref7.lastName, lastName = _ref7$lastName === void 0 ? null : _ref7$lastName, _ref7$firstName = _ref7.firstName, firstName = _ref7$firstName === void 0 ? null : _ref7$firstName, _ref7$customerId = _ref7.customerId, customerId = _ref7$customerId === void 0 ? null : _ref7$customerId, _ref7$billingAddress = _ref7.billingAddress, billingAddress = _ref7$billingAddress === void 0 ? null : _ref7$billingAddress, _ref7$shippingAddress = _ref7.shippingAddress, shippingAddress = _ref7$shippingAddress === void 0 ? null : _ref7$shippingAddress, _ref7$creditCardNumbe = _ref7.creditCardNumber, creditCardNumber = _ref7$creditCardNumbe === void 0 ? null : _ref7$creditCardNumbe, _ref7$shippingPriorit = _ref7.shippingPriority, shippingPriority = _ref7$shippingPriorit === void 0 ? null : _ref7$shippingPriorit, _ref7$autoCheckout = _ref7.autoCheckout, _autoCheckout = _ref7$autoCheckout === void 0 ? false : _ref7$autoCheckout, _ref7$saveShippingDet = _ref7.saveShippingDetails, saveShippingDetails = _ref7$saveShippingDet === void 0 ? false : _ref7$saveShippingDet, requireSignature = _ref7.requireSignature, _ref7$fibonacci = _ref7.fibonacci, fibonacci = _ref7$fibonacci === void 0 ? 10 : _ref7$fibonacci;
              total = calcTotal(orderItems);
              signatureRequired = needsSignature(requireSignature, total);
              order = (_order = {
                email: email,
                lastName: lastName,
                firstName: firstName,
                customerId: customerId,
                orderItems: orderItems,
                creditCardNumber: creditCardNumber,
                billingAddress: billingAddress,
                shippingAddress: shippingAddress,
                signatureRequired: signatureRequired,
                saveShippingDetails: saveShippingDetails,
                shippingPriority: shippingPriority,
                fibonacci: fibonacci,
                result: 0,
                time: 0,
                estimatedArrival: null,
                log: [logMessage('order created')]
              }, _defineProperty(_order, orderTotal, total), _defineProperty(_order, orderStatus, OrderStatus.PENDING), _defineProperty(_order, orderNo, dependencies.uuid()), _defineProperty(_order, "desc", 'new order 25'), _defineProperty(_order, "paymentAccepted", function paymentAccepted() {
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
              }), _defineProperty(_order, "readLog", function readLog(_ref8) {
                var _ref8$index = _ref8.index,
                    index = _ref8$index === void 0 ? null : _ref8$index,
                    _ref8$type = _ref8.type,
                    type = _ref8$type === void 0 ? null : _ref8$type;
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
              return _context6.abrupt("return", Object.freeze(order));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function createOrder(_x13) {
      return _createOrder.apply(this, arguments);
    }

    return createOrder;
  }();
}
/**
 * Called as command to approve/submit order.
 * @param {Order} order
 */

function approve(_x14) {
  return _approve.apply(this, arguments);
}
/**
 * Called as command to cancel order.
 * @param {Order} order
 */

function _approve() {
  _approve = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(order) {
    var approvedOrder;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
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
            return _context19.abrupt("return", runOrderWorkflow(approvedOrder));

          case 5:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _approve.apply(this, arguments);
}

function cancel(_x15) {
  return _cancel.apply(this, arguments);
}
/**
 * Alias of `approve`
 * @param {Order} order
 * @returns
 */

function _cancel() {
  _cancel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(order) {
    var canceledOrder;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return order.update({
              orderStatus: OrderStatus.CANCELED
            });

          case 2:
            canceledOrder = _context20.sent;
            canceledOrder.logStateChange(OrderStatus.CANCELED);
            return _context20.abrupt("return", runOrderWorkflow(canceledOrder));

          case 5:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return _cancel.apply(this, arguments);
}

function checkout(_x16) {
  return _checkout.apply(this, arguments);
}
/**
 *
 * @param {{model:Order}} param0
 */

function _checkout() {
  _checkout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(order) {
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            return _context21.abrupt("return", approve(order));

          case 1:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));
  return _checkout.apply(this, arguments);
}

function errorCallback(_ref9) {
  var port = _ref9.port,
      order = _ref9.model,
      error = _ref9.error;

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

function timeoutCallback(_ref10) {
  var port = _ref10.port,
      ports = _ref10.ports,
      adapterFn = _ref10.adapterFn,
      order = _ref10.model;
  console.error('timeout...', port); //order.logError(timeoutCallback.name, 'timeout')

  order.emit(timeoutCallback.name, errMsg);
}
/**
 * @type {undoFunction}
 * Start process to return canceled order items to inventory.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */

function returnInventory(_x17) {
  return _returnInventory.apply(this, arguments);
}
/**
 * @type {undoFunction}
 * Start process for the shipper to pick the items to return.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */

function _returnInventory() {
  _returnInventory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(order) {
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            console.log(returnInventory.name);
            order.logEvent(returnInventory.name, 'timeout');
            order.emit(returnInventory.name, errMsg);
            return _context22.abrupt("return", order.update({
              orderStatus: OrderStatus.CANCELED
            }));

          case 4:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));
  return _returnInventory.apply(this, arguments);
}

function returnShipment(_x18) {
  return _returnShipment.apply(this, arguments);
}

function _returnShipment() {
  _returnShipment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(order) {
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            console.log(returnShipment.name);
            order.logUndo(returnShipment.name);
            return _context23.abrupt("return", order.update({
              orderStatus: OrderStatus.CANCELED
            }));

          case 3:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  }));
  return _returnShipment.apply(this, arguments);
}

function accountOrder(req, res) {}
1;
/**
 * @type {undoFunction}
 * Start process to return canceled order items to inventory.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */

function returnDelivery(_x19) {
  return _returnDelivery.apply(this, arguments);
}
/**
 * @type {undoFunction}
 */

function _returnDelivery() {
  _returnDelivery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(order) {
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            console.log(returnDelivery.name);
            return _context24.abrupt("return", order.update({
              orderStatus: OrderStatus.CANCELED
            }));

          case 2:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  }));
  return _returnDelivery.apply(this, arguments);
}

function cancelPayment(_x20) {
  return _cancelPayment.apply(this, arguments);
}

function _cancelPayment() {
  _cancelPayment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(order) {
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            console.log(cancelPayment.name);
            return _context25.abrupt("return", order.update({
              orderStatus: OrderStatus.CANCELED
            }));

          case 2:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  }));
  return _cancelPayment.apply(this, arguments);
}

/***/ }),

/***/ "./src/domain/ports.js":
/*!*****************************!*\
  !*** ./src/domain/ports.js ***!
  \*****************************/
/*! namespace exports */
/*! export OrderStatus [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .OrderStatus */
/*! export accountOrder [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .accountOrder */
/*! export addressValidated [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .addressValidated */
/*! export approve [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .approve */
/*! export assetTypes [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/inventory.js .assetTypes */
/*! export calcTotal [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .calcTotal */
/*! export cancel [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .cancel */
/*! export cancelPayment [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .cancelPayment */
/*! export categories [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/inventory.js .categories */
/*! export checkItem [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .checkItem */
/*! export checkItems [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .checkItems */
/*! export checkout [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .checkout */
/*! export errorCallback [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .errorCallback */
/*! export freezeOnApproval [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .freezeOnApproval */
/*! export freezeOnCompletion [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .freezeOnCompletion */
/*! export handleOrderEvent [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .handleOrderEvent */
/*! export itemCount [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .itemCount */
/*! export makeCustomerFactory [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/customer.js .makeCustomerFactory */
/*! export makeInventoryFactory [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/inventory.js .makeInventoryFactory */
/*! export makeOrderFactory [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .makeOrderFactory */
/*! export okToDelete [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/customer.js .okToDelete */
/*! export orderPicked [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .orderPicked */
/*! export orderShipped [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .orderShipped */
/*! export orderTotalValid [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .orderTotalValid */
/*! export paymentAuthorized [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .paymentAuthorized */
/*! export paymentCompleted [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .paymentCompleted */
/*! export properties [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/inventory.js .properties */
/*! export readyToDelete [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .readyToDelete */
/*! export recalcTotal [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .recalcTotal */
/*! export refundPayment [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .refundPayment */
/*! export requiredForApproval [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .requiredForApproval */
/*! export requiredForCompletion [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .requiredForCompletion */
/*! export requiredForGuest [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .requiredForGuest */
/*! export returnDelivery [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .returnDelivery */
/*! export returnInventory [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .returnInventory */
/*! export returnShipment [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .returnShipment */
/*! export runOrderWorkflow [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .runOrderWorkflow */
/*! export statusChangeValid [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .statusChangeValid */
/*! export timeoutCallback [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .timeoutCallback */
/*! export updateSignature [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/order.js .updateSignature */
/*! export userFactory [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/user.js .userFactory */
/*! export userMixins [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/user.js .userMixins */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderStatus": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.OrderStatus,
/* harmony export */   "accountOrder": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.accountOrder,
/* harmony export */   "addressValidated": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.addressValidated,
/* harmony export */   "approve": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.approve,
/* harmony export */   "calcTotal": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.calcTotal,
/* harmony export */   "cancel": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.cancel,
/* harmony export */   "cancelPayment": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.cancelPayment,
/* harmony export */   "checkItem": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.checkItem,
/* harmony export */   "checkItems": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.checkItems,
/* harmony export */   "checkout": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.checkout,
/* harmony export */   "errorCallback": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.errorCallback,
/* harmony export */   "freezeOnApproval": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.freezeOnApproval,
/* harmony export */   "freezeOnCompletion": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.freezeOnCompletion,
/* harmony export */   "handleOrderEvent": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.handleOrderEvent,
/* harmony export */   "itemCount": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.itemCount,
/* harmony export */   "makeOrderFactory": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.makeOrderFactory,
/* harmony export */   "orderPicked": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.orderPicked,
/* harmony export */   "orderShipped": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.orderShipped,
/* harmony export */   "orderTotalValid": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.orderTotalValid,
/* harmony export */   "paymentAuthorized": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.paymentAuthorized,
/* harmony export */   "paymentCompleted": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.paymentCompleted,
/* harmony export */   "readyToDelete": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.readyToDelete,
/* harmony export */   "recalcTotal": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.recalcTotal,
/* harmony export */   "refundPayment": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.refundPayment,
/* harmony export */   "requiredForApproval": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.requiredForApproval,
/* harmony export */   "requiredForCompletion": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.requiredForCompletion,
/* harmony export */   "requiredForGuest": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.requiredForGuest,
/* harmony export */   "returnDelivery": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.returnDelivery,
/* harmony export */   "returnInventory": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.returnInventory,
/* harmony export */   "returnShipment": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.returnShipment,
/* harmony export */   "runOrderWorkflow": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.runOrderWorkflow,
/* harmony export */   "statusChangeValid": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.statusChangeValid,
/* harmony export */   "timeoutCallback": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.timeoutCallback,
/* harmony export */   "updateSignature": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.updateSignature,
/* harmony export */   "makeCustomerFactory": () => /* reexport safe */ _customer__WEBPACK_IMPORTED_MODULE_1__.makeCustomerFactory,
/* harmony export */   "okToDelete": () => /* reexport safe */ _customer__WEBPACK_IMPORTED_MODULE_1__.okToDelete,
/* harmony export */   "assetTypes": () => /* reexport safe */ _inventory__WEBPACK_IMPORTED_MODULE_2__.assetTypes,
/* harmony export */   "categories": () => /* reexport safe */ _inventory__WEBPACK_IMPORTED_MODULE_2__.categories,
/* harmony export */   "makeInventoryFactory": () => /* reexport safe */ _inventory__WEBPACK_IMPORTED_MODULE_2__.makeInventoryFactory,
/* harmony export */   "properties": () => /* reexport safe */ _inventory__WEBPACK_IMPORTED_MODULE_2__.properties,
/* harmony export */   "userFactory": () => /* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_3__.userFactory,
/* harmony export */   "userMixins": () => /* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_3__.userMixins
/* harmony export */ });
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order */ "./src/domain/order.js");
/* harmony import */ var _customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customer */ "./src/domain/customer.js");
/* harmony import */ var _inventory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inventory */ "./src/domain/inventory.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user */ "./src/domain/user.js");





/***/ }),

/***/ "./src/domain/user.js":
/*!****************************!*\
  !*** ./src/domain/user.js ***!
  \****************************/
/*! namespace exports */
/*! export userFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export userMixins [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userFactory": () => /* binding */ userFactory,
/* harmony export */   "userMixins": () => /* binding */ userMixins
/* harmony export */ });
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins */ "./src/domain/mixins.js");


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function userFactory(_ref) {
  var uuid = _ref.uuid;
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _ref3,
        userName,
        password,
        customerId,
        firstName,
        lastName,
        phone,
        email,
        fibonacci,
        _args = arguments;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref3 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, userName = _ref3.userName, password = _ref3.password, customerId = _ref3.customerId, firstName = _ref3.firstName, lastName = _ref3.lastName, phone = _ref3.phone, email = _ref3.email, fibonacci = _ref3.fibonacci;
            return _context.abrupt("return", Object.freeze({
              userId: uuid(),
              password: password,
              userName: userName,
              customerId: customerId,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              email: email,
              fibonacci: fibonacci
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}
var userMixins = [(0,_mixins__WEBPACK_IMPORTED_MODULE_0__.requireProperties)('userName', 'password', 'firstName'), (0,_mixins__WEBPACK_IMPORTED_MODULE_0__.freezeProperties)('userId', 'userName'), (0,_mixins__WEBPACK_IMPORTED_MODULE_0__.hashPasswords)('password'), (0,_mixins__WEBPACK_IMPORTED_MODULE_0__.validateProperties)([{
  propKey: 'email',
  regex: 'email',
  unique: {
    encrypted: true
  }
}, {
  propKey: 'userName',
  unique: {
    encrypted: false
  }
}])];

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


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



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