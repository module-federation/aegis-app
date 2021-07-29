exports.id = 579;
exports.ids = [579];
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
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "./node_modules/ws/index.js");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dns_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dns/promises */ "dns/promises");
/* harmony import */ var dns_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dns_promises__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WEBSWITCH (c)
 * websocket clients connect to a common server,
 * which broadcasts any messages it receives.
 */


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var FQDN = process.env.WEBSWITCH_HOST || "webswitch.aegis.dev";
var PORT = 8062;
var PATH = "/webswitch/broadcast";
/**
 * Lookup IP address of WebSwitch server.
 */

function getServerAddress() {
  return _getServerAddress.apply(this, arguments);
}
/**@type import("ws/lib/websocket") */


function _getServerAddress() {
  _getServerAddress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return dns_promises__WEBPACK_IMPORTED_MODULE_1___default().lookup(FQDN);

          case 3:
            result = _context.sent;
            console.debug("server address", result);
            return _context.abrupt("return", (result === null || result === void 0 ? void 0 : result.address) ? result.address : "localhost");

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error("dns lookup", _context.t0);

          case 11:
            return _context.abrupt("return", "localhost");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getServerAddress.apply(this, arguments);
}

var ws;
var serverAddress = getServerAddress().then(function (result) {
  return result.address;
});
function publishEvent(_x, _x2) {
  return _publishEvent.apply(this, arguments);
}

function _publishEvent() {
  _publishEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event, observer) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (event) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            serverAddress.then(function (address) {
              var serializedEvent = JSON.stringify(event);

              function webswitch() {
                console.debug("webswitch sending", event);

                if (!ws) {
                  ws = new (ws__WEBPACK_IMPORTED_MODULE_0___default())("ws://".concat(address, ":").concat(PORT).concat(PATH));
                  ws.on("message", function (message) {
                    try {
                      var _event = JSON.parse(message);

                      if (_event.eventName && observer) {
                        observer.notify(_event.eventName, _event);
                      } else {
                        console.warn("no eventName or observer", message);
                      }
                    } catch (error) {
                      console.error(ws.on.name, message, error);
                    }
                  });
                  ws.on("open", function () {
                    ws.send(JSON.stringify("webswitch"));
                  });
                  ws.on("error", function (error) {
                    console.error(ws.on.name, error);
                  });
                }

                function send() {
                  if (ws.readyState) {
                    ws.send(serializedEvent);
                  } else {
                    setTimeout(function () {
                      return send();
                    }, 1000);
                  }
                }

                send();
              }

              try {
                webswitch();
              } catch (e) {
                console.warn(publishEvent.name, e.message);
              }
            })["catch"](function (e) {
              return console.error(e);
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _publishEvent.apply(this, arguments);
}

/***/ })

};
;
//# sourceMappingURL=579.js.map