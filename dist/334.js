exports.id = 334;
exports.ids = [334];
exports.modules = {

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

/***/ })

};
;
//# sourceMappingURL=334.js.map