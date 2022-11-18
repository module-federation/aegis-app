exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ "./src/adapters/datasources/datasource-mongodb.js":
/*!********************************************************!*\
  !*** ./src/adapters/datasources/datasource-mongodb.js ***!
  \********************************************************/
/*! namespace exports */
/*! export DataSourceAdapterMongoDb [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSourceAdapterMongoDb": () => /* binding */ DataSourceAdapterMongoDb
/* harmony export */ });


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function getSecret() {
  return process.env.MONGODB_CREDS || {
    user: null,
    pass: null,
    token: null
  };
}

function archive(id) {
  console.debug('mock archive', id);
}
/**
 * Datasource adapter factory.
 * @param {string} url database url
 * @param {number} [cacheSize] number of models to keep in cache
 * @param {*} DataSource base class that enables caching
 * @returns {import("./datasource").default}
 */


var DataSourceAdapterMongoDb = function DataSourceAdapterMongoDb(url, cacheSize, DataSourceMongoDb) {
  /**
   * MongoDB adapter extends in-memory datasource to support caching.
   * The cache is always updated first, which allows the system to run
   * even when the database is offline.
   */
  var DataSourceMongoDbArchive = /*#__PURE__*/function (_DataSourceMongoDb) {
    _inherits(DataSourceMongoDbArchive, _DataSourceMongoDb);

    var _super = _createSuper(DataSourceMongoDbArchive);

    function DataSourceMongoDbArchive(datasource, factory, name) {
      var _this;

      _classCallCheck(this, DataSourceMongoDbArchive);

      _this = _super.call(this, datasource, factory, name);
      _this.url = url;
      _this.cacheSize = cacheSize;
      _this.creds = getSecret();
      return _this;
    }
    /**
     * @override
     */


    _createClass(DataSourceMongoDbArchive, [{
      key: "delete",
      value: function _delete(id) {
        console.debug('archive', id);
        archive(id);
      }
    }, {
      key: "chat",
      value: function chat() {
        console.log('chat datasource custom method');
      }
    }]);

    return DataSourceMongoDbArchive;
  }(DataSourceMongoDb);

  return DataSourceMongoDbArchive;
};

/***/ }),

/***/ "./src/config/Galaxy.js":
/*!******************************!*\
  !*** ./src/config/Galaxy.js ***!
  \******************************/
/*! namespace exports */
/*! export Galaxy [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Galaxy": () => /* binding */ Galaxy
/* harmony export */ });

/**
 * @type {import('../domain/index').ModelSpecification}
 */

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Galaxy = {
  endpoint: 'Galaxies',
  modelName: 'Galaxy',
  domain: 'galaxy',
  factory: function factory() {
    return function (args) {
      return _objectSpread({}, args);
    };
  },
  relations: {
    solarSystems: {
      modelName: 'SolarSystem',
      type: 'oneToMany',
      foreignKey: 'galaxyId'
    }
  },
  ports: {
    listSolarSystems: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 0
    },
    sendGalaticSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'sendGalacticSignal',
      producesEvent: 'galacticSignalSent'
    }
  }
};

/***/ }),

/***/ "./src/config/SolarSystem.js":
/*!***********************************!*\
  !*** ./src/config/SolarSystem.js ***!
  \***********************************/
/*! namespace exports */
/*! export SolarSystem [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolarSystem": () => /* binding */ SolarSystem
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @type {import('../domain/index').ModelSpecification}
 */
var SolarSystem = {
  endpoint: 'SolarSystems',
  modelName: 'SolarSystem',
  domain: 'galaxy',
  factory: function factory() {
    return function (args) {
      return _objectSpread({}, args);
    };
  },
  relations: {
    galaxy: {
      modelName: 'Galaxy',
      type: 'manyToOne',
      foreignKey: 'galaxyId'
    }
  },
  ports: {
    systemsInGalaxy: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 0
    },
    receiveGalacticSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'galacticSignalSent',
      producesEvent: 'galacticSignalReceived'
    },
    sendSolarSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'galacticSignalReceived',
      producesEvent: 'sendSolarSignal'
    }
  }
};

