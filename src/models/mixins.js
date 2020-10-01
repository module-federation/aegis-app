import { hash, encrypt } from './utils';

/**
 * @callback mixinFunction
 * @param {Object} o Object to compose
 * @returns {Object} Composed object
 */

/**
 * @callback functionalMixinFactory
 * @param {*} mixinFunctionParams params for mixin function 
 * @returns {mixinFunction}
 */

/**
 * Store mixins for execution on update
 * @param {'pre' | 'post'} type run before changes or after
 * @param {*} o  Object containing changes to apply (pre) 
 * or new object after changes have been applied (post)
 * @param {*} name `Function.name` 
 * @param {mixinFunction} cb mixin function
 */
function updateMixins(type, o, name, cb) {
  const mixinType = {
    pre: 'preUpdateMixins',
    post: 'postUpdateMixins'
  }

  if (!mixinType[type]) {
    throw new Error('invalid mixin set');
  }

  const mixinSet = o[mixinType[type]] || new Map();
  mixinSet.toJSON = () => void 0; // don't show this

  if (!mixinSet.has(name)) {
    mixinSet.set(name, cb());

    return {
      ...o,
      [mixinType[type]]: mixinSet
    }
  }
  return o;
}

/**
 * Functional mixin that encrypts the properties specified in `propNames`  
 * @param  {...string} propNames - The properties to encrypt
 */
const encryptProperties = (...propNames) => (o) => {
  const encryptProps = () => {
    return propNames.map(p => o[p]
      ? { [p]: encrypt(o[p]) }
      : {})
      .reduce((p, c) => ({ ...c, ...p }));
  }

  const mixins = updateMixins(
    'pre', o, encryptProperties.name,
    () => encryptProperties(...propNames)
  );

  return {
    ...mixins,
    ...encryptProps()
  }
}

/**
 * Functional mixin that prevents properties from being updated
 * @param {boolean} isUpdate - set to true on update
 * @param  {...string} propNames - names of properties to freeze
 */
const freezeProperties = (isUpdate, ...propNames) => (o) => {
  const preventUpdates = () => {
    const intersection = Object.keys(o)
      .filter(key => propNames.includes(key));

    if (intersection?.length > 0) {
      throw new Error(`cannot update readonly properties: ${intersection}`);
    }
  }

  if (isUpdate) {
    preventUpdates();
  }

  return updateMixins(
    'pre', o, freezeProperties.name,
    () => freezeProperties(true, ...propNames)
  );
}

/** 
 * Functional mixin that enforces required fields 
 * @param  {...string} propNames - required property names
 */
const requireProperties = (...propNames) => (o) => {
  const missing = propNames.filter(key => !o[key]);
  if (missing?.length > 0) {
    throw new Error(`missing required properties: ${missing}`);
  }
  return o;
}

/**
 * Functional mixin that hashes passwords
 * @param {*} hash hash algorithm
 * @param  {...any} propNames name of password props
 */
const hashPasswords = (hash, ...propNames) => (o) => {
  function hashPwds() {
    return propNames.map(p => o[p]
      ? { [p]: hash(o[p]) }
      : {})
      .reduce((p, c) => ({ ...c, ...p }));
  }

  const mixins = updateMixins(
    'pre', o, hashPasswords.name,
    () => hashPasswords(hash, ...propNames)
  );

  return {
    ...mixins,
    ...hashPwds()
  }
}

const internalPropList = ['preUpdateMixins', 'postUpdateMixins'];

const allowProperties = (isUpdate, ...propNames) => (o) => {
  function rejectUnknownProps() {
    const allowList = propNames.concat(internalPropList);
    const unknownProps = Object.keys(o).filter(k => !allowList.includes(k))

    if (unknownProps?.length > 0) {
      throw new Error(`invalid properties: ${unknownProps}`);
    }
  }

  if (isUpdate) {
    rejectUnknownProps();
  }

  return updateMixins('pre', o, allowProperties.name, () => {
    return allowProperties(true, ...propNames);
  })
}

/**
 * require properties listed in `propNames`
 * @param  {...any} propNames 
 */
export function requirePropertiesMixin(...propNames) {
  return requireProperties(...propNames);
}

/**
 * disallow updates to properties listed in `propNames`
 * @param  {...any} propNames 
 */
export function freezePropertiesMixin(...propNames) {
  return freezeProperties(false, ...propNames);
}

/**
 * encyrpt properties listed in `propNames`
 * @param  {...any} propNames 
 */
export function encryptPropertiesMixin(...propNames) {
  return encryptProperties(...propNames);
}

/**
 * hash passwords listed in `propNames`
 * @param  {...any} propNames 
 */
export function hashPasswordsMixin(...propNames) {
  return hashPasswords(hash, ...propNames);
}

/**
 * only allow properties listed in `propNames`
 * @param  {...any} propNames 
 */
export function allowPropertiesMixin(...propNames) {
  return allowProperties(false, ...propNames);
}

// Implement GDPR across models
const encryptPersonalInfo = encryptProperties(
  'lastName',
  'address',
  'email',
  'phone',
  'mobile',
  'creditCard',
  'ccv',
  'ssn'
);

/**
 * Global mixins
 */
const GlobalMixins = [
  encryptPersonalInfo
];

export default GlobalMixins;


