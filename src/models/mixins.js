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
 * @type {functionalMixinFactory}
 * @param  {...string} propNames 
 */
export const encryptProperties = (...propNames) => (o) => {
  const encryptProps = (props) => {
    return props.map(p => o[p] ? { [p]: encrypt(o[p]) } : {})
      .reduce((p, c) => ({ ...c, ...p }));
  }
  return {
    ...o,
    ...encryptProps(propNames)
  }
}

/**
 * @type {functionalMixinFactory}
 * @param  {...string} propNames 
 */
export const requireProperties = (...propNames) => (o) => {
  const requireProps = () => {
    const missing = propNames.filter(key => !o[key]);
    if (missing && missing.length > 0) {
      throw new Error(`missing required properties: ${missing}`);
    }
  }
  requireProps(propNames);
  return {
    ...o,
    requireProps
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
 * @type {Array<mixinFunction>}
 */
const Mixins = [
  encryptPersonalInfo,
  remoteMixin
];

export default Mixins;