/***/ }),

/***/ "./src/config/customer.js":
/*!********************************!*\
  !*** ./src/config/customer.js ***!
  \********************************/
/*! namespace exports */
/*! export Customer [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Customer": () => /* binding */ Customer
/* harmony export */ });
/* harmony import */ var _domain_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/mixins */ "./src/domain/mixins.js");
/* harmony import */ var _domain_customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/customer */ "./src/domain/customer.js");
/* harmony import */ var _adapters_datasources_datasource_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../adapters/datasources/datasource-mongodb */ "./src/adapters/datasources/datasource-mongodb.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ "webpack/sharing/consume/default/nanoid/nanoid");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nanoid__WEBPACK_IMPORTED_MODULE_3__);






/**
 * @type {import('../domain/index').ModelSpecification}
 */

var Customer = {
  modelName: 'customer',
  endpoint: 'customers',
  dependencies: {
    uuid: function uuid() {
      return (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)(8);
    }
  },
  factory: _domain_customer__WEBPACK_IMPORTED_MODULE_1__.makeCustomerFactory,
  validate: _domain_mixins__WEBPACK_IMPORTED_MODULE_0__.validateModel,
  onDelete: _domain_customer__WEBPACK_IMPORTED_MODULE_1__.okToDelete,
  mixins: [(0,_domain_mixins__WEBPACK_IMPORTED_MODULE_0__.freezeProperties)('customerId'), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_0__.requireProperties)('firstName', 'lastName', 'email', 'shippingAddress', 'billingAddress', 'creditCardNumber'), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_0__.validateProperties)([{
    propKey: 'email',
    // unique: { encrypted: true },
    regex: 'email'
  }, {
    propKey: 'creditCardNumber',
    regex: 'creditCard'
  }])],
  relations: {
    orders: {
      modelName: 'order',
      type: 'oneToMany',
      foreignKey: 'customerId'
    }
  },
  commands: {
    decrypt: {
      command: 'decrypt',
      acl: ['read', 'decrypt']
    }
  },
  accessControlList: {
    customer: {
      allow: 'read',
      type: 'relation',
      desc: 'Allow orders to see customers.'
    }
  }
};

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! namespace exports */
/*! export Customer [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/customer.js .Customer */
/*! export Galaxy [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/Galaxy.js .Galaxy */
/*! export Inventory [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/inventory.js .Inventory */
/*! export Order [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/order.js .Order */
/*! export SolarSystem [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/SolarSystem.js .SolarSystem */
/*! export User [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/user.js .User */
/*! export WebSwitch [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/webswitch.js .WebSwitch */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSwitch": () => /* reexport safe */ _webswitch__WEBPACK_IMPORTED_MODULE_0__.WebSwitch,
/* harmony export */   "Order": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_1__.Order,
/* harmony export */   "Customer": () => /* reexport safe */ _customer__WEBPACK_IMPORTED_MODULE_2__.Customer,
/* harmony export */   "User": () => /* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_3__.User,
/* harmony export */   "Inventory": () => /* reexport safe */ _inventory__WEBPACK_IMPORTED_MODULE_4__.Inventory,
/* harmony export */   "Galaxy": () => /* reexport safe */ _Galaxy__WEBPACK_IMPORTED_MODULE_5__.Galaxy,
/* harmony export */   "SolarSystem": () => /* reexport safe */ _SolarSystem__WEBPACK_IMPORTED_MODULE_6__.SolarSystem
/* harmony export */ });
/* harmony import */ var _webswitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webswitch */ "./src/config/webswitch.js");
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order */ "./src/config/order.js");
/* harmony import */ var _customer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customer */ "./src/config/customer.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user */ "./src/config/user.js");
/* harmony import */ var _inventory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inventory */ "./src/config/inventory.js");
/* harmony import */ var _Galaxy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Galaxy */ "./src/config/Galaxy.js");
/* harmony import */ var _SolarSystem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SolarSystem */ "./src/config/SolarSystem.js");








/***/ }),

/***/ "./src/config/inventory.js":
/*!*********************************!*\
  !*** ./src/config/inventory.js ***!
  \*********************************/
/*! namespace exports */
/*! export Inventory [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inventory": () => /* binding */ Inventory
/* harmony export */ });
/* harmony import */ var _adapters_datasources_datasource_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapters/datasources/datasource-mongodb */ "./src/adapters/datasources/datasource-mongodb.js");
/* harmony import */ var _domain_inventory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/inventory */ "./src/domain/inventory.js");
/* harmony import */ var _domain_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/mixins */ "./src/domain/mixins.js");





/**
 * @type {import("../domain/order").ModelSpecification}
 */

var Inventory = {
  modelName: 'inventory',
  endpoint: 'inventory',
  dependencies: {},
  factory: _domain_inventory__WEBPACK_IMPORTED_MODULE_1__.makeInventoryFactory,
  // datasource: {
  //   factory: DataSourceAdapterMongoDb,
  //   url: 'mongodb://127.0.0.1:27017',
  //   cacheSize: 4000,
  //   baseClass: 'DataSourceMongoDb'
  // },
  mixins: [(0,_domain_mixins__WEBPACK_IMPORTED_MODULE_2__.requireProperties)('name', 'inStock', 'category', 'price', 'purchaseOrder'), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_2__.validateProperties)([{
    propKey: 'inStock',
    "typeof": 'number',
    maxnum: 99999
  }, {
    propKey: 'category',
    values: _domain_inventory__WEBPACK_IMPORTED_MODULE_1__.categories
  }, {
    propKey: 'assetType',
    values: _domain_inventory__WEBPACK_IMPORTED_MODULE_1__.assetTypes
  }, {
    propKey: 'properties',
    isValid: function isValid(_obj, prop) {
      return prop.every(function (p) {
        return _domain_inventory__WEBPACK_IMPORTED_MODULE_1__.properties.includes(p);
      });
    }
  }, {
    propKey: 'price',
    "typeof": 'number',
    maxnum: 999.99
  }]), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_2__.freezeProperties)('*')],
  relations: {
    orders: {
      modelName: 'order',
      type: 'oneToMany',
      foreignKey: 'itemId',
      desc: 'many items per order'
    }
  }
};

/***/ }),

/***/ "./src/config/order.js":
/*!*****************************!*\
  !*** ./src/config/order.js ***!
  \*****************************/
/*! namespace exports */
/*! export Order [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Order": () => /* binding */ Order
/* harmony export */ });
/* harmony import */ var _domain_order__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/order */ "./src/domain/order.js");
/* harmony import */ var _domain_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/mixins */ "./src/domain/mixins.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "webpack/sharing/consume/default/nanoid/nanoid");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nanoid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _adapters_datasources_datasource_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters/datasources/datasource-mongodb */ "./src/adapters/datasources/datasource-mongodb.js");


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/**
 * @type {import('../domain/index').ModelSpecification}
 */

var Order = {
  modelName: 'order',
  endpoint: 'orders',
  factory: _domain_order__WEBPACK_IMPORTED_MODULE_0__.makeOrderFactory,
  datasource: {
    factory: _adapters_datasources_datasource_mongodb__WEBPACK_IMPORTED_MODULE_3__.DataSourceAdapterMongoDb,
    url: 'mongodb://127.0.0.1:27017',
    cacheSize: 4000,
    baseClass: 'DataSourceMongoDb'
  },
  dependencies: {
    uuid: function uuid() {
      return (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(8);
    }
  },
  mixins: [(0,_domain_mixins__WEBPACK_IMPORTED_MODULE_1__.requireProperties)('orderItems', (0,_domain_order__WEBPACK_IMPORTED_MODULE_0__.requiredForGuest)(['lastName', 'firstName', 'billingAddress', 'shippingAddress', 'creditCardNumber', 'email']), (0,_domain_order__WEBPACK_IMPORTED_MODULE_0__.requiredForApproval)('paymentStatus'), (0,_domain_order__WEBPACK_IMPORTED_MODULE_0__.requiredForCompletion)('proofOfDelivery')), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_1__.freezeProperties)('orderNo', 'customerId', (0,_domain_order__WEBPACK_IMPORTED_MODULE_0__.freezeOnApproval)(['email', 'lastName', 'firstName', 'orderItems', 'orderTotal', 'billingAddress', 'shippingAddress', 'creditCardNumber', 'paymentStatus']), (0,_domain_order__WEBPACK_IMPORTED_MODULE_0__.freezeOnCompletion)('*')), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_1__.updateProperties)([{
    propKey: 'orderItems',
    update: _domain_order__WEBPACK_IMPORTED_MODULE_0__.recalcTotal
  }, {
    propKey: 'orderItems',
    update: _domain_order__WEBPACK_IMPORTED_MODULE_0__.updateSignature
  }]), (0,_domain_mixins__WEBPACK_IMPORTED_MODULE_1__.validateProperties)([{
    propKey: 'orderStatus',
    values: Object.values(_domain_order__WEBPACK_IMPORTED_MODULE_0__.OrderStatus),
    isValid: _domain_order__WEBPACK_IMPORTED_MODULE_0__.statusChangeValid
  }, {
    propKey: 'orderTotal',
    maxnum: 99999.99,
    isValid: _domain_order__WEBPACK_IMPORTED_MODULE_0__.orderTotalValid
  }, {
    propKey: 'email',
    regex: 'email'
  }, {
    propKey: 'creditCardNumber',
    regex: 'creditCard'
  }, {
    propKey: 'phone',
    regex: 'phone'
  }])],
  validate: _domain_mixins__WEBPACK_IMPORTED_MODULE_1__.validateModel,
  onDelete: _domain_order__WEBPACK_IMPORTED_MODULE_0__.readyToDelete,
  eventHandlers: [_domain_order__WEBPACK_IMPORTED_MODULE_0__.handleOrderEvent],
  ports: {
    listen: {
      service: 'Event',
      type: 'outbound',
      timeout: 0
    },
    notify: {
      service: 'Event',
      type: 'outbound',
      timeout: 0
    },
    validateAddress: {
      service: 'Address',
      type: 'outbound',
      keys: 'shippingAddress',
      producesEvent: 'addressValidated',
      disabled: true
    },
    authorizePayment: {
      service: 'Payment',
      type: 'outbound',
      keys: 'paymentStatus',
      consumesEvent: 'startWorkflow',
      producesEvent: 'paymentAuthorized',
      undo: _domain_order__WEBPACK_IMPORTED_MODULE_0__.cancelPayment,
      disabled: true
    },
    pickOrder: {
      service: 'Inventory',
      type: 'outbound',
      keys: 'pickupAddress',
      callback: _domain_order__WEBPACK_IMPORTED_MODULE_0__.orderPicked,
      consumesEvent: 'itemsAvailable',
      producesEvent: 'orderPicked',
      undo: _domain_order__WEBPACK_IMPORTED_MODULE_0__.returnInventory,
      circuitBreaker: {
        portTimeout_pickOrder_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 60000
        }
      }
    },
    shipOrder: {
      service: 'Shipping',
      type: 'outbound',
      callback: _domain_order__WEBPACK_IMPORTED_MODULE_0__.orderShipped,
      consumesEvent: 'orderPicked',
      producesEvent: 'orderShipped',
      undo: _domain_order__WEBPACK_IMPORTED_MODULE_0__.returnShipment,
      circuitBreaker: {
        portTimeout_shipOrder_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 60000
        },
        portRetryFailed_order: {
          callVolume: 3,
          errorRate: 2,
          intervalMs: 60000,
          fallbackFn: _domain_order__WEBPACK_IMPORTED_MODULE_0__.cancel
        },
        "default": {
          callVolume: 3,
          errorRate: 3,
          intervalMs: 60000
        }
      }
    },
    trackShipment: {
      service: 'Shipping',
      type: 'outbound',
      keys: ['trackingStatus', 'trackingId'],
      consumesEvent: 'orderShipped',
      producesEvent: 'orderDelivered',
      circuitBreaker: {
        portRetryFailed_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 60000
        }
      }
    },
    verifyDelivery: {
      service: 'Shipping',
      type: 'outbound',
      keys: 'proofOfDelivery',
      consumesEvent: 'orderDelivered',
      producesEvent: 'deliveryVerified',
      undo: _domain_order__WEBPACK_IMPORTED_MODULE_0__.returnDelivery
    },
    completePayment: {
      service: 'Payment',
      type: 'outbound',
      callback: _domain_order__WEBPACK_IMPORTED_MODULE_0__.paymentCompleted,
      consumesEvent: 'deliveryVerified',
      producesEvent: 'orderComplete',
      undo: _domain_order__WEBPACK_IMPORTED_MODULE_0__.refundPayment
    },
    cancelShipment: {
      service: 'Shipping',
      type: 'outbound'
    },
    refundPayment: {
      service: 'Payment',
      type: 'outbound'
    },
    cancelOrders: {
      service: 'Order',
      type: 'inbound',
      timeout: 0,
      methods: ['post']
    },
    approveOrders: {
      service: 'Order',
      type: 'inbound',
      timeout: 0,
      methods: ['patch']
    },
    trackAsyncContext: {
      service: 'Telemetry',
      type: 'inbound',
      timeout: 0
    },
    customHttpStatus: {
      service: 'Telemetry',
      type: 'inbound',
      timeout: 0
    },
    testContainsMany: {
      service: 'Inventory',
      type: 'inbound',
      timeout: 0
    }
  },
  relations: {
    customer: {
      modelName: 'customer',
      type: 'manyToOne',
      foreignKey: 'customerId',
      desc: 'Many orders per customer, just one customer per order'
    },
    inventory: {
      modelName: 'inventory',
      type: 'containsMany',
      foreignKey: 'itemId',
      arrayKey: 'orderItems',
      desc: 'An order contains a list of inventory items to ship.'
    },
    chat: {
      modelName: 'user',
      type: 'custom',
      foreignKey: 'userId',
      desc: 'A custom relation used for integrated chat'
    }
  },
  routes: [{
    path: '/orders',
    get: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, ports) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", ports.listModels({
                  writable: res,
                  serialize: true,
                  query: req.query
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function get(_x, _x2, _x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }(),
    post: function () {
      var _post = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, ports) {
        var result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('/orders');
                _context2.prev = 1;
                _context2.next = 4;
                return ports.addModel(req.body);

              case 4:
                result = _context2.sent;
                res.status(200).json({
                  message: 'ok',
                  ctx: result.context,
                  id: result.id
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                throw new _domain_order__WEBPACK_IMPORTED_MODULE_0__.OrderError(_context2.t0, 404);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function post(_x4, _x5, _x6) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    path: '/orders/:id',
    get: function () {
      var _get2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, ports) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", ports.listModels({
                  writable: res,
                  serialize: true,
                  query: req.query
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x7, _x8, _x9) {
        return _get2.apply(this, arguments);
      }

      return get;
    }(),
    patch: function () {
      var _patch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, ports) {
        var result;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('/orders/:id');
                _context4.prev = 1;
                _context4.next = 4;
                return ports.editModel({
                  id: req.params.id,
                  changes: req.body
                });

              case 4:
                result = _context4.sent;
                res.status(200).json({
                  message: 'ok',
                  ctx: result.context
                });
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                throw new _domain_order__WEBPACK_IMPORTED_MODULE_0__.OrderError(_context4.t0, 404);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function patch(_x10, _x11, _x12) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }],
  commands: {
    decrypt: {
      command: 'decrypt',
      acl: ['read', 'decrypt']
    },
    approve: {
      command: _domain_order__WEBPACK_IMPORTED_MODULE_0__.approve,
      acl: ['write', 'approve']
    },
    cancel: {
      command: _domain_order__WEBPACK_IMPORTED_MODULE_0__.cancel,
      acl: ['write', 'cancel']
    },
    runFibonacci: {
      command: function command(model) {
        var start = Date.now();

        function fibonacci(x) {
          if (x === 0) {
            return 0;
          }

          if (x === 1) {
            return 1;
          }

          return fibonacci(x - 1) + fibonacci(x - 2);
        }

        var param = parseFloat(model.fibonacci);
        return {
          result: fibonacci(Number.isNaN(param) ? 10 : param),
          time: Date.now() - start
        };
      },
      acl: ['read', 'write']
    }
  },
  serializers: [{
    on: 'deserialize',
    key: 'creditCardNumber',
    type: 'string',
    value: function value(key, _value) {
      return decrypt(_value);
    },
    enabled: false
  }, {
    on: 'deserialize',
    key: 'shippingAddress',
    type: 'string',
    value: function value(key, _value2) {
      return decrypt(_value2);
    },
    enabled: false
  }, {
    on: 'deserialize',
    key: 'billingAddress',
    type: 'string',
    value: function value(key, _value3) {
      return decrypt(_value3);
    },
    enabled: false
  }]
};

/***/ }),

/***/ "./src/config/user.js":
/*!****************************!*\
  !*** ./src/config/user.js ***!
  \****************************/
/*! namespace exports */
/*! export User [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => /* binding */ User
/* harmony export */ });
/* harmony import */ var _domain_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/mixins */ "./src/domain/mixins.js");
/* harmony import */ var _domain_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/user */ "./src/domain/user.js");
/* harmony import */ var _domain_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/utils */ "./src/domain/utils.js");





/**
 * @type {import('../domain').ModelSpecification}
 */

var User = {
  modelName: 'user',
  endpoint: 'users',
  dependencies: {
    uuid: _domain_utils__WEBPACK_IMPORTED_MODULE_2__.uuid
  },
  factory: _domain_user__WEBPACK_IMPORTED_MODULE_1__.userFactory,
  mixins: _domain_user__WEBPACK_IMPORTED_MODULE_1__.userMixins,
  validate: _domain_mixins__WEBPACK_IMPORTED_MODULE_0__.validateModel,
  ports: {
    authenticate: {
      service: 'auth',
      type: 'inbound'
    },
    createWebToken: {
      service: 'auth',
      type: 'outbound'
    },
    verifyWebToken: {
      service: 'auth',
      type: 'outbound'
    },
    authorize: {
      service: 'authz',
      type: 'inbound'
    },
    applyRateLimits: {
      service: 'authz',
      type: 'inbound'
    }
  },
  routes: [{
    path: '/users/login',
    post: function post(req, res, ports) {
      var _req$body = req.body,
          userName = _req$body.userName,
          password = _req$body.password;
      return ports.invokePort({
        port: 'authenticate',
        args: [userName, password]
      });
    }
  }],
  relations: {
    customer: {
      foreignKey: 'customerId',
      type: 'oneToOne',
      modelName: 'customer'
    }
  }
};

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
    serviceLocatorAnswer: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketConnect: {
      service: 'websocket',
      type: 'outbound',
      timeout: 3000
    },
    websocketPing: {
      service: 'websocket',
      type: 'outbound',
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
/* harmony import */ var _domain_ports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/ports */ "./src/domain/ports.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/config/index.js");

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
 * @property {eventHandler[]} [eventHandlers] - callbacks invoked to handle CRUD events
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
 * @callback addModel
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

