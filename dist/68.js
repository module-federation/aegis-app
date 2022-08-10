exports.id = 68;
exports.ids = [68];
exports.modules = {

/***/ "./node_modules/axios-retry/index.js":
/*!*******************************************!*\
  !*** ./node_modules/axios-retry/index.js ***!
  \*******************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/index */ "./node_modules/axios-retry/lib/index.js").default;

/***/ }),

/***/ "./node_modules/axios-retry/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/axios-retry/lib/index.js ***!
  \***********************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export exponentialDelay [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isIdempotentRequestError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNetworkError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNetworkOrIdempotentRequestError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isRetryableError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isSafeRequestError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isNetworkError = isNetworkError;
exports.isRetryableError = isRetryableError;
exports.isSafeRequestError = isSafeRequestError;
exports.isIdempotentRequestError = isIdempotentRequestError;
exports.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
exports.exponentialDelay = exponentialDelay;
exports.default = axiosRetry;

var _isRetryAllowed = __webpack_require__(/*! is-retry-allowed */ "./node_modules/is-retry-allowed/index.js");

var _isRetryAllowed2 = _interopRequireDefault(_isRetryAllowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = 'axios-retry';

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isNetworkError(error) {
  return !error.response && Boolean(error.code) && // Prevents retrying cancelled requests
  error.code !== 'ECONNABORTED' && // Prevents retrying timed out requests
  (0, _isRetryAllowed2.default)(error); // Prevents retrying unsafe errors
}

var SAFE_HTTP_METHODS = ['get', 'head', 'options'];
var IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(['put', 'delete']);

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isRetryableError(error) {
  return error.code !== 'ECONNABORTED' && (!error.response || error.response.status >= 500 && error.response.status <= 599);
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isSafeRequestError(error) {
  if (!error.config) {
    // Cannot determine if the request can be retried
    return false;
  }

  return isRetryableError(error) && SAFE_HTTP_METHODS.indexOf(error.config.method) !== -1;
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isIdempotentRequestError(error) {
  if (!error.config) {
    // Cannot determine if the request can be retried
    return false;
  }

  return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1;
}

/**
 * @param  {Error}  error
 * @return {boolean | Promise}
 */
function isNetworkOrIdempotentRequestError(error) {
  return isNetworkError(error) || isIdempotentRequestError(error);
}

/**
 * @return {number} - delay in milliseconds, always 0
 */
function noDelay() {
  return 0;
}

/**
 * @param  {number} [retryNumber=0]
 * @return {number} - delay in milliseconds
 */
function exponentialDelay() {
  var retryNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var delay = Math.pow(2, retryNumber) * 100;
  var randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay
  return delay + randomSum;
}

/**
 * Initializes and returns the retry state for the given request/config
 * @param  {AxiosRequestConfig} config
 * @return {Object}
 */
function getCurrentState(config) {
  var currentState = config[namespace] || {};
  currentState.retryCount = currentState.retryCount || 0;
  config[namespace] = currentState;
  return currentState;
}

/**
 * Returns the axios-retry options for the current request
 * @param  {AxiosRequestConfig} config
 * @param  {AxiosRetryConfig} defaultOptions
 * @return {AxiosRetryConfig}
 */
function getRequestOptions(config, defaultOptions) {
  return Object.assign({}, defaultOptions, config[namespace]);
}

/**
 * @param  {Axios} axios
 * @param  {AxiosRequestConfig} config
 */
function fixConfig(axios, config) {
  if (axios.defaults.agent === config.agent) {
    delete config.agent;
  }
  if (axios.defaults.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }
  if (axios.defaults.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}

/**
 * Checks retryCondition if request can be retried. Handles it's retruning value or Promise.
 * @param  {number} retries
 * @param  {Function} retryCondition
 * @param  {Object} currentState
 * @param  {Error} error
 * @return {boolean}
 */
async function shouldRetry(retries, retryCondition, currentState, error) {
  var shouldRetryOrPromise = currentState.retryCount < retries && retryCondition(error);

  // This could be a promise
  if ((typeof shouldRetryOrPromise === 'undefined' ? 'undefined' : _typeof(shouldRetryOrPromise)) === 'object') {
    try {
      await shouldRetryOrPromise;
      return true;
    } catch (_err) {
      return false;
    }
  }
  return shouldRetryOrPromise;
}

/**
 * Adds response interceptors to an axios instance to retry requests failed due to network issues
 *
 * @example
 *
 * import axios from 'axios';
 *
 * axiosRetry(axios, { retries: 3 });
 *
 * axios.get('http://example.com/test') // The first request fails and the second returns 'ok'
 *   .then(result => {
 *     result.data; // 'ok'
 *   });
 *
 * // Exponential back-off retry delay between requests
 * axiosRetry(axios, { retryDelay : axiosRetry.exponentialDelay});
 *
 * // Custom retry delay
 * axiosRetry(axios, { retryDelay : (retryCount) => {
 *   return retryCount * 1000;
 * }});
 *
 * // Also works with custom axios instances
 * const client = axios.create({ baseURL: 'http://example.com' });
 * axiosRetry(client, { retries: 3 });
 *
 * client.get('/test') // The first request fails and the second returns 'ok'
 *   .then(result => {
 *     result.data; // 'ok'
 *   });
 *
 * // Allows request-specific configuration
 * client
 *   .get('/test', {
 *     'axios-retry': {
 *       retries: 0
 *     }
 *   })
 *   .catch(error => { // The first request fails
 *     error !== undefined
 *   });
 *
 * @param {Axios} axios An axios instance (the axios object or one created from axios.create)
 * @param {Object} [defaultOptions]
 * @param {number} [defaultOptions.retries=3] Number of retries
 * @param {boolean} [defaultOptions.shouldResetTimeout=false]
 *        Defines if the timeout should be reset between retries
 * @param {Function} [defaultOptions.retryCondition=isNetworkOrIdempotentRequestError]
 *        A function to determine if the error can be retried
 * @param {Function} [defaultOptions.retryDelay=noDelay]
 *        A function to determine the delay between retry requests
 */
function axiosRetry(axios, defaultOptions) {
  axios.interceptors.request.use(function (config) {
    var currentState = getCurrentState(config);
    currentState.lastRequestTime = Date.now();
    return config;
  });

  axios.interceptors.response.use(null, async function (error) {
    var config = error.config;

    // If we have no information to retry the request
    if (!config) {
      return Promise.reject(error);
    }

    var _getRequestOptions = getRequestOptions(config, defaultOptions),
        _getRequestOptions$re = _getRequestOptions.retries,
        retries = _getRequestOptions$re === undefined ? 3 : _getRequestOptions$re,
        _getRequestOptions$re2 = _getRequestOptions.retryCondition,
        retryCondition = _getRequestOptions$re2 === undefined ? isNetworkOrIdempotentRequestError : _getRequestOptions$re2,
        _getRequestOptions$re3 = _getRequestOptions.retryDelay,
        retryDelay = _getRequestOptions$re3 === undefined ? noDelay : _getRequestOptions$re3,
        _getRequestOptions$sh = _getRequestOptions.shouldResetTimeout,
        shouldResetTimeout = _getRequestOptions$sh === undefined ? false : _getRequestOptions$sh;

    var currentState = getCurrentState(config);

    if (await shouldRetry(retries, retryCondition, currentState, error)) {
      currentState.retryCount += 1;
      var delay = retryDelay(currentState.retryCount, error);

      // Axios fails merging this configuration to the default configuration because it has an issue
      // with circular structures: https://github.com/mzabriskie/axios/issues/370
      fixConfig(axios, config);

      if (!shouldResetTimeout && config.timeout && currentState.lastRequestTime) {
        var lastRequestDuration = Date.now() - currentState.lastRequestTime;
        // Minimum 1ms timeout (passing 0 or less to XHR means no timeout)
        config.timeout = Math.max(config.timeout - lastRequestDuration - delay, 1);
      }

      config.transformRequest = [function (data) {
        return data;
      }];

      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(axios(config));
        }, delay);
      });
    }

    return Promise.reject(error);
  });
}

// Compatibility with CommonJS
axiosRetry.isNetworkError = isNetworkError;
axiosRetry.isSafeRequestError = isSafeRequestError;
axiosRetry.isIdempotentRequestError = isIdempotentRequestError;
axiosRetry.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
axiosRetry.exponentialDelay = exponentialDelay;
axiosRetry.isRetryableError = isRetryableError;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/is-retry-allowed/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-retry-allowed/index.js ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 48:0-14 */
/***/ ((module) => {

"use strict";


var WHITELIST = [
	'ETIMEDOUT',
	'ECONNRESET',
	'EADDRINUSE',
	'ESOCKETTIMEDOUT',
	'ECONNREFUSED',
	'EPIPE',
	'EHOSTUNREACH',
	'EAI_AGAIN'
];

var BLACKLIST = [
	'ENOTFOUND',
	'ENETUNREACH',

	// SSL errors from https://github.com/nodejs/node/blob/ed3d8b13ee9a705d89f9e0397d9e96519e7e47ac/src/node_crypto.cc#L1950
	'UNABLE_TO_GET_ISSUER_CERT',
	'UNABLE_TO_GET_CRL',
	'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
	'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
	'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
	'CERT_SIGNATURE_FAILURE',
	'CRL_SIGNATURE_FAILURE',
	'CERT_NOT_YET_VALID',
	'CERT_HAS_EXPIRED',
	'CRL_NOT_YET_VALID',
	'CRL_HAS_EXPIRED',
	'ERROR_IN_CERT_NOT_BEFORE_FIELD',
	'ERROR_IN_CERT_NOT_AFTER_FIELD',
	'ERROR_IN_CRL_LAST_UPDATE_FIELD',
	'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
	'OUT_OF_MEM',
	'DEPTH_ZERO_SELF_SIGNED_CERT',
	'SELF_SIGNED_CERT_IN_CHAIN',
	'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
	'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
	'CERT_CHAIN_TOO_LONG',
	'CERT_REVOKED',
	'INVALID_CA',
	'PATH_LENGTH_EXCEEDED',
	'INVALID_PURPOSE',
	'CERT_UNTRUSTED',
	'CERT_REJECTED'
];

module.exports = function (err) {
	if (!err || !err.code) {
		return true;
	}

	if (WHITELIST.indexOf(err.code) !== -1) {
		return true;
	}

	if (BLACKLIST.indexOf(err.code) !== -1) {
		return false;
	}

	return true;
};


/***/ }),

/***/ "./node_modules/nanoid/index.js":
/*!**************************************!*\
  !*** ./node_modules/nanoid/index.js ***!
  \**************************************/
/*! namespace exports */
/*! export customAlphabet [provided] [no usage info] [missing usage info prevents renaming] */
/*! export customRandom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export nanoid [provided] [no usage info] [missing usage info prevents renaming] */
/*! export random [provided] [no usage info] [missing usage info prevents renaming] */
/*! export urlAlphabet [provided] [no usage info] [missing usage info prevents renaming] -> ./node_modules/nanoid/url-alphabet/index.js .urlAlphabet */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => /* binding */ nanoid,
/* harmony export */   "customAlphabet": () => /* binding */ customAlphabet,
/* harmony export */   "customRandom": () => /* binding */ customRandom,
/* harmony export */   "urlAlphabet": () => /* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_1__.urlAlphabet,
/* harmony export */   "random": () => /* binding */ random
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");


const POOL_SIZE_MULTIPLIER = 128
let pool, poolOffset
let fillPool = bytes => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER)
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(pool)
    poolOffset = 0
  } else if (poolOffset + bytes > pool.length) {
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(pool)
    poolOffset = 0
  }
  poolOffset += bytes
}
let random = bytes => {
  fillPool((bytes -= 0))
  return pool.subarray(poolOffset - bytes, poolOffset)
}
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1
  let step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let i = step
      while (i--) {
        id += alphabet[bytes[i] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  fillPool((size -= 0))
  let id = ''
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_1__.urlAlphabet[pool[i] & 63]
  }
  return id
}



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/*! namespace exports */
/*! export urlAlphabet [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => /* binding */ urlAlphabet
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/index.js":
/*!************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/index.js ***!
  \************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
	core: {
		Batch: __webpack_require__(/*! ./src/Batch */ "./node_modules/smartystreets-javascript-sdk/src/Batch.js"),
		ClientBuilder: __webpack_require__(/*! ./src/ClientBuilder */ "./node_modules/smartystreets-javascript-sdk/src/ClientBuilder.js"),
		buildClient: __webpack_require__(/*! ./src/util/buildClients */ "./node_modules/smartystreets-javascript-sdk/src/util/buildClients.js"),
		SharedCredentials: __webpack_require__(/*! ./src/SharedCredentials */ "./node_modules/smartystreets-javascript-sdk/src/SharedCredentials.js"),
		StaticCredentials: __webpack_require__(/*! ./src/StaticCredentials */ "./node_modules/smartystreets-javascript-sdk/src/StaticCredentials.js"),
		Errors: __webpack_require__(/*! ./src/Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js"),
	},
	usStreet: {
		Lookup: __webpack_require__(/*! ./src/us_street/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_street/Lookup.js"),
		Candidate: __webpack_require__(/*! ./src/us_street/Candidate */ "./node_modules/smartystreets-javascript-sdk/src/us_street/Candidate.js"),
	},
	usZipcode: {
		Lookup: __webpack_require__(/*! ./src/us_zipcode/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Lookup.js"),
		Result: __webpack_require__(/*! ./src/us_zipcode/Result */ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Result.js"),
	},
	usAutocomplete: {
		Lookup: __webpack_require__(/*! ./src/us_autocomplete/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Lookup.js"),
		Suggestion: __webpack_require__(/*! ./src/us_autocomplete/Suggestion */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Suggestion.js"),
	},
	usAutocompletePro: {
		Lookup: __webpack_require__(/*! ./src/us_autocomplete_pro/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Lookup.js"),
		Suggestion: __webpack_require__(/*! ./src/us_autocomplete_pro/Suggestion */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Suggestion.js"),
	},
	usExtract: {
		Lookup: __webpack_require__(/*! ./src/us_extract/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Lookup.js"),
		Result: __webpack_require__(/*! ./src/us_extract/Result */ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Result.js"),
	},
	internationalStreet: {
		Lookup: __webpack_require__(/*! ./src/international_street/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/international_street/Lookup.js"),
		Candidate: __webpack_require__(/*! ./src/international_street/Candidate */ "./node_modules/smartystreets-javascript-sdk/src/international_street/Candidate.js"),
	},
	usReverseGeo: {
		Lookup: __webpack_require__(/*! ./src/us_reverse_geo/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Lookup.js"),
	},
	internationalAddressAutocomplete: {
		Lookup: __webpack_require__(/*! ./src/international_address_autocomplete/Lookup */ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Lookup.js"),
		Suggestion: __webpack_require__(/*! ./src/international_address_autocomplete/Suggestion */ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Suggestion.js"),
	},
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/index.js ***!
  \*******************************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] -> ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/axios.js */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/adapters/http.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/adapters/http.js ***!
  \*******************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 47:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/settle.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/buildFullPath.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var VERSION = __webpack_require__(/*! ./../env/data */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/env/data.js").version;
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js");

var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }
    var resolve = function resolve(value) {
      done();
      resolvePromise(value);
    };
    var rejected = false;
    var reject = function reject(value) {
      done();
      rejected = true;
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;
    var headerNames = {};

    Object.keys(headers).forEach(function storeLowerName(name) {
      headerNames[name.toLowerCase()] = name;
    });

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    if ('user-agent' in headerNames) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers[headerNames['user-agent']]) {
        delete headers[headerNames['user-agent']];
      }
      // Otherwise, use specified value
    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + VERSION;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(createError('Request body larger than maxBodyLength limit', config));
      }

      // Add Content-Length header if data exists
      if (!headerNames['content-length']) {
        headers['Content-Length'] = data.length;
      }
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth && headerNames.authorization) {
      delete headers[headerNames.authorization];
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    try {
      buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, '');
    } catch (err) {
      var customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      reject(customErr);
    }

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            // stream.destoy() emit aborted event before calling reject() on Node.js v16
            rejected = true;
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('aborted', function handlerStreamAborted() {
          if (rejected) {
            return;
          }
          stream.destroy();
          reject(createError('error request aborted', config, 'ERR_REQUEST_ABORTED', lastRequest));
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          try {
            var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);
              if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                responseData = utils.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            reject(enhanceError(err, config, err.code, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // set tcp keep alive to prevent drop connection by peer
    req.on('socket', function handleRequestSocket(socket) {
      // default interval of sending ack packet is 1 minute
      socket.setKeepAlive(true, 1000 * 60);
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(createError(
          'error trying to parse `config.timeout` to int',
          config,
          'ERR_PARSE_TIMEOUT',
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        var timeoutErrorMessage = '';
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        } else {
          timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
        }
        var transitional = config.transitional || transitionalDefaults;
        reject(createError(
          timeoutErrorMessage,
          config,
          transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
          req
        ));
      });
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }


    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/adapters/xhr.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/adapters/xhr.js ***!
  \******************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 14:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/createError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/axios.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/axios.js ***!
  \***********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 54:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__(/*! ./env/data */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/env/data.js").version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js ***!
  \*******************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/CancelToken.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/CancelToken.js ***!
  \************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 119:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/isCancel.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/isCancel.js ***!
  \*********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/Axios.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/Axios.js ***!
  \****************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 148:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/InterceptorManager.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/InterceptorManager.js ***!
  \*****************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 54:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/buildFullPath.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/buildFullPath.js ***!
  \************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 15:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/createError.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/createError.js ***!
  \**********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 15:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/dispatchRequest.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/dispatchRequest.js ***!
  \**************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 28:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/index.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/enhanceError.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/enhanceError.js ***!
  \***********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/mergeConfig.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/mergeConfig.js ***!
  \**********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/settle.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/settle.js ***!
  \*****************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 12:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/transformData.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/transformData.js ***!
  \************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 14:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/index.js ***!
  \********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 131:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/transitional.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/adapters/http.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/transitional.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/defaults/transitional.js ***!
  \***************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/env/data.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/env/data.js ***!
  \**************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/bind.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/bind.js ***!
  \******************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/buildURL.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/buildURL.js ***!
  \**********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 22:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/combineURLs.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/combineURLs.js ***!
  \*************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 10:0-14 */
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/cookies.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/cookies.js ***!
  \*********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \***************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isAxiosError.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isAxiosError.js ***!
  \**************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 11:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \*****************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \*********************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/parseHeaders.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/parseHeaders.js ***!
  \**************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 27:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/spread.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/spread.js ***!
  \********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 23:0-14 */
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/validator.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/validator.js ***!
  \***********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 79:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = __webpack_require__(/*! ../env/data */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/env/data.js").version;

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/utils.js ***!
  \***********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 326:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/package.json":
/*!****************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/package.json ***!
  \****************************************************************/
/*! default exports */
/*! export author [provided] [no usage info] [missing usage info prevents renaming] */
/*! export dependencies [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export axios [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export axios-retry [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export description [provided] [no usage info] [missing usage info prevents renaming] */
/*! export devDependencies [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export chai [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export mocha [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export keywords [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 1 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 10 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 11 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 12 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 13 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 14 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 15 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 16 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 2 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 3 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 4 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 5 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 6 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 7 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 8 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export 9 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export license [provided] [no usage info] [missing usage info prevents renaming] */
/*! export main [provided] [no usage info] [missing usage info prevents renaming] */
/*! export name [provided] [no usage info] [missing usage info prevents renaming] */
/*! export repository [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export url [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export scripts [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export test [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export version [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"smartystreets-javascript-sdk\",\"version\":\"1.13.7\",\"description\":\"Quick and easy Smarty address validation.\",\"keywords\":[\"smarty\",\"smartystreets\",\"address\",\"validation\",\"verification\",\"verify\",\"validate\",\"street-address\",\"geocoding\",\"addresses\",\"zipcode\",\"autocomplete\",\"autosuggest\",\"suggestions\",\"international\",\"http\",\"sdk\"],\"main\":\"index.js\",\"scripts\":{\"test\":\"mocha 'tests/**/*.js'\"},\"author\":\"Smarty SDK Team <support@smarty.com> (https://www.smarty.com)\",\"license\":\"Apache-2.0\",\"repository\":{\"type\":\"git\",\"url\":\"github:smartystreets/smartystreets-javascript-sdk\"},\"devDependencies\":{\"chai\":\"^4.2.0\",\"mocha\":\"^9.2.1\"},\"dependencies\":{\"axios\":\"^0.26.1\",\"axios-retry\":\"3.2.0\"}}");

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/AgentSender.js":
/*!**********************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/AgentSender.js ***!
  \**********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

class AgentSender {
	constructor(innerSender) {
		this.sender = innerSender;
	}

	send(request) {
		request.parameters.agent = "smarty (sdk:javascript@" + __webpack_require__(/*! ../package.json */ "./node_modules/smartystreets-javascript-sdk/package.json").version + ")";
		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = AgentSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/BaseUrlSender.js":
/*!************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/BaseUrlSender.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 18:0-14 */
/***/ ((module) => {

class BaseUrlSender {
	constructor(innerSender, urlOverride) {
		this.urlOverride = urlOverride;
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			request.baseUrl = this.urlOverride;

			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = BaseUrlSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/Batch.js":
/*!****************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/Batch.js ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 49:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const BatchFullError = __webpack_require__(/*! ./Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js").BatchFullError;

/**
 * This class contains a collection of up to 100 lookups to be sent to one of the Smarty APIs<br>
 *     all at once. This is more efficient than sending them one at a time.
 */
class Batch {
	constructor () {
		this.lookups = [];
	}

	add (lookup) {
		if (this.lookupsHasRoomForLookup()) this.lookups.push(lookup);
		else throw new BatchFullError();
	}

	lookupsHasRoomForLookup() {
		const maxNumberOfLookups = 100;
		return this.lookups.length < maxNumberOfLookups;
	}

	length() {
		return this.lookups.length;
	}

	getByIndex(index) {
		return this.lookups[index];
	}

	getByInputId(inputId) {
		return this.lookups.filter(lookup => {
			return lookup.inputId === inputId;
		})[0];
	}

	/**
	 * Clears the lookups stored in the batch so it can be used again.<br>
	 *     This helps avoid the overhead of building a new Batch object for each group of lookups.
	 */
	clear () {
		this.lookups = [];
	}

	isEmpty () {
		return this.length() === 0;
	}
}

module.exports = Batch;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/ClientBuilder.js":
/*!************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/ClientBuilder.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 206:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const HttpSender = __webpack_require__(/*! ./HttpSender */ "./node_modules/smartystreets-javascript-sdk/src/HttpSender.js");
const SigningSender = __webpack_require__(/*! ./SigningSender */ "./node_modules/smartystreets-javascript-sdk/src/SigningSender.js");
const BaseUrlSender = __webpack_require__(/*! ./BaseUrlSender */ "./node_modules/smartystreets-javascript-sdk/src/BaseUrlSender.js");
const AgentSender = __webpack_require__(/*! ./AgentSender */ "./node_modules/smartystreets-javascript-sdk/src/AgentSender.js");
const StaticCredentials = __webpack_require__(/*! ./StaticCredentials */ "./node_modules/smartystreets-javascript-sdk/src/StaticCredentials.js");
const SharedCredentials = __webpack_require__(/*! ./SharedCredentials */ "./node_modules/smartystreets-javascript-sdk/src/SharedCredentials.js");
const CustomHeaderSender = __webpack_require__(/*! ./CustomHeaderSender */ "./node_modules/smartystreets-javascript-sdk/src/CustomHeaderSender.js");
const StatusCodeSender = __webpack_require__(/*! ./StatusCodeSender */ "./node_modules/smartystreets-javascript-sdk/src/StatusCodeSender.js");
const LicenseSender = __webpack_require__(/*! ./LicenseSender */ "./node_modules/smartystreets-javascript-sdk/src/LicenseSender.js");
const BadCredentialsError = __webpack_require__(/*! ./Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js").BadCredentialsError;

//TODO: refactor this to work more cleanly with a bundler.
const UsStreetClient = __webpack_require__(/*! ./us_street/Client */ "./node_modules/smartystreets-javascript-sdk/src/us_street/Client.js");
const UsZipcodeClient = __webpack_require__(/*! ./us_zipcode/Client */ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Client.js");
const UsAutocompleteClient = __webpack_require__(/*! ./us_autocomplete/Client */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Client.js");
const UsAutocompleteProClient = __webpack_require__(/*! ./us_autocomplete_pro/Client */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Client.js");
const UsExtractClient = __webpack_require__(/*! ./us_extract/Client */ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Client.js");
const InternationalStreetClient = __webpack_require__(/*! ./international_street/Client */ "./node_modules/smartystreets-javascript-sdk/src/international_street/Client.js");
const UsReverseGeoClient = __webpack_require__(/*! ./us_reverse_geo/Client */ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Client.js");
const InternationalAddressAutocompleteClient = __webpack_require__(/*! ./international_address_autocomplete/Client */ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Client.js");

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smartystreets.com/verify";
const US_AUTOCOMPLETE_API_URL = "https://us-autocomplete.api.smartystreets.com/suggest";
const US_AUTOCOMPLETE_PRO_API_URL = "https://us-autocomplete-pro.api.smartystreets.com/lookup";
const US_EXTRACT_API_URL = "https://us-extract.api.smartystreets.com/";
const US_STREET_API_URL = "https://us-street.api.smartystreets.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smartystreets.com/lookup";
const US_REVERSE_GEO_API_URL = "https://us-reverse-geo.api.smartystreets.com/lookup";
const INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL = "https://international-autocomplete.api.smartystreets.com/lookup";

/**
 * The ClientBuilder class helps you build a client object for one of the supported Smarty APIs.<br>
 * You can use ClientBuilder's methods to customize settings like maximum retries or timeout duration. These methods<br>
 * are chainable, so you can usually get set up with one line of code.
 */
class ClientBuilder {
	constructor(signer) {
		if (noCredentialsProvided()) throw new BadCredentialsError();

		this.signer = signer;
		this.httpSender = undefined;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.baseUrl = undefined;
		this.proxy = undefined;
		this.customHeaders = {};
		this.debug = undefined;
		this.licenses = [];

		function noCredentialsProvided() {
			return !signer instanceof StaticCredentials || !signer instanceof SharedCredentials;
		}
	}

	/**
	 * @param retries The maximum number of times to retry sending the request to the API. (Default is 5)
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withMaxRetries(retries) {
		this.maxRetries = retries;
		return this;
	}

	/**
	 * @param timeout The maximum time (in milliseconds) to wait for a connection, and also to wait for <br>
	 *                   the response to be read. (Default is 10000)
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withMaxTimeout(timeout) {
		this.maxTimeout = timeout;
		return this;
	}

	/**
	 * @param sender Default is a series of nested senders. See <b>buildSender()</b>.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withSender(sender) {
		this.httpSender = sender;
		return this;
	}

	/**
	 * This may be useful when using a local installation of the Smarty APIs.
	 * @param url Defaults to the URL for the API corresponding to the <b>Client</b> object being built.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withBaseUrl(url) {
		this.baseUrl = url;
		return this;
	}

	/**
	 * Use this to specify a proxy through which to send all lookups.
	 * @param host The host of the proxy server (do not include the port).
	 * @param port The port on the proxy server to which you wish to connect.
	 * @param protocol The protocol on the proxy server to which you wish to connect. If the proxy server uses HTTPS, then you must set the protocol to 'https'.
	 * @param username The username to login to the proxy.
	 * @param password The password to login to the proxy.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withProxy(host, port, protocol, username, password) {
		this.proxy = {
			host: host,
			port: port,
			protocol: protocol,
		};

		if (username && password) {
			this.proxy.auth = {
				username: username,
				password: password,
			};
		}

		return this;
	}

	/**
	 * Use this to add any additional headers you need.
	 * @param customHeaders A String to Object <b>Map</b> of header name/value pairs.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withCustomHeaders(customHeaders) {
		this.customHeaders = customHeaders;

		return this;
	}

	/**
	 * Enables debug mode, which will print information about the HTTP request and response to console.log
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withDebug() {
		this.debug = true;

		return this;
	}

	/**
	 * Allows the caller to specify the subscription license (aka "track") they wish to use.
	 * @param licenses A String Array of licenses.
	 * @returns Returns <b>this</b> to accommodate method chaining.
	 */
	withLicenses(licenses) {
		this.licenses = licenses;

		return this;
	}

	buildSender() {
		if (this.httpSender) return this.httpSender;

		const httpSender = new HttpSender(this.maxTimeout, this.maxRetries, this.proxy, this.debug);
		const statusCodeSender = new StatusCodeSender(httpSender);
		const signingSender = new SigningSender(statusCodeSender, this.signer);
		const agentSender = new AgentSender(signingSender);
		const customHeaderSender = new CustomHeaderSender(agentSender, this.customHeaders);
		const baseUrlSender = new BaseUrlSender(customHeaderSender, this.baseUrl);
		const licenseSender = new LicenseSender(baseUrlSender, this.licenses);

		return licenseSender;
	}

	buildClient(baseUrl, Client) {
		if (!this.baseUrl) {
			this.baseUrl = baseUrl;
		}

		return new Client(this.buildSender());
	}

	buildUsStreetApiClient() {
		return this.buildClient(US_STREET_API_URL, UsStreetClient);
	}

	buildUsZipcodeClient() {
		return this.buildClient(US_ZIP_CODE_API_URL, UsZipcodeClient);
	}

	buildUsAutocompleteClient() { // Deprecated
		return this.buildClient(US_AUTOCOMPLETE_API_URL, UsAutocompleteClient);
	}

	buildUsAutocompleteProClient() {
		return this.buildClient(US_AUTOCOMPLETE_PRO_API_URL, UsAutocompleteProClient);
	}

	buildUsExtractClient() {
		return this.buildClient(US_EXTRACT_API_URL, UsExtractClient);
	}

	buildInternationalStreetClient() {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}

	buildUsReverseGeoClient() {
		return this.buildClient(US_REVERSE_GEO_API_URL, UsReverseGeoClient);
	}

	buildInternationalAddressAutocompleteClient() {
		return this.buildClient(INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL, InternationalAddressAutocompleteClient);
	}
}

module.exports = ClientBuilder;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/CustomHeaderSender.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/CustomHeaderSender.js ***!
  \*****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 20:0-14 */
/***/ ((module) => {

class CustomHeaderSender {
	constructor(innerSender, customHeaders) {
		this.sender = innerSender;
		this.customHeaders = customHeaders;
	}

	send(request) {
		for (let key in this.customHeaders) {
			request.headers[key] = this.customHeaders[key];
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = CustomHeaderSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/Errors.js":
/*!*****************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/Errors.js ***!
  \*****************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 79:0-14 */
/***/ ((module) => {

class SmartyError extends Error {
	constructor(message) {
		super(message);
	}
}

class BatchFullError extends SmartyError {
	constructor() {
		super("A batch can contain a max of 100 lookups.");
	}
}

class BatchEmptyError extends SmartyError {
	constructor() {
		super("A batch must contain at least 1 lookup.");
	}
}

class UndefinedLookupError extends SmartyError {
	constructor() {
		super("The lookup provided is missing or undefined. Make sure you're passing a Lookup object.");
	}
}

class BadCredentialsError extends SmartyError {
	constructor() {
		super("Unauthorized: The credentials were provided incorrectly or did not match any existing active credentials.");
	}
}

class PaymentRequiredError extends SmartyError {
	constructor() {
		super("Payment Required: There is no active subscription for the account associated with the credentials submitted with the request.");
	}
}

class RequestEntityTooLargeError extends SmartyError {
	constructor() {
		super("Request Entity Too Large: The request body has exceeded the maximum size.");
	}
}

class BadRequestError extends SmartyError {
	constructor() {
		super("Bad Request (Malformed Payload): A GET request lacked a street field or the request body of a POST request contained malformed JSON.");
	}
}

class UnprocessableEntityError extends SmartyError {
	constructor(message) {
		super(message);
	}
}

class TooManyRequestsError extends SmartyError {
	constructor() {
		super("When using the public 'embedded key' authentication, we restrict the number of requests coming from a given source over too short of a time.");
	}
}

class InternalServerError extends SmartyError {
	constructor() {
		super("Internal Server Error.");
	}
}

class ServiceUnavailableError extends SmartyError {
	constructor() {
		super("Service Unavailable. Try again later.");
	}
}

class GatewayTimeoutError extends SmartyError {
	constructor() {
		super("The upstream data provider did not respond in a timely fashion and the request failed. A serious, yet rare occurrence indeed.");
	}
}

module.exports = {
	BatchFullError: BatchFullError,
	BatchEmptyError: BatchEmptyError,
	UndefinedLookupError: UndefinedLookupError,
	BadCredentialsError: BadCredentialsError,
	PaymentRequiredError: PaymentRequiredError,
	RequestEntityTooLargeError: RequestEntityTooLargeError,
	BadRequestError: BadRequestError,
	UnprocessableEntityError: UnprocessableEntityError,
	TooManyRequestsError: TooManyRequestsError,
	InternalServerError: InternalServerError,
	ServiceUnavailableError: ServiceUnavailableError,
	GatewayTimeoutError: GatewayTimeoutError
};

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/HttpSender.js":
/*!*********************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/HttpSender.js ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 74:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Response = __webpack_require__(/*! ./Response */ "./node_modules/smartystreets-javascript-sdk/src/Response.js");
const Axios = __webpack_require__(/*! axios */ "./node_modules/smartystreets-javascript-sdk/node_modules/axios/index.js");
const axiosRetry = __webpack_require__(/*! axios-retry */ "./node_modules/axios-retry/index.js");

class HttpSender {
	constructor(timeout = 10000, retries = 5, proxyConfig, debug = false) {
		axiosRetry(Axios, {
			retries: retries,
		});
		this.timeout = timeout;
		this.proxyConfig = proxyConfig;
		if (debug) this.enableDebug();
	}

	buildRequestConfig({payload, parameters, headers, baseUrl}) {
		let config = {
			method: "GET",
			timeout: this.timeout,
			params: parameters,
			headers: headers,
			baseURL: baseUrl,
			validateStatus: function (status) {
				return status < 500;
			},
		};

		if (payload) {
			config.method = "POST";
			config.data = payload;
		}

		if (this.proxyConfig) config.proxy = this.proxyConfig;
		return config;
	}

	buildSmartyResponse(response, error) {
		if (response) return new Response(response.status, response.data);
		return new Response(undefined, undefined, error)
	}

	send(request) {
		return new Promise((resolve, reject) => {
			let requestConfig = this.buildRequestConfig(request);

			Axios(requestConfig)
				.then(response => {
					let smartyResponse = this.buildSmartyResponse(response);

					if (smartyResponse.statusCode >= 400) reject(smartyResponse);

					resolve(smartyResponse);
				})
				.catch(error => reject(this.buildSmartyResponse(undefined, error)));
		});
	}

	enableDebug() {
		Axios.interceptors.request.use(request => {
			console.log('Request:\r\n', request);
			console.log('\r\n*******************************************\r\n');
			return request
		});

		Axios.interceptors.response.use(response => {
			console.log('Response:\r\n');
			console.log('Status:', response.status, response.statusText);
			console.log('Headers:', response.headers);
			console.log('Data:', response.data);
			return response
		})
	}
}

module.exports = HttpSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/InputData.js":
/*!********************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/InputData.js ***!
  \********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module) => {

class InputData {
	constructor(lookup) {
		this.lookup = lookup;
		this.data = {};
	}

	add(apiField, lookupField) {
		if (this.lookupFieldIsPopulated(lookupField)) this.data[apiField] = this.lookup[lookupField];
	}

	lookupFieldIsPopulated(lookupField) {
		return this.lookup[lookupField] !== "" && this.lookup[lookupField] !== undefined;
	}
}

module.exports = InputData;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/LicenseSender.js":
/*!************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/LicenseSender.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 20:0-14 */
/***/ ((module) => {

class LicenseSender {
	constructor(innerSender, licenses) {
		this.sender = innerSender;
		this.licenses = licenses;
	}

	send(request) {
		if (this.licenses.length !== 0) {
			request.parameters["license"] = this.licenses.join(",");
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = LicenseSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/Request.js":
/*!******************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/Request.js ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

class Request {
	constructor(payload) {
		this.baseUrl = "";
		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json; charset=utf-8",
		};

		this.parameters = {};
	}
}

module.exports = Request;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/Response.js":
/*!*******************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/Response.js ***!
  \*******************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

class Response {
	constructor (statusCode, payload, error = undefined) {
		this.statusCode = statusCode;
		this.payload = payload;
		this.error = error;
	}
}

module.exports = Response;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/SharedCredentials.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/SharedCredentials.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

class SharedCredentials {
	constructor(authId, hostName) {
		this.authId = authId;
		this.hostName = hostName;
	}

	sign(request) {
		request.parameters["key"] = this.authId;
		if (this.hostName) request.headers["Referer"] = "https://" + this.hostName;
	}
}

module.exports = SharedCredentials;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/SigningSender.js":
/*!************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/SigningSender.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 26:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const UnprocessableEntityError = __webpack_require__(/*! ./Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js").UnprocessableEntityError;
const SharedCredentials = __webpack_require__(/*! ./SharedCredentials */ "./node_modules/smartystreets-javascript-sdk/src/SharedCredentials.js");

class SigningSender {
	constructor(innerSender, signer) {
		this.signer = signer;
		this.sender = innerSender;
	}

	send(request) {
		const sendingPostWithSharedCredentials = request.payload && this.signer instanceof SharedCredentials;
		if (sendingPostWithSharedCredentials) {
			const message = "Shared credentials cannot be used in batches with a length greater than 1 or when using the US Extract API.";
			throw new UnprocessableEntityError(message);
		}

		return new Promise((resolve, reject) => {
			this.signer.sign(request);
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = SigningSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/StaticCredentials.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/StaticCredentials.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

class StaticCredentials {
	constructor (authId, authToken) {
		this.authId = authId;
		this.authToken = authToken;
	}

	sign (request) {
		request.parameters["auth-id"] = this.authId;
		request.parameters["auth-token"] = this.authToken;
	}
}

module.exports = StaticCredentials;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/StatusCodeSender.js":
/*!***************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/StatusCodeSender.js ***!
  \***************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 57:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Errors = __webpack_require__(/*! ./Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");

class StatusCodeSender {
	constructor(innerSender) {
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(error => {
					switch (error.statusCode) {
						case 400:
							error.error = new Errors.BadRequestError();
							break;

						case 401:
							error.error = new Errors.BadCredentialsError();
							break;

						case 402:
							error.error = new Errors.PaymentRequiredError();
							break;

						case 413:
							error.error = new Errors.RequestEntityTooLargeError();
							break;

						case 422:
							error.error = new Errors.UnprocessableEntityError("GET request lacked required fields.");
							break;

						case 429:
							error.error = new Errors.TooManyRequestsError();
							break;

						case 500:
							error.error = new Errors.InternalServerError();
							break;

						case 503:
							error.error = new Errors.ServiceUnavailableError();
							break;

						case 504:
							error.error = new Errors.GatewayTimeoutError();
							break;
					}

					reject(error);
				});
		});
	}
}

module.exports = StatusCodeSender;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Client.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Client.js ***!
  \****************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 42:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Errors = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");
const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Suggestion = __webpack_require__(/*! ./Suggestion */ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Suggestion.js");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = {
			search: lookup.search,
			country: lookup.country,
			max_results: lookup.max_results,
			include_only_administrative_area: lookup.include_only_administrative_area,
			include_only_locality: lookup.include_only_locality,
			include_only_postal_code: lookup.include_only_postal_code,
		};

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = buildSuggestionsFromResponse(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildSuggestionsFromResponse(payload) {
			if (payload && payload.candidates === null) return [];

			return payload.candidates.map(suggestion => new Suggestion(suggestion));
		}
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Lookup.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Lookup.js ***!
  \****************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 14:0-14 */
/***/ ((module) => {

class Lookup {
	constructor(search = "", country = "United States", max_results = undefined, include_only_administrative_area = "", include_only_locality = "", include_only_postal_code = "") {
		this.result = [];

		this.search = search;
		this.country = country;
		this.max_results = max_results;
		this.include_only_administrative_area = include_only_administrative_area;
		this.include_only_locality = include_only_locality;
		this.include_only_postal_code = include_only_postal_code;
	}
}

module.exports = Lookup;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Suggestion.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/international_address_autocomplete/Suggestion.js ***!
  \********************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 11:0-14 */
/***/ ((module) => {

class Suggestion {
	constructor(responseData) {
		this.street = responseData.street;
		this.locality = responseData.locality;
		this.administrativeArea = responseData.administrative_area;
		this.postalCode = responseData.postal_code;
		this.countryIso3 = responseData.country_iso3;
	}
}

module.exports = Suggestion;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/international_street/Candidate.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/international_street/Candidate.js ***!
  \*****************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 145:0-14 */
/***/ ((module) => {

/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous.
 *
 * @see "https://www.smarty.com/docs/cloud/international-street-api#root"
 */
class Candidate {
	constructor(responseData) {
		this.organization = responseData.organization;
		this.address1 = responseData.address1;
		this.address2 = responseData.address2;
		this.address3 = responseData.address3;
		this.address4 = responseData.address4;
		this.address5 = responseData.address5;
		this.address6 = responseData.address6;
		this.address7 = responseData.address7;
		this.address8 = responseData.address8;
		this.address9 = responseData.address9;
		this.address10 = responseData.address10;
		this.address11 = responseData.address11;
		this.address12 = responseData.address12;

		this.components = {};
		if (responseData.components !== undefined) {
			this.components.countryIso3 = responseData.components.country_iso_3;
			this.components.superAdministrativeArea = responseData.components.super_administrative_area;
			this.components.administrativeArea = responseData.components.administrative_area;
			this.components.subAdministrativeArea = responseData.components.sub_administrative_area;
			this.components.dependentLocality = responseData.components.dependent_locality;
			this.components.dependentLocalityName = responseData.components.dependent_locality_name;
			this.components.doubleDependentLocality = responseData.components.double_dependent_locality;
			this.components.locality = responseData.components.locality;
			this.components.postalCode = responseData.components.postal_code;
			this.components.postalCodeShort = responseData.components.postal_code_short;
			this.components.postalCodeExtra = responseData.components.postal_code_extra;
			this.components.premise = responseData.components.premise;
			this.components.premiseExtra = responseData.components.premise_extra;
			this.components.premisePrefixNumber = responseData.components.premise_prefix_number;
			this.components.premiseNumber = responseData.components.premise_number;
			this.components.premiseType = responseData.components.premise_type;
			this.components.thoroughfare = responseData.components.thoroughfare;
			this.components.thoroughfarePredirection = responseData.components.thoroughfare_predirection;
			this.components.thoroughfarePostdirection = responseData.components.thoroughfare_postdirection;
			this.components.thoroughfareName = responseData.components.thoroughfare_name;
			this.components.thoroughfareTrailingType = responseData.components.thoroughfare_trailing_type;
			this.components.thoroughfareType = responseData.components.thoroughfare_type;
			this.components.dependentThoroughfare = responseData.components.dependent_thoroughfare;
			this.components.dependentThoroughfarePredirection = responseData.components.dependent_thoroughfare_predirection;
			this.components.dependentThoroughfarePostdirection = responseData.components.dependent_thoroughfare_postdirection;
			this.components.dependentThoroughfareName = responseData.components.dependent_thoroughfare_name;
			this.components.dependentThoroughfareTrailingType = responseData.components.dependent_thoroughfare_trailing_type;
			this.components.dependentThoroughfareType = responseData.components.dependent_thoroughfare_type;
			this.components.building = responseData.components.building;
			this.components.buildingLeadingType = responseData.components.building_leading_type;
			this.components.buildingName = responseData.components.building_name;
			this.components.buildingTrailingType = responseData.components.building_trailing_type;
			this.components.subBuildingType = responseData.components.sub_building_type;
			this.components.subBuildingNumber = responseData.components.sub_building_number;
			this.components.subBuildingName = responseData.components.sub_building_name;
			this.components.subBuilding = responseData.components.sub_building;
			this.components.postBox = responseData.components.post_box;
			this.components.postBoxType = responseData.components.post_box_type;
			this.components.postBoxNumber = responseData.components.post_box_number;
		}

		this.analysis = {};
		if (responseData.analysis !== undefined) {
			this.analysis.verificationStatus = responseData.analysis.verification_status;
			this.analysis.addressPrecision = responseData.analysis.address_precision;
			this.analysis.maxAddressPrecision = responseData.analysis.max_address_precision;

			this.analysis.changes = {};
			if (responseData.analysis.changes !== undefined) {
				this.analysis.changes.organization = responseData.analysis.changes.organization;
				this.analysis.changes.address1 = responseData.analysis.changes.address1;
				this.analysis.changes.address2 = responseData.analysis.changes.address2;
				this.analysis.changes.address3 = responseData.analysis.changes.address3;
				this.analysis.changes.address4 = responseData.analysis.changes.address4;
				this.analysis.changes.address5 = responseData.analysis.changes.address5;
				this.analysis.changes.address6 = responseData.analysis.changes.address6;
				this.analysis.changes.address7 = responseData.analysis.changes.address7;
				this.analysis.changes.address8 = responseData.analysis.changes.address8;
				this.analysis.changes.address9 = responseData.analysis.changes.address9;
				this.analysis.changes.address10 = responseData.analysis.changes.address10;
				this.analysis.changes.address11 = responseData.analysis.changes.address11;
				this.analysis.changes.address12 = responseData.analysis.changes.address12;

				this.analysis.changes.components = {};
				if (responseData.analysis.changes.components !== undefined) {
					this.analysis.changes.components.countryIso3 = responseData.analysis.changes.components.country_iso_3;
					this.analysis.changes.components.superAdministrativeArea = responseData.analysis.changes.components.super_administrative_area;
					this.analysis.changes.components.administrativeArea = responseData.analysis.changes.components.administrative_area;
					this.analysis.changes.components.subAdministrativeArea = responseData.analysis.changes.components.sub_administrative_area;
					this.analysis.changes.components.dependentLocality = responseData.analysis.changes.components.dependent_locality;
					this.analysis.changes.components.dependentLocalityName = responseData.analysis.changes.components.dependent_locality_name;
					this.analysis.changes.components.doubleDependentLocality = responseData.analysis.changes.components.double_dependent_locality;
					this.analysis.changes.components.locality = responseData.analysis.changes.components.locality;
					this.analysis.changes.components.postalCode = responseData.analysis.changes.components.postal_code;
					this.analysis.changes.components.postalCodeShort = responseData.analysis.changes.components.postal_code_short;
					this.analysis.changes.components.postalCodeExtra = responseData.analysis.changes.components.postal_code_extra;
					this.analysis.changes.components.premise = responseData.analysis.changes.components.premise;
					this.analysis.changes.components.premiseExtra = responseData.analysis.changes.components.premise_extra;
					this.analysis.changes.components.premisePrefixNumber = responseData.analysis.changes.components.premise_prefix_number;
					this.analysis.changes.components.premiseNumber = responseData.analysis.changes.components.premise_number;
					this.analysis.changes.components.premiseType = responseData.analysis.changes.components.premise_type;
					this.analysis.changes.components.thoroughfare = responseData.analysis.changes.components.thoroughfare;
					this.analysis.changes.components.thoroughfarePredirection = responseData.analysis.changes.components.thoroughfare_predirection;
					this.analysis.changes.components.thoroughfarePostdirection = responseData.analysis.changes.components.thoroughfare_postdirection;
					this.analysis.changes.components.thoroughfareName = responseData.analysis.changes.components.thoroughfare_name;
					this.analysis.changes.components.thoroughfareTrailingType = responseData.analysis.changes.components.thoroughfare_trailing_type;
					this.analysis.changes.components.thoroughfareType = responseData.analysis.changes.components.thoroughfare_type;
					this.analysis.changes.components.dependentThoroughfare = responseData.analysis.changes.components.dependent_thoroughfare;
					this.analysis.changes.components.dependentThoroughfarePredirection = responseData.analysis.changes.components.dependent_thoroughfare_predirection;
					this.analysis.changes.components.dependentThoroughfarePostdirection = responseData.analysis.changes.components.dependent_thoroughfare_postdirection;
					this.analysis.changes.components.dependentThoroughfareName = responseData.analysis.changes.components.dependent_thoroughfare_name;
					this.analysis.changes.components.dependentThoroughfareTrailingType = responseData.analysis.changes.components.dependent_thoroughfare_trailing_type;
					this.analysis.changes.components.dependentThoroughfareType = responseData.analysis.changes.components.dependent_thoroughfare_type;
					this.analysis.changes.components.building = responseData.analysis.changes.components.building;
					this.analysis.changes.components.buildingLeadingType = responseData.analysis.changes.components.building_leading_type;
					this.analysis.changes.components.buildingName = responseData.analysis.changes.components.building_name;
					this.analysis.changes.components.buildingTrailingType = responseData.analysis.changes.components.building_trailing_type;
					this.analysis.changes.components.subBuildingType = responseData.analysis.changes.components.sub_building_type;
					this.analysis.changes.components.subBuildingNumber = responseData.analysis.changes.components.sub_building_number;
					this.analysis.changes.components.subBuildingName = responseData.analysis.changes.components.sub_building_name;
					this.analysis.changes.components.subBuilding = responseData.analysis.changes.components.sub_building;
					this.analysis.changes.components.postBox = responseData.analysis.changes.components.post_box;
					this.analysis.changes.components.postBoxType = responseData.analysis.changes.components.post_box_type;
					this.analysis.changes.components.postBoxNumber = responseData.analysis.changes.components.post_box_number;
				}
				//TODO: Fill in the rest of these fields and their corresponding tests.
			}
		}

		this.metadata = {};
		if (responseData.metadata !== undefined) {
			this.metadata.latitude = responseData.metadata.latitude;
			this.metadata.longitude = responseData.metadata.longitude;
			this.metadata.geocodePrecision = responseData.metadata.geocode_precision;
			this.metadata.maxGeocodePrecision = responseData.metadata.max_geocode_precision;
			this.metadata.addressFormat = responseData.metadata.address_format;
		}
	}
}

module.exports = Candidate;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/international_street/Client.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/international_street/Client.js ***!
  \**************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 42:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Errors = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");
const Candidate = __webpack_require__(/*! ./Candidate */ "./node_modules/smartystreets-javascript-sdk/src/international_street/Candidate.js");
const buildInputData = __webpack_require__(/*! ../util/buildInputData */ "./node_modules/smartystreets-javascript-sdk/src/util/buildInputData.js");
const keyTranslationFormat = __webpack_require__(/*! ../util/apiToSDKKeyMap */ "./node_modules/smartystreets-javascript-sdk/src/util/apiToSDKKeyMap.js").internationalStreet;

/**
 * This client sends lookups to the Smarty International Street API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(attachLookupCandidates(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupCandidates(response, lookup) {
			response.payload.map(rawCandidate => {
				lookup.result.push(new Candidate(rawCandidate));
			});

			return lookup;
		}
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/international_street/Lookup.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/international_street/Lookup.js ***!
  \**************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 85:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const UnprocessableEntityError = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js").UnprocessableEntityError;
const messages = {
	countryRequired: "Country field is required.",
	freeformOrAddress1Required: "Either freeform or address1 is required.",
	insufficientInformation: "Insufficient information: One or more required fields were not set on the lookup.",
	badGeocode: "Invalid input: geocode can only be set to 'true' (default is 'false'.",
	invalidLanguage: "Invalid input: language can only be set to 'latin' or 'native'. When not set, the the output language will match the language of the input values."
};


/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     <p><b>Note: </b><i>Lookups must have certain required fields set with non-blank values. <br>
 *         These can be found at the URL below.</i></p>
 *     @see "https://www.smarty.com/docs/cloud/international-street-api#http-input-fields"
 */
class Lookup {
	constructor(country, freeform) {
		this.result = [];

		this.country = country;
		this.freeform = freeform;
		this.address1 = undefined;
		this.address2 = undefined;
		this.address3 = undefined;
		this.address4 = undefined;
		this.organization = undefined;
		this.locality = undefined;
		this.administrativeArea = undefined;
		this.postalCode = undefined;
		this.geocode = undefined;
		this.language = undefined;
		this.inputId = undefined;

		this.ensureEnoughInfo = this.ensureEnoughInfo.bind(this);
		this.ensureValidData = this.ensureValidData.bind(this);
	}

	ensureEnoughInfo() {
		if (fieldIsMissing(this.country)) throw new UnprocessableEntityError(messages.countryRequired);

		if (fieldIsSet(this.freeform)) return true;

		if (fieldIsMissing(this.address1)) throw new UnprocessableEntityError(messages.freeformOrAddress1Required);

		if (fieldIsSet(this.postalCode)) return true;

		if (fieldIsMissing(this.locality) || fieldIsMissing(this.administrativeArea)) throw new UnprocessableEntityError(messages.insufficientInformation);

		return true;
	}

	ensureValidData() {
		let languageIsSetIncorrectly = () => {
			let isLanguage = language => this.language.toLowerCase() === language;

			return fieldIsSet(this.language) && !(isLanguage("latin") || isLanguage("native"));
		};

		let geocodeIsSetIncorrectly = () => {
			return fieldIsSet(this.geocode) && this.geocode.toLowerCase() !== "true";
		};

		if (geocodeIsSetIncorrectly()) throw new UnprocessableEntityError(messages.badGeocode);

		if (languageIsSetIncorrectly()) throw new UnprocessableEntityError(messages.invalidLanguage);

		return true;
	}
}

function fieldIsMissing (field) {
	if (!field) return true;

	const whitespaceCharacters = /\s/g;

	return field.replace(whitespaceCharacters, "").length < 1;
}

function fieldIsSet (field) {
	return !fieldIsMissing(field);
}

module.exports = Lookup;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Client.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Client.js ***!
  \*********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 56:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Errors = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");
const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Suggestion = __webpack_require__(/*! ./Suggestion */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Suggestion.js");

/**
 * This client sends lookups to the Smarty US Autocomplete API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = buildRequestParameters(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = buildSuggestionsFromResponse(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildRequestParameters(lookup) {
			return {
				prefix: lookup.prefix,
				suggestions: lookup.maxSuggestions,
				city_filter: joinFieldWith(lookup.cityFilter, ","),
				state_filter: joinFieldWith(lookup.stateFilter, ","),
				prefer: joinFieldWith(lookup.prefer, ";"),
				prefer_ratio: lookup.preferRatio,
				geolocate: lookup.geolocate,
				geolocate_precision: lookup.geolocatePrecision,
			};

			function joinFieldWith(field, delimiter) {
				if (field.length) return field.join(delimiter);
			}
		}

		function buildSuggestionsFromResponse(payload) {
			if (payload.suggestions === null) return [];

			return payload.suggestions.map(suggestion => new Suggestion(suggestion));
		}
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Lookup.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Lookup.js ***!
  \*********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 24:0-14 */
/***/ ((module) => {

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-autocomplete-api#http-request-input-fields"
 */
class Lookup {
	/**
	 * @param prefix The beginning of an address. This is required to be set.
	 */
	constructor(prefix) {
		this.result = [];

		this.prefix = prefix;
		this.maxSuggestions = undefined;
		this.cityFilter = [];
		this.stateFilter = [];
		this.prefer = [];
		this.preferRatio = undefined;
		this.geolocate = undefined;
		this.geolocatePrecision = undefined;
	}
}

module.exports = Lookup;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Suggestion.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_autocomplete/Suggestion.js ***!
  \*************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

/**
 * @see "https://www.smarty.com/docs/cloud/us-autocomplete-api#http-response"
 */
class Suggestion {
	constructor(responseData) {
		this.text = responseData.text;
		this.streetLine = responseData.street_line;
		this.city = responseData.city;
		this.state = responseData.state;
	}
}

module.exports = Suggestion;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Client.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Client.js ***!
  \*************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 61:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Errors = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");
const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Suggestion = __webpack_require__(/*! ./Suggestion */ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Suggestion.js");

/**
 * This client sends lookups to the Smarty US Autocomplete Pro API, <br>
 *     and attaches the suggestions to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = buildRequestParameters(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = buildSuggestionsFromResponse(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildRequestParameters(lookup) {
			return {
				search: lookup.search,
				selected: lookup.selected,
				max_results: lookup.maxResults,
				include_only_cities: joinFieldWith(lookup.includeOnlyCities, ";"),
				include_only_states: joinFieldWith(lookup.includeOnlyStates, ";"),
				include_only_zip_codes: joinFieldWith(lookup.includeOnlyZIPCodes, ";"),
				exclude_states: joinFieldWith(lookup.excludeStates, ";"),
				prefer_cities: joinFieldWith(lookup.preferCities, ";"),
				prefer_states: joinFieldWith(lookup.preferStates, ";"),
				prefer_zip_codes: joinFieldWith(lookup.preferZIPCodes, ";"),
				prefer_ratio: lookup.preferRatio,
				prefer_geolocation: lookup.preferGeolocation,
				source: lookup.source,
			};

			function joinFieldWith(field, delimiter) {
				if (field.length) return field.join(delimiter);
			}
		}

		function buildSuggestionsFromResponse(payload) {
			if (payload.suggestions === null) return [];

			return payload.suggestions.map(suggestion => new Suggestion(suggestion));
		}
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Lookup.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Lookup.js ***!
  \*************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 29:0-14 */
/***/ ((module) => {

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-request-input-fields"
 */
class Lookup {
	/**
	 * @param search The beginning of an address. This is required to be set.
	 */
	constructor(search) {
		this.result = [];

		this.search = search;
		this.selected = undefined;
		this.maxResults = undefined;
		this.includeOnlyCities = [];
		this.includeOnlyStates = [];
		this.includeOnlyZIPCodes = [];
		this.excludeStates = [];
		this.preferCities = [];
		this.preferStates = [];
		this.preferZIPCodes = [];
		this.preferRatio = undefined;
		this.preferGeolocation = undefined;
		this.source = undefined
	}
}

module.exports = Lookup;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Suggestion.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_autocomplete_pro/Suggestion.js ***!
  \*****************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 15:0-14 */
/***/ ((module) => {

/**
 * @see "https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-response"
 */
class Suggestion {
	constructor(responseData) {
		this.streetLine = responseData.street_line;
		this.secondary = responseData.secondary;
		this.city = responseData.city;
		this.state = responseData.state;
		this.zipcode = responseData.zipcode;
		this.entries = responseData.entries;
	}
}

module.exports = Suggestion;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Address.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_extract/Address.js ***!
  \*****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 17:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Candidate = __webpack_require__(/*! ../us_street/Candidate */ "./node_modules/smartystreets-javascript-sdk/src/us_street/Candidate.js");

/**
 * @see <a href="https://www.smarty.com/docs/cloud/us-extract-api#http-response-status">Smarty US Extract API docs</a>
 */
class Address {
	constructor (responseData) {
		this.text = responseData.text;
		this.verified = responseData.verified;
		this.line = responseData.line;
		this.start = responseData.start;
		this.end = responseData.end;
		this.candidates = responseData.api_output.map(rawAddress => new Candidate(rawAddress));
	}
}

module.exports = Address;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Client.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_extract/Client.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 42:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Errors = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");
const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Result = __webpack_require__(/*! ./Result */ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Result.js");

/**
 * This client sends lookups to the Smarty US Extract API, <br>
 *     and attaches the results to the Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request(lookup.text);
		request.parameters = buildRequestParams(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = new Result(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildRequestParams(lookup) {
			return {
				html: lookup.html,
				aggressive: lookup.aggressive,
				addr_line_breaks: lookup.addressesHaveLineBreaks,
				addr_per_line: lookup.addressesPerLine,
			};
		}
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Lookup.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_extract/Lookup.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 24:0-14 */
/***/ ((module) => {

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-extract-api#http-request-input-fields"
 */
class Lookup {
	/**
	 * @param text The text that is to have addresses extracted out of it for verification (required)
	 */
	constructor(text) {
		this.result = {
			meta: {},
			addresses: [],
		};
		//TODO: require the text field.
		this.text = text;
		this.html = undefined;
		this.aggressive = undefined;
		this.addressesHaveLineBreaks = undefined;
		this.addressesPerLine = undefined;
	}
}

module.exports = Lookup;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Result.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_extract/Result.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 21:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Address = __webpack_require__(/*! ./Address */ "./node_modules/smartystreets-javascript-sdk/src/us_extract/Address.js");

/**
 * @see <a href="https://www.smarty.com/docs/cloud/us-extract-api#http-response-status">Smarty US Extract API docs</a>
 */
class Result {
	constructor({meta, addresses}) {
		this.meta = {
			lines: meta.lines,
			unicode: meta.unicode,
			addressCount: meta.address_count,
			verifiedCount: meta.verified_count,
			bytes: meta.bytes,
			characterCount: meta.character_count,
		};

		this.addresses = addresses.map(rawAddress => new Address(rawAddress));
	}
}

module.exports = Result;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Client.js":
/*!********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Client.js ***!
  \********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 40:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Response = __webpack_require__(/*! ./Response */ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Response.js");
const buildInputData = __webpack_require__(/*! ../util/buildInputData */ "./node_modules/smartystreets-javascript-sdk/src/util/buildInputData.js");
const keyTranslationFormat = __webpack_require__(/*! ../util/apiToSDKKeyMap */ "./node_modules/smartystreets-javascript-sdk/src/util/apiToSDKKeyMap.js").usReverseGeo;
const {UndefinedLookupError} = __webpack_require__(/*! ../Errors.js */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");

/**
 * This client sends lookups to the Smarty US Reverse Geo API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		let request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(attachLookupResults(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupResults(response, lookup) {
			lookup.response = new Response(response.payload);

			return lookup;
		}
	}
}

module.exports = Client;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Lookup.js":
/*!********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Lookup.js ***!
  \********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Response = __webpack_require__(/*! ./Response */ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Response.js");

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-street-api#input-fields"
 */
class Lookup {
	constructor(latitude, longitude) {
		this.latitude = latitude.toFixed(8);
		this.longitude = longitude.toFixed(8);
		this.response = new Response();
	}
}

module.exports = Lookup;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Response.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Response.js ***!
  \**********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 17:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Result = __webpack_require__(/*! ./Result */ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Result.js");

/**
 * The SmartyResponse contains the response from a call to the US Reverse Geo API.
 */
class Response {
	constructor(responseData) {
		this.results = [];

		if (responseData)
			responseData.results.map(rawResult => {
				this.results.push(new Result(rawResult));
			});
	}
}

module.exports = Response;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Result.js":
/*!********************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_reverse_geo/Result.js ***!
  \********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 35:0-14 */
/***/ ((module) => {

/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous.
 *
 * @see "https://www.smarty.com/docs/cloud/us-reverse-geo-api#result"
 */
class Result {
	constructor(responseData) {
		this.distance = responseData.distance;

		this.address = {};
		if (responseData.address) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.state_abbreviation = responseData.address.state_abbreviation;
			this.address.zipcode = responseData.address.zipcode;
		}

		this.coordinate = {};
		if (responseData.coordinate) {
			this.coordinate.latitude = responseData.coordinate.latitude;
			this.coordinate.longitude = responseData.coordinate.longitude;
			this.coordinate.accuracy = responseData.coordinate.accuracy;
			switch (responseData.coordinate.license) {
				case 1:
					this.coordinate.license = "SmartyStreets Proprietary";
					break;
				default:
					this.coordinate.license = "SmartyStreets";
			}
		}
	}
}

module.exports = Result;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_street/Candidate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_street/Candidate.js ***!
  \******************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 88:0-14 */
/***/ ((module) => {

/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous, and<br>
 *     the maxCandidates field is set higher than 1.
 *
 * @see "https://www.smarty.com/docs/cloud/us-street-api#root"
 */
class Candidate {
	constructor(responseData) {
		this.inputIndex = responseData.input_index;
		this.candidateIndex = responseData.candidate_index;
		this.addressee = responseData.addressee;
		this.deliveryLine1 = responseData.delivery_line_1;
		this.deliveryLine2 = responseData.delivery_line_2;
		this.lastLine = responseData.last_line;
		this.deliveryPointBarcode = responseData.delivery_point_barcode;

		this.components = {};
		if (responseData.components !== undefined) {
			this.components.urbanization = responseData.components.urbanization;
			this.components.primaryNumber = responseData.components.primary_number;
			this.components.streetName = responseData.components.street_name;
			this.components.streetPredirection = responseData.components.street_predirection;
			this.components.streetPostdirection = responseData.components.street_postdirection;
			this.components.streetSuffix = responseData.components.street_suffix;
			this.components.secondaryNumber = responseData.components.secondary_number;
			this.components.secondaryDesignator = responseData.components.secondary_designator;
			this.components.extraSecondaryNumber = responseData.components.extra_secondary_number;
			this.components.extraSecondaryDesignator = responseData.components.extra_secondary_designator;
			this.components.pmbDesignator = responseData.components.pmb_designator;
			this.components.pmbNumber = responseData.components.pmb_number;
			this.components.cityName = responseData.components.city_name;
			this.components.defaultCityName = responseData.components.default_city_name;
			this.components.state = responseData.components.state_abbreviation;
			this.components.zipCode = responseData.components.zipcode;
			this.components.plus4Code = responseData.components.plus4_code;
			this.components.deliveryPoint = responseData.components.delivery_point;
			this.components.deliveryPointCheckDigit = responseData.components.delivery_point_check_digit;
		}

		this.metadata = {};
		if (responseData.metadata !== undefined) {
			this.metadata.recordType = responseData.metadata.record_type;
			this.metadata.zipType = responseData.metadata.zip_type;
			this.metadata.countyFips = responseData.metadata.county_fips;
			this.metadata.countyName = responseData.metadata.county_name;
			this.metadata.carrierRoute = responseData.metadata.carrier_route;
			this.metadata.congressionalDistrict = responseData.metadata.congressional_district;
			this.metadata.buildingDefaultIndicator = responseData.metadata.building_default_indicator;
			this.metadata.rdi = responseData.metadata.rdi;
			this.metadata.elotSequence = responseData.metadata.elot_sequence;
			this.metadata.elotSort = responseData.metadata.elot_sort;
			this.metadata.latitude = responseData.metadata.latitude;
			this.metadata.longitude = responseData.metadata.longitude;
			switch (responseData.metadata.coordinate_license)
			{
				case 1:
					this.metadata.coordinateLicense = "SmartyStreets Proprietary";
					break;
				default:
					this.metadata.coordinateLicense = "SmartyStreets";
			}
			this.metadata.precision = responseData.metadata.precision;
			this.metadata.timeZone = responseData.metadata.time_zone;
			this.metadata.utcOffset = responseData.metadata.utc_offset;
			this.metadata.obeysDst = responseData.metadata.dst;
			this.metadata.isEwsMatch = responseData.metadata.ews_match;
		}

		this.analysis = {};
		if (responseData.analysis !== undefined) {
			this.analysis.dpvMatchCode = responseData.analysis.dpv_match_code;
			this.analysis.dpvFootnotes = responseData.analysis.dpv_footnotes;
			this.analysis.cmra = responseData.analysis.dpv_cmra;
			this.analysis.vacant = responseData.analysis.dpv_vacant;
			this.analysis.noStat = responseData.analysis.dpv_no_stat;
			this.analysis.active = responseData.analysis.active;
			this.analysis.isEwsMatch = responseData.analysis.ews_match; // Deprecated, refer to metadata.ews_match
			this.analysis.footnotes = responseData.analysis.footnotes;
			this.analysis.lacsLinkCode = responseData.analysis.lacslink_code;
			this.analysis.lacsLinkIndicator = responseData.analysis.lacslink_indicator;
			this.analysis.isSuiteLinkMatch = responseData.analysis.suitelink_match;
			this.analysis.enhancedMatch = responseData.analysis.enhanced_match;
		}
	}
}

module.exports = Candidate;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_street/Client.js":
/*!***************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_street/Client.js ***!
  \***************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 43:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Candidate = __webpack_require__(/*! ./Candidate */ "./node_modules/smartystreets-javascript-sdk/src/us_street/Candidate.js");
const Lookup = __webpack_require__(/*! ./Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_street/Lookup.js");
const Batch = __webpack_require__(/*! ../Batch */ "./node_modules/smartystreets-javascript-sdk/src/Batch.js");
const UndefinedLookupError = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js").UndefinedLookupError;
const sendBatch = __webpack_require__(/*! ../util/sendBatch */ "./node_modules/smartystreets-javascript-sdk/src/util/sendBatch.js");
const keyTranslationFormat = __webpack_require__(/*! ../util/apiToSDKKeyMap */ "./node_modules/smartystreets-javascript-sdk/src/util/apiToSDKKeyMap.js").usStreet;

/**
 * This client sends lookups to the Smarty US Street API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	/**
	 * Sends up to 100 lookups for validation.
	 * @param data may be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
	 * @throws SmartyException
	 */
	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError;

		let batch;

		if (dataIsLookup) {
			if (data.maxCandidates == null && data.match == "enhanced")
				data.maxCandidates = 5;
			batch = new Batch();
			batch.add(data);
		} else {
			batch = data;
		}

		return sendBatch(batch, this.sender, Candidate, keyTranslationFormat);
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_street/Lookup.js":
/*!***************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_street/Lookup.js ***!
  \***************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 24:0-14 */
/***/ ((module) => {

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-street-api#input-fields"
 */
class Lookup {
	constructor(street, street2, secondary, city, state, zipCode, lastLine, addressee, urbanization, match, maxCandidates, inputId) {
		this.street = street;
		this.street2 = street2;
		this.secondary = secondary;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.lastLine = lastLine;
		this.addressee = addressee;
		this.urbanization = urbanization;
		this.match = match;
		this.maxCandidates = maxCandidates;
		this.inputId = inputId;
		this.result = [];
	}
}

module.exports = Lookup;


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Client.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Client.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 39:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Lookup = __webpack_require__(/*! ./Lookup */ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Lookup.js");
const Result = __webpack_require__(/*! ./Result */ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Result.js");
const Batch = __webpack_require__(/*! ../Batch */ "./node_modules/smartystreets-javascript-sdk/src/Batch.js");
const UndefinedLookupError = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js").UndefinedLookupError;
const sendBatch = __webpack_require__(/*! ../util/sendBatch */ "./node_modules/smartystreets-javascript-sdk/src/util/sendBatch.js");
const keyTranslationFormat = __webpack_require__(/*! ../util/apiToSDKKeyMap */ "./node_modules/smartystreets-javascript-sdk/src/util/apiToSDKKeyMap.js").usZipcode;

/**
 * This client sends lookups to the Smarty US ZIP Code API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	/**
	 * Sends up to 100 lookups for validation.
	 * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
	 * @throws SmartyException
	 */
	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError;

		let batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else batch = data;

		return sendBatch(batch, this.sender, Result, keyTranslationFormat);
	}
}

module.exports = Client;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Lookup.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Lookup.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module) => {

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-zipcode-api#http-request-input-fields"
 */
class Lookup {
	constructor(city, state, zipCode, inputId) {
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.inputId = inputId;
		this.result = [];
	}
}

module.exports = Lookup;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Result.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/us_zipcode/Result.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 45:0-14 */
/***/ ((module) => {

/**
 * @see "https://www.smarty.com/docs/cloud/us-zipcode-api#root"
 */
class Result {
	constructor(responseData) {
		this.inputIndex = responseData.input_index;
		this.status = responseData.status;
		this.reason = responseData.reason;
		this.valid = this.status === undefined && this.reason === undefined;

		this.cities = !responseData.city_states ? [] : responseData.city_states.map(city => {
			return {
				city: city.city,
				stateAbbreviation: city.state_abbreviation,
				state: city.state,
				mailableCity: city.mailable_city,
			};
		});

		this.zipcodes = !responseData.zipcodes ? [] : responseData.zipcodes.map(zipcode => {
			return {
				zipcode: zipcode.zipcode,
				zipcodeType: zipcode.zipcode_type,
				defaultCity: zipcode.default_city,
				countyFips: zipcode.county_fips,
				countyName: zipcode.county_name,
				latitude: zipcode.latitude,
				longitude: zipcode.longitude,
				precision: zipcode.precision,
				stateAbbreviation: zipcode.state_abbreviation,
				state: zipcode.state,
				alternateCounties: !zipcode.alternate_counties ? [] : zipcode.alternate_counties.map(county => {
					return {
						countyFips: county.county_fips,
						countyName: county.county_name,
						stateAbbreviation: county.state_abbreviation,
						state: county.state,
					}
				}),
			};
		});
	}
}

module.exports = Result;

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/util/apiToSDKKeyMap.js":
/*!******************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/util/apiToSDKKeyMap.js ***!
  \******************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = {
	usStreet: {
		"street": "street",
		"street2": "street2",
		"secondary": "secondary",
		"city": "city",
		"state": "state",
		"zipcode": "zipCode",
		"lastline": "lastLine",
		"addressee": "addressee",
		"urbanization": "urbanization",
		"match": "match",
		"candidates": "maxCandidates",
	},
	usZipcode: {
		"city": "city",
		"state": "state",
		"zipcode": "zipCode",
	},
	internationalStreet: {
		"country": "country",
		"freeform": "freeform",
		"address1": "address1",
		"address2": "address2",
		"address3": "address3",
		"address4": "address4",
		"organization": "organization",
		"locality": "locality",
		"administrative_area": "administrativeArea",
		"postal_code": "postalCode",
		"geocode": "geocode",
		"language": "language",
	},
	usReverseGeo: {
		"latitude": "latitude",
		"longitude": "longitude",
	}
};

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/util/buildClients.js":
/*!****************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/util/buildClients.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 39:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ClientBuilder = __webpack_require__(/*! ../ClientBuilder */ "./node_modules/smartystreets-javascript-sdk/src/ClientBuilder.js");

function instantiateClientBuilder(credentials) {
	return new ClientBuilder(credentials);
}

function buildUsStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsStreetApiClient();
}

function buildUsAutocompleteApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsAutocompleteClient();
}

function buildUsAutocompleteProApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsAutocompleteProClient();
}

function buildUsExtractApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsExtractClient();
}

function buildUsZipcodeApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsZipcodeClient();
}

function buildInternationalStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalStreetClient();
}

function buildUsReverseGeoApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsReverseGeoClient();
}

function buildInternationalAddressAutocompleteApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalAddressAutocompleteClient();
}

module.exports = {
	usStreet: buildUsStreetApiClient,
	usAutocomplete: buildUsAutocompleteApiClient,
	usAutocompletePro: buildUsAutocompleteProApiClient,
	usExtract: buildUsExtractApiClient,
	usZipcode: buildUsZipcodeApiClient,
	internationalStreet: buildInternationalStreetApiClient,
	usReverseGeo: buildUsReverseGeoApiClient,
	internationalAddressAutocomplete: buildInternationalAddressAutocompleteApiClient,
};

/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/util/buildInputData.js":
/*!******************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/util/buildInputData.js ***!
  \******************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const InputData = __webpack_require__(/*! ../InputData */ "./node_modules/smartystreets-javascript-sdk/src/InputData.js");

module.exports = (lookup, keyTranslationFormat) => {
	let inputData = new InputData(lookup);

	for (let key in keyTranslationFormat) {
		inputData.add(key, keyTranslationFormat[key]);
	}

	return inputData.data;
};


/***/ }),

/***/ "./node_modules/smartystreets-javascript-sdk/src/util/sendBatch.js":
/*!*************************************************************************!*\
  !*** ./node_modules/smartystreets-javascript-sdk/src/util/sendBatch.js ***!
  \*************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Request = __webpack_require__(/*! ../Request */ "./node_modules/smartystreets-javascript-sdk/src/Request.js");
const Errors = __webpack_require__(/*! ../Errors */ "./node_modules/smartystreets-javascript-sdk/src/Errors.js");
const buildInputData = __webpack_require__(/*! ../util/buildInputData */ "./node_modules/smartystreets-javascript-sdk/src/util/buildInputData.js");

module.exports = (batch, sender, Result, keyTranslationFormat) => {
	if (batch.isEmpty()) throw new Errors.BatchEmptyError;

	let request = new Request();

	if (batch.length() === 1) request.parameters = generateRequestPayload(batch)[0];
	else request.payload = generateRequestPayload(batch);

	return new Promise((resolve, reject) => {
		sender.send(request)
			.then(response => {
				if (response.error) reject(response.error);

				resolve(assignResultsToLookups(batch, response));
			})
			.catch(reject);
	});

	function generateRequestPayload(batch) {
		return batch.lookups.map((lookup) => {
			return buildInputData(lookup, keyTranslationFormat);
		});
	}

	function assignResultsToLookups(batch, response) {
		response.payload.map(rawResult => {
			let result = new Result(rawResult);
			let lookup = batch.getByIndex(result.inputIndex);

			lookup.result.push(result);
		});

		return batch;
	}
};


/***/ })

};
;
//# sourceMappingURL=68.js.map