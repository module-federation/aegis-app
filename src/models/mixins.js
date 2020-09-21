import crypto from 'crypto';

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

function encrypt(data) {
  var key = crypto.createCipher('aes-128-cbc', 'secret');
  var str = key.update(data, 'utf8', 'hex')
  return str += key.final('hex');
}

/**
 * Functional mixin that encrypts the properties specified in `propNames`  
 * @param  {...string} propNames - The properties to encrypt
 */
export const encryptProperties = (...propNames) => (o) => {
  const encryptProps = () => {
    return propNames.map(p => o[p]
      ? { [p]: encrypt(o[p]) }
      : {})
      .reduce((p, c) => ({ ...c, ...p }));
  }

  return {
    ...o,
    ...encryptProps(),
    encryptProperties: encryptProps
  }
}

/** 
 * Functional mixin that enforces required fields 
 * @param  {...string} propNames - required property names
 */
export const requireProperties = (...propNames) => (o) => {
  const requireProperties = () => {
    const missing = propNames.filter(key => !o[key]);

    if (missing?.length > 0) {
      throw new Error(`missing required properties: ${missing}`);
    }
  }
  requireProperties();

  return {
    ...o,
    requireProperties
  }
}

/**
 * Functional mixin that prevents properties from being updated
 * @param  {...string} propNames - names of properties to freeze
 */
export const freezeProperties = (...propNames) => (o) => {
  const preventUpdates = (updates) => {
    const intersection = Object.keys(updates)
      .filter(key => propNames.includes(key));

    if (intersection?.length > 0) {
      throw new Error(`cannot update readonly properties: ${intersection}`);
    }
  }

  return {
    ...o,
    freezeProperties: preventUpdates
  }
}

/**
 * @type {mixinFunction}
 * @param {*} o 
 */
export const remoteMixin = o => ({
  remoteMixin: true,
  ...o
})

// Implement GDPR across models
const encryptPersonalInfo = encryptProperties(
  'lastName',
  'address',
  'email',
  'phone'
);

/**
 * Global mixins
 */
const GlobalMixins = [
  encryptPersonalInfo,
  remoteMixin
];

export default GlobalMixins;