var models = Object.values(_config__WEBPACK_IMPORTED_MODULE_5__).map(function (spec) {
  return makeModel(spec);
});

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
var HBEATTIMEOUT = 'heartBeatTimeout';
var WSOCKETERROR = 'webSocketError';
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
var override = /true/i.test(process.env.SWITCH_OVERRIDE);
var apiProto = sslEnabled ? 'https' : 'http';
var apiUrl = "".concat(apiProto, "://").concat(activeHost, ":").concat(activePort);

function serviceUrl() {
  var url = "".concat(proto, "://").concat(host, ":").concat(port);
  if (proto && host && port) return url;
  if (isPrimary) throw new Error("invalid url ".concat(url));
  return null;
}
/**
 * Service mesh client impl. Uses websocket and service-locator
 * adapters through ports injected into the {@link mesh} model.
 * Cf. modelSpec by the same name, i.e. `webswitch`.
 */


var ServiceMeshClient = /*#__PURE__*/function (_EventEmitter) {
  _inherits(ServiceMeshClient, _EventEmitter);

  var _super = _createSuper(ServiceMeshClient);

  function ServiceMeshClient(mesh) {
    var _this;

    _classCallCheck(this, ServiceMeshClient);

    _this = _super.call(this, 'webswitch');
    _this.url;
    _this.mesh = mesh;
    _this.name = SERVICENAME;
    _this.isPrimary = isPrimary;
    _this.isBackup = isBackup;
    _this.pong = true;
    _this.heartbeatTimer = 3000;
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
    value: function telemetry() {
      return {
        eventName: 'telemetry',
        proto: this.name,
        apiUrl: apiUrl,
        heartbeatMs: heartbeatMs,
        hostname: os__WEBPACK_IMPORTED_MODULE_0___default().hostname(),
        role: 'node',
        pid: process.pid,
        telemetry: _objectSpread(_objectSpread(_objectSpread({}, process.memoryUsage()), process.cpuUsage()), performance.nodeTiming),
        services: this.mesh.listServices(),
        socketState: this.mesh.websocketStatus() || 'undefined'
      };
    }
    /**
     * Zero-config, self-forming mesh network:
     * Discover URL of broker to connect to, or
     * if this is the broker, cast the local url
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
                _context.next = 2;
                return this.mesh.serviceLocatorInit({
                  serviceUrl: serviceUrl(),
                  name: this.name,
                  primary: this.isPrimary,
                  backup: this.isBackup
                });

              case 2:
                if (!this.isPrimary) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return this.mesh.serviceLocatorAnswer();

              case 5:
                return _context.abrupt("return", serviceUrl());

              case 6:
                return _context.abrupt("return", override ? serviceUrl() : this.mesh.serviceLocatorAsk());

              case 7:
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
     * Use multicast dns to resolve broker url. Connect to
     * service mesh broker. Allow listeners to subscribe to
     * indivdual or all events. Send binary messages with
     * protocol and idempotentency headers. Periodically send
     * telemetry data.
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
                this.options = options;
                _context2.next = 4;
                return this.resolveUrl();

              case 4:
                this.url = _context2.sent;
                this.mesh.websocketConnect(this.url, {
                  agent: false,
                  headers: this.headers,
                  protocol: SERVICENAME,
                  useBinary: options.binary
                });
                this.mesh.websocketOnOpen(function () {
                  console.log('connection open');

                  _this2.send(_this2.telemetry());

                  _this2.heartbeat();

                  setTimeout(function () {
                    return _this2.sendQueuedMsgs();
                  }, 3000);
                });
                this.mesh.websocketOnMessage(function (message) {
                  if (!message.eventName) {
                    debug && console.debug({
                      missingEventName: message
                    });

                    _this2.emit('missingEventName', message);

                    return;
                  }

                  try {
                    _this2.emit(message.eventName, message);

                    _this2.listeners('*').forEach(function (listener) {
                      return listener(message);
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
                this.mesh.websocketOnClose(function (code, reason) {
                  console.log({
                    msg: 'received close frame',
                    code: code,
                    reason: reason === null || reason === void 0 ? void 0 : reason.toString()
                  });
                  clearTimeout(_this2.heartbeatTimer);
                  setTimeout(function () {
                    console.debug('reconnect due to socket close');

                    _this2.connect();
                  }, 5000);
                });
                this.mesh.websocketOnPong(function () {
                  return _this2.pong = true;
                });
                this.once('timeout', this.timeout);

              case 12:
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
    value: function timeout() {
      var _this3 = this;

      console.warn('timeout');
      this.emit(HBEATTIMEOUT, this.telemetry());
      this.mesh.websocketTerminate();
      setTimeout(function () {
        console.debug('reconnect due to timeout');

        _this3.connect();
      }, 5000);
    }
  }, {
    key: "heartbeat",
    value: function heartbeat() {
      var _this4 = this;

      if (this.pong) {
        this.pong = false;
        this.mesh.websocketPing();
        this.heartbeatTimer = setTimeout(function () {
          return _this4.heartbeat();
        }, heartbeatMs);
      } else {
        clearTimeout(this.heartbeatTimer);
        this.emit('timeout');
      }
    }
    /**
     * Convert message to binary and send with protocol and idempotency headers.
     * If message cannot be sent because of connection state or buffering queue
     * message in domain object for retry later. Using a domain object ensures
     * persistence of the queue across boots.
     *
     * @param {object} msg
     * @returns {Promise<boolean>} true if sent, false if not
     */

  }, {
    key: "send",
    value: function send(msg) {
      var sent = this.mesh.websocketSend(msg, {
        headers: _objectSpread(_objectSpread({}, this.headers), {}, {
          'idempotency-key': (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)()
        })
      });
      if (sent) return true;
      this.mesh.enqueue(msg);
      return false;
    }
    /**
     * Send any messages buffered in `sendQueue`.
     */

  }, {
    key: "sendQueuedMsgs",
    value: function sendQueuedMsgs() {
      var sent = true;

      while (this.mesh.queueDepth() > 0 && sent) {
        sent = this.send(this.mesh.dequeue());
      }
    }
    /**
     * Connects if needed then sends message to mesh broker service.
     * @param {*} msg
     */

  }, {
    key: "publish",
    value: function publish(msg) {
      return this.send(msg);
    }
    /**
     * Register handler to fire on event
     * @param {string} eventName
     * @param {function()} callback
     */

  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      this.on(eventName, callback);
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
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(code, reason) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.debug('closing socket');
                _context3.next = 3;
                return this.mesh.save();

              case 3:
                // save queued messages
                this.removeAllListeners();
                this.mesh.websocketClose(code, reason);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function close(_x, _x2) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return ServiceMeshClient;
}((events__WEBPACK_IMPORTED_MODULE_1___default()));
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
  return function (_ref) {
    var listServices = _ref.listServices;
    return {
      listServices: listServices,
      sendQueue: [],
      sendQueueMax: 1000,
      queueDepth: function queueDepth() {
        return this.sendQueue.length;
      },
      enqueue: function enqueue(msg) {
        this.sendQueue.push(msg);
      },
      dequeue: function dequeue() {
        return this.sendQueue.shift();
      },
      getClient: function getClient() {
        if (client) return client;
        client = new ServiceMeshClient(this);
        return client;
      },
      connect: function connect(options) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _this5.getClient().connect(options);

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      },
      publish: function publish(event) {
        var _this6 = this;

        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _this6.getClient().publish(event);

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }))();
      },
      subscribe: function subscribe(eventName, handler) {
        this.getClient().subscribe(eventName, handler);
      },
      close: function close(code, reason) {
        var _this7 = this;

        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _this7.getClient().close(code, reason);

                case 1:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }))();
      }
    };
  };
}

/***/ })

};
;
//# sourceMappingURL=829.js.map