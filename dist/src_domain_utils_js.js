exports.id = "src_domain_utils_js";
exports.ids = ["src_domain_utils_js"];
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
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.js");


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



/***/ })

};
;
//# sourceMappingURL=src_domain_utils_js.js.map