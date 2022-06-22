exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ "./src/config/accounts.js":
/*!********************************!*\
  !*** ./src/config/accounts.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

/**
 * @type {import('../domain/index').ModelSpecification}
 */
var Accounts = {
  endpoint: 'accounts',
  modelName: 'Accounts',
  factory: function factory(dependencies) {
    return function (acctid) {
      return acctid;
    };
  }
};

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! namespace exports */
/*! export Order [provided] [no usage info] [missing usage info prevents renaming] -> ./src/config/order.js .Order */
/*! export default [not provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] -> ./src/config/accounts.js */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.n, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Order": () => /* reexport safe */ _order__WEBPACK_IMPORTED_MODULE_0__.Order
/* harmony export */ });
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order */ "./src/config/order.js");
/* harmony import */ var _accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accounts */ "./src/config/accounts.js");
/* harmony import */ var _accounts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_accounts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _accounts__WEBPACK_IMPORTED_MODULE_1__) if(["default","Order"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _accounts__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

 // export * from './user'
// export * from './customer'
// export * from './inventory'
// export * from './scheduled-job'

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


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
/* harmony import */ var _test_mock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../test/mock */ "./test/mock/index.js");
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
 * @typedef {{
 *  [x: string]: {
 *    endpointUri: string,
 *    port:ports[p],
 *    method:'get'|'post'|'patch'|'delete'
 *    callback: ({
 *      body:string,
 *      headers:{},
 *      params:{},
 *      query:{}}) => Promise<{
 *        body,status,headers,
 *      }>
 *    })
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
 * @property {endpoints} [endpoints] - additional custom API endpoints - specify inbound port
 * @property {{factory:import("../adapters/datasources/datasource-mongodb"),url:string,credentials?:string}} [datasource] - custom datasource
 * for this model. If not set, the default set by the server is used.
 *
 */

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // Service dependencies


 // Model properties



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
    dependencies: _objectSpread(_objectSpread({}, dependencies), (0,_bind_adapters__WEBPACK_IMPORTED_MODULE_1__.default)(spec.ports, _adapters__WEBPACK_IMPORTED_MODULE_3__, _test_mock__WEBPACK_IMPORTED_MODULE_2__))
  });
}

var models = Object.values(_config__WEBPACK_IMPORTED_MODULE_4__).map(function (spec) {
  return makeModel(spec);
});

/***/ }),

/***/ "./src/event-dispatcher.js":
/*!*********************************!*\
  !*** ./src/event-dispatcher.js ***!
  \*********************************/
