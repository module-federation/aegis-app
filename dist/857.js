"use strict";
exports.id = 857;
exports.ids = [857];
exports.modules = {

/***/ "./src/services/event-bus.js":
/*!***********************************!*\
  !*** ./src/services/event-bus.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventBus: function() { return /* binding */ EventBus; }
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

/***/ })

};
;
//# sourceMappingURL=857.js.map