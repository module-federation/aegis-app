exports.id = "src_services_webswitch_js";
exports.ids = ["src_services_webswitch_js"];
exports.modules = {

/***/ "./src/services/webswitch.js":
/*!***********************************!*\
  !*** ./src/services/webswitch.js ***!
  \***********************************/
/*! namespace exports */
/*! export publishEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "publishEvent": () => /* binding */ publishEvent
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! websocket */ "./node_modules/websocket/index.js");
/* harmony import */ var websocket__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(websocket__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dns_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dns/promises */ "dns/promises");
/* harmony import */ var dns_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dns_promises__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WEBSWITCH (c)
 * websocket clients connect to a common server,
 * which broadcasts any messages it receives.
 */


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var FQDN = process.env.WEBSWITCH_HOST || "webswitch.aegis.com";
var PORT = 8060;
var PATH = "/api/publish";

function getHostName() {
  return _getHostName.apply(this, arguments);
}
/**
 * Connect to Webswitch server.
 * @returns {Promise<websocket.connection>}
 */


function _getHostName() {
  _getHostName = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return dns_promises__WEBPACK_IMPORTED_MODULE_2___default().lookup(FQDN);

          case 3:
            if (!_context.sent) {
              _context.next = 7;
              break;
            }

            _context.t0 = FQDN;
            _context.next = 8;
            break;

          case 7:
            _context.t0 = "localhost";

          case 8:
            return _context.abrupt("return", _context.t0);

          case 11:
            _context.prev = 11;
            _context.t1 = _context["catch"](0);
            console.warn("dns lookup", _context.t1);

          case 14:
            return _context.abrupt("return", "localhost");

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _getHostName.apply(this, arguments);
}

function webswitchConnect(_x, _x2, _x3) {
  return _webswitchConnect.apply(this, arguments);
}

function _webswitchConnect() {
  _webswitchConnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(client, url, observer) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              console.debug("connecting to...", url);
              client.on("connect", function (connection) {
                console.debug("connected to", url, connection.remoteAddress);
                connection.on("message", function (message) {
                  console.debug("received message from", url);

                  if (message.type === "utf8") {
                    var event = JSON.parse(message);
                    observer.notify(event.eventName, {
                      message: message,
                      address: connection.remoteAddress
                    });
                  }
                });
                resolve(connection);
              });
              client.on("connectFailed", function (error) {
                reject(error);
              });
              client.connect(url);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _webswitchConnect.apply(this, arguments);
}

function publishEvent(_x4, _x5) {
  return _publishEvent.apply(this, arguments);
}

function _publishEvent() {
  _publishEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event, observer) {
    var useWebswitch,
        host,
        serializedEvent,
        webswitchConnection,
        options,
        req,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            useWebswitch = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;

            if (event) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            _context3.next = 5;
            return getHostName();

          case 5:
            host = _context3.sent;
            serializedEvent = JSON.stringify(event);

            if (!useWebswitch) {
              _context3.next = 15;
              break;
            }

            if (!(!websocketConnnection || !webswitchConnection.connected)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 11;
            return webswitchConnect(new (websocket__WEBPACK_IMPORTED_MODULE_1___default().client)(), "ws://".concat(host, ":").concat(PORT).concat(PATH), observer);

          case 11:
            webswitchConnection = _context3.sent;

          case 12:
            webswitchConnection.sendUTF(serializedEvent);
            _context3.next = 20;
            break;

          case 15:
            options = {
              hostname: host,
              port: 8060,
              path: PATH,
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(serializedEvent)
              }
            };
            req = http__WEBPACK_IMPORTED_MODULE_0___default().request(options, function (res) {
              res.setEncoding("utf8");
              res.on("data", function (chunk) {
                console.log(chunk);
              });
              res.on("end", function () {});
            });
            req.on("error", function (e) {// console.error(`problem with request: ${e.message}`);
            }); // Write data to request body

            req.write(serializedEvent);
            req.end();

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _publishEvent.apply(this, arguments);
}

/***/ })

};
;
//# sourceMappingURL=src_services_webswitch_js.js.map