/*! namespace exports */
/*! export EventDispatcher [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": () => /* binding */ EventDispatcher
/* harmony export */ });
/* harmony import */ var _services_event_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/event-service */ "./src/services/event-service.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _services_event_service__WEBPACK_IMPORTED_MODULE_0__.Event;

    _classCallCheck(this, EventDispatcher);

    this.adapter = adapter;
    this.subscriptions = new Map();
  }

  _createClass(EventDispatcher, [{
    key: "registerCallback",
    value: function registerCallback(topic, callback) {
      if (this.subscriptions.has(topic)) {
        this.subscriptions.get(topic).push(callback);
        return;
      }

      this.subscriptions.set(topic, [callback]);
    }
  }, {
    key: "emitEvent",
    value: function () {
      var _emitEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(topic, message) {
        var method,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                method = _args.length > 2 && _args[2] !== undefined ? _args[2] : "notify";
                _context.next = 3;
                return this.adapter[method](topic, message);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function emitEvent(_x, _x2) {
        return _emitEvent.apply(this, arguments);
      }

      return emitEvent;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var method,
            emitEvent,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                emitEvent = function _emitEvent2(topic, message) {
                  this.emitEvent(topic, message);
                };

                method = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "listen";
                _context2.next = 4;
                return this.adapter[method](/Channel/, function (_ref) {
                  var _this = this;

                  var topic = _ref.topic,
                      message = _ref.message;

                  if (this.subscriptions.has(topic)) {
                    this.subscriptions.get(topic).forEach(function (callback) {
                      return callback({
                        message: message,
                        emitEvent: emitEvent.bind(_this)
                      });
                    });
                  }
                }.bind(this));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return EventDispatcher;
}();

/***/ }),

/***/ "./src/service-registry.js":
/*!*********************************!*\
  !*** ./src/service-registry.js ***!
  \*********************************/
/*! namespace exports */
/*! export Registry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registry": () => /* binding */ Registry,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-dispatcher */ "./src/event-dispatcher.js");
/* harmony import */ var _domain_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain/utils */ "./src/domain/utils.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var Registry = {
  eventNames: {
    shipOrder: "orderShipped",
    trackShipment: "outForDelivery",
    verifyDelivery: "deliveryVerified"
  },
  sendEvent: function sendEvent(_ref) {
    var emitEvent = _ref.emitEvent,
        topic = _ref.topic,
        eventData = _ref.eventData,
        eventSource = _ref.eventSource,
        eventName = _ref.eventName;
    console.log("Sending event...");
    console.log({
      emitEvent: emitEvent,
      topic: topic,
      eventData: eventData,
      eventSource: eventSource,
      eventName: eventName
    });
    setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return emitEvent(topic, JSON.stringify({
                eventData: eventData,
                eventName: eventName,
                eventTime: new Date().toUTCString(),
                eventType: "commandResponse",
                eventSource: eventSource
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })), 5000);
  },
  generateShippingEventData: function generateShippingEventData(event, externalId) {
    var trackingId = (0,_domain_utils__WEBPACK_IMPORTED_MODULE_1__.uuid)();
    var shipmentId = trackingId;
    var proofOfDelivery = "http://shipping.service.com?proof=".concat(trackingId);
    var eventData = {
      externalId: externalId
    };

    if (event.eventName === "shipOrder") {
      return _objectSpread(_objectSpread({}, eventData), {}, {
        shipmentId: shipmentId
      });
    }

    if (event.eventName === "trackShipment") {
      return _objectSpread(_objectSpread({}, eventData), {}, {
        trackingId: trackingId,
        trackingStatus: "outForDelivery"
      });
    }

    if (event.eventName === "verifyDelivery") {
      return _objectSpread(_objectSpread({}, eventData), {}, {
        proofOfDelivery: proofOfDelivery
      });
    }
  },
  generateShippingMessage: function generateShippingMessage(emitEvent, event, externalId) {
    return {
      emitEvent: emitEvent,
      topic: event.eventData.commandResp,
      eventData: this.generateShippingEventData(event, externalId),
      eventName: this.eventNames[event.eventName],
      eventSource: "shippingService"
    };
  },
  inventoryCallbackFactory: function inventoryCallbackFactory() {
    function inventoryCallback(_ref3) {
      var message = _ref3.message,
          emitEvent = _ref3.emitEvent;
      var event = JSON.parse(message);
      var warehouseAddress =
      /*null;*/
      "1234 warehouse dr, dock 2";
      var externalId = event.eventData.commandArgs.externalId;
      var eventName =
      /*'outOfStock';*/
      "orderPicked";
      this.sendEvent({
        emitEvent: emitEvent,
        topic: event.eventData.replyChannel,
        eventName: eventName,
        eventData: {
          warehouse_addr: warehouseAddress,
          externalId: externalId
        },
        eventSource: "inventoryService"
      });
    }

    return inventoryCallback.bind(this);
  },
  shippingCallbackFactory: function shippingCallbackFactory() {
    function shippingCallback(_ref4) {
      var _this = this;

      var message = _ref4.message,
          emitEvent = _ref4.emitEvent;
      var event = JSON.parse(message);
      var externalId = event.eventData.commandArgs.externalId;

      var _message = this.generateShippingMessage(emitEvent, event, externalId);

      this.sendEvent(_message);

      if (event.eventName === "trackShipment") {
        var eventData = _objectSpread(_objectSpread({}, _message.eventData), {}, {
          trackingStatus: "orderDelivered"
        });

        setTimeout(function () {
          return _this.sendEvent(_objectSpread(_objectSpread({}, _message), {}, {
            eventData: eventData,
            eventName: "orderDelivered"
          }));
        }, 7000);
      }
    }

    return shippingCallback.bind(this);
  }
};
var dispatcher = new _event_dispatcher__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher();
dispatcher.registerCallback("inventoryChannel", Registry.inventoryCallbackFactory());
dispatcher.registerCallback("shippingChannel", Registry.shippingCallbackFactory());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatcher);

/***/ }),

/***/ "./test/mock/address-service.js":
/*!**************************************!*\
  !*** ./test/mock/address-service.js ***!
  \**************************************/
/*! namespace exports */
/*! export Address [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Address": () => /* binding */ Address
/* harmony export */ });


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Address = {
  /**
   *
   * @param {string} address US street address
   */
  validateAddress: function validateAddress(address) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("test validating address...");

              if (address) {
                _context.next = 3;
                break;
              }

              throw new Error("no address provided");

            case 3:
              return _context.abrupt("return", address);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};

/***/ }),

/***/ "./test/mock/event-service.js":
/*!************************************!*\
  !*** ./test/mock/event-service.js ***!
  \************************************/
/*! namespace exports */
/*! export handleEvents [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleEvents": () => /* binding */ handleEvents
/* harmony export */ });
/* harmony import */ var _src_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/event-dispatcher */ "./src/event-dispatcher.js");
/* harmony import */ var _src_service_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/service-registry */ "./src/service-registry.js");


var _topics;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var shippingChannel = "shippingChannel";
var inventoryChannel = "inventoryChannel";
var callbacks = [];
var responses = [];
var topics = (_topics = {}, _defineProperty(_topics, shippingChannel, /shipping/), _defineProperty(_topics, inventoryChannel, /inventory/), _topics);
function handleEvents(req, res) {
  var message = JSON.stringify(req.body);
  var topicName = Object.keys(topics).find(function (k) {
    return topics[k].test(message);
  });

  if (topicName) {
    console.log({
      func: handleEvents.name,
      msg: "found topic",
      topicName: topicName,
      message: message,
      cb: callbacks
    });
    callbacks.forEach(function (callback) {
      console.log({
        name: callback.name,
        code: callback.toString()
      });
      callback({
        topicName: topicName,
        message: message
      });
    });
    console.log(responses);
    responses.reduceRight(function (response) {
      return res.send(response);
    }, "response");
  }
}
var Event = {
  topics: /Channel/,
  listening: false,
  listen: function listen(topic, callback) {
    callbacks.push(callback);
  },
  notify: function notify(topic, message) {
    responses.push(message);
  }
};
var dispatcher = new _src_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher(Event);
dispatcher.registerCallback(inventoryChannel, _src_service_registry__WEBPACK_IMPORTED_MODULE_1__.Registry.inventoryCallbackFactory());
dispatcher.registerCallback(shippingChannel, _src_service_registry__WEBPACK_IMPORTED_MODULE_1__.Registry.shippingCallbackFactory());
dispatcher.init();

/***/ }),

/***/ "./test/mock/index.js":
/*!****************************!*\
  !*** ./test/mock/index.js ***!
  \****************************/
/*! namespace exports */
/*! export Address [provided] [no usage info] [missing usage info prevents renaming] -> ./test/mock/address-service.js .Address */
/*! export Inventory [provided] [no usage info] [missing usage info prevents renaming] -> ./test/mock/inventory-service.js .Inventory */
/*! export Payment [provided] [no usage info] [missing usage info prevents renaming] -> ./test/mock/payment-service.js .Payment */
/*! export Shipping [provided] [no usage info] [missing usage info prevents renaming] -> ./test/mock/shipping-service.js .Shipping */
/*! export handleEvents [provided] [no usage info] [missing usage info prevents renaming] -> ./test/mock/event-service.js .handleEvents */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Address": () => /* reexport safe */ _address_service__WEBPACK_IMPORTED_MODULE_0__.Address,
/* harmony export */   "Payment": () => /* reexport safe */ _payment_service__WEBPACK_IMPORTED_MODULE_1__.Payment,
/* harmony export */   "Shipping": () => /* reexport safe */ _shipping_service__WEBPACK_IMPORTED_MODULE_2__.Shipping,
/* harmony export */   "handleEvents": () => /* reexport safe */ _event_service__WEBPACK_IMPORTED_MODULE_3__.handleEvents,
/* harmony export */   "Inventory": () => /* reexport safe */ _inventory_service__WEBPACK_IMPORTED_MODULE_4__.Inventory
/* harmony export */ });
/* harmony import */ var _address_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./address-service */ "./test/mock/address-service.js");
/* harmony import */ var _payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-service */ "./test/mock/payment-service.js");
/* harmony import */ var _shipping_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipping-service */ "./test/mock/shipping-service.js");
/* harmony import */ var _event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-service */ "./test/mock/event-service.js");
/* harmony import */ var _inventory_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inventory-service */ "./test/mock/inventory-service.js");






/***/ }),

/***/ "./test/mock/inventory-service.js":
/*!****************************************!*\
  !*** ./test/mock/inventory-service.js ***!
  \****************************************/
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
/* harmony import */ var _src_services_event_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/services/event-service */ "./src/services/event-service.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



function sendEvent(_ref) {
  var eventData = _ref.eventData,
      eventName = _ref.eventName;
  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _src_services_event_service__WEBPACK_IMPORTED_MODULE_0__.Event.notify("orderChannel", JSON.stringify({
              eventData: eventData,
              eventName: eventName,
              eventType: "CommandResponse",
              eventTime: new Date().toUTCString(),
              eventSource: "Inventory"
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), 5000);
}

var Inventory = {
  pickOrder: function pickOrder(_ref3) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var externalId, lineItems, pickupAddress;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              externalId = _ref3.externalId, lineItems = _ref3.lineItems;
              console.log("inventory items");
              console.log(lineItems);
              pickupAddress = "1234 warehouse dr, dock2";
              sendEvent({
                eventName: "orderPicked",
                eventData: {
                  pickupAddress: pickupAddress,
                  externalId: externalId
                }
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};

/***/ }),

/***/ "./test/mock/payment-service.js":
/*!**************************************!*\
  !*** ./test/mock/payment-service.js ***!
  \**************************************/
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
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var autocomplete, currency, payload;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              autocomplete = _arguments.length > 4 && _arguments[4] !== undefined ? _arguments[4] : false;
              currency = _arguments.length > 5 && _arguments[5] !== undefined ? _arguments[5] : "USD";
              console.log("mock payment service called");
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

            case 5:
            case "end":
              return _context.stop();
          }
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
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log("REAL completing payment: %s", model.orderNo);
              return _context2.abrupt("return", "1234");

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  refundPayment: function refundPayment(model) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("REAL refunding payment: %s", model.orderNo);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};

/***/ }),

/***/ "./test/mock/shipping-service.js":
/*!***************************************!*\
  !*** ./test/mock/shipping-service.js ***!
  \***************************************/
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
//# sourceMappingURL=829.js.map