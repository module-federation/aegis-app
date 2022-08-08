exports.id = 334;
exports.ids = [334];
exports.modules = {

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

/***/ }),

/***/ "./src/services/event-service.js":
/*!***************************************!*\
  !*** ./src/services/event-service.js ***!
  \***************************************/
/*! namespace exports */
/*! export Event [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Event": () => /* binding */ Event
/* harmony export */ });
/* harmony import */ var kafkajs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kafkajs */ "webpack/sharing/consume/default/kafkajs/kafkajs");
/* harmony import */ var kafkajs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kafkajs__WEBPACK_IMPORTED_MODULE_0__);


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var brokers = process.env.KAFKA_BROKERS || "localhost:9092";
var topics = new RegExp(process.env.KAFKA_TOPICS) || /Channel/;
var groupId = (process.env.KAFKA_GROUP_ID || "MicroLib") + process.pid;
var kafka = new kafkajs__WEBPACK_IMPORTED_MODULE_0__.Kafka({
  clientId: "MicroLib",
  brokers: brokers.split(",")
});
var consumer = kafka.consumer({
  groupId: groupId
});
var producer = kafka.producer();
/**
 * @typedef {EventService}
 */

var Event = {
  listening: false,
  topics: topics,

  /**
   * Implements event consumer service.
   * @param {string|RegExp} topic
   * @param {function({message, topic})} callback
   */
  listen: function listen(topic, callback) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return consumer.connect();

            case 3:
              _context2.next = 5;
              return consumer.subscribe({
                topic: topic,
                fromBeginning: true
              });

            case 5:
              _this.listening = true;
              _context2.next = 8;
              return consumer.run({
                eachMessage: function () {
                  var _eachMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
                    var topic, message;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            topic = _ref.topic, message = _ref.message;

                            try {
                              callback({
                                topic: topic,
                                message: message.value.toString()
                              });
                            } catch (error) {
                              console.error(error);
                            }

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  function eachMessage(_x) {
                    return _eachMessage.apply(this, arguments);
                  }

                  return eachMessage;
                }()
              });

            case 8:
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }))();
  },

  /**
   * Implemements event producer service.
   * @param {string|RegExp} topic
   * @param {string} message
   */
  notify: function notify(topic, message) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return producer.connect();

            case 3:
              _context3.next = 5;
              return producer.send({
                topic: topic,
                messages: [{
                  value: message
                }]
              });

            case 5:
              _context3.next = 7;
              return producer.disconnect();

            case 7:
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.error({
                func: _this2.notify.name,
                error: _context3.t0
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }))();
  }
};

/***/ })

};
;
//# sourceMappingURL=334.js.map