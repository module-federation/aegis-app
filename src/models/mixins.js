'use strict'

import {
  hash,
  encrypt,
  compose
} from './utils';

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
 * Key to access previous version of the model
 */
export const PREVMODEL = Symbol('prevModel');

/**
 *
 */
export const mixinType = {
  pre: Symbol('pre'),
  post: Symbol('post')
}

/**
 * Stored mixins - use private symbol as key to prevent overwrite
 */
export const mixinSets = {
  [mixinType.pre]: Symbol('preUpdateMixins'),
  [mixinType.post]: Symbol('postUpdateMixins')
}

/**
 * Set of pre mixins
 */
const PREMIXINS = mixinSets[mixinType.pre];
/**
 * Set of post mixins
 */
const POSTMIXINS = mixinSets[mixinType.post];

/**
 * Apply any pre and post mixins and return the result.
 * 
 * @param {*} model - current model
 * @param {*} changes - object containing changes
 */
export function processUpdate(model, changes) {
  changes[PREVMODEL] = model; // keep history

  const updates = model[PREMIXINS]
    ? compose(...model[PREMIXINS].values())(changes)
    : changes;

  const updated = { ...model, ...updates };

  return model[POSTMIXINS]
    ? compose(...model[POSTMIXINS].values())(updated)
    : updated;
}

/**
 * Store mixins for execution on update
 * @param {mixinType} type 
 * run before changes are applied or afterward
 * @param {*} o  Object containing changes to apply (pre) 
 * or new object after changes have been applied (post)
 * @param {string} name `Function.name` 
 * @param {mixinFunction} cb mixin function
 */
function updateMixins(type, o, name, cb) {
  if (!mixinSets[type]) {
    throw new Error('invalid mixin type');
  }

  const mixinSet = o[mixinSets[type]] || new Map();
  // mixinSet.toJSON = () => void 0; // don't show this

  if (!mixinSet.has(name)) {
    mixinSet.set(name, cb());

    return {
      ...o,
      [mixinSets[type]]: mixinSet
    }
  }
  return o;
}

/**
 * Execute any functions in `propKeys` and return keys
 * @param {*} o - Object to compose
 * @param  {Array<string | function(*):string>} propKeys - 
 * Names (or functions that return names) of properties
 * @returns {string[]}
 */
function getConditionalProps(o, ...propKeys) {
  return propKeys.map(key => {
    return typeof key === 'function' ? key(o) : key;
  });
}

/**
 * Functional mixin that encrypts the properties specified in `propNames`  
 * @param  {Array<string | function(*):string>} propKeys - 
 * Names (or functions that return names) of properties to encrypt
 */
const encryptProperties = (...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  const encryptProps = () => {
    return keys.map(key => o[key]
      ? { [key]: encrypt(o[key]) }
      : {})
      .reduce((p, c) => ({ ...c, ...p }));
  }

  const mixins = updateMixins(
    mixinType.pre, o, encryptProperties.name,
    () => encryptProperties(...propKeys)
  );

  return {
    ...mixins,
    ...encryptProps()
  }
}

/**
 * Functional mixin that prevents properties from being updated.
 * Accepts a property name or a function that returns a property name.
 * @param {boolean} isUpdate - set to false on create and true on update
 * @param  {Array<string | function(*):string>} propKeys - names of properties to freeze
 */
const freezeProperties = (isUpdate, ...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  const preventUpdates = () => {
    const intersection = Object.keys(o)
      .filter(key => keys.includes(key));

    if (intersection?.length > 0) {
      throw new Error(`cannot update readonly properties: ${intersection}`);
    }
  }

  if (isUpdate) {
    preventUpdates();
  }

  return updateMixins(
    mixinType.pre, o, freezeProperties.name,
    () => freezeProperties(true, ...propKeys)
  );
}

/** 
 * Functional mixin that enforces required fields 
 * @param {Array<string | function(*):string>} propKeys - 
 * required property names
 */
const requireProperties = (...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);
  const missing = keys.filter(key => !o[key]);

  if (missing?.length > 0) {
    throw new Error(`missing required properties: ${missing}`);
  }
  return o;
}

/**
 * Functional mixin that hashes passwords
 * @param {*} hash hash algorithm
 * @param  {Array<string | function(*):string>} propKeys name of password props
 */
const hashPasswords = (hash, ...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  function hashPwds() {
    return keys.map(key => o[key]
      ? { [key]: hash(o[key]) }
      : {})
      .reduce((p, c) => ({ ...c, ...p }));
  }

  const mixins = updateMixins(
    mixinType.pre, o, hashPasswords.name,
    () => hashPasswords(hash, ...propKeys)
  );

  return {
    ...mixins,
    ...hashPwds()
  }
}

const internalPropList = [];

const allowProperties = (isUpdate, ...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  function rejectUnknownProps() {
    const allowList = keys.concat(internalPropList);
    const unknownProps = Object.keys(o).filter(
      key => !allowList.includes(key)
    );

    if (unknownProps?.length > 0) {
      throw new Error(`invalid properties: ${unknownProps}`);
    }
  }

  if (isUpdate) {
    rejectUnknownProps();
  }

  return updateMixins(
    mixinType.pre, o, allowProperties.name,
    () => allowProperties(true, ...propKeys)
  );
}

/**
 * @callback isValid
 * @param {Object} o - the property owner
 * @param {*} propVal - the property value
 * @returns {boolean} - true if valid
 */

/**
 * @typedef {{
 *  propKey:string,
 *  isValid?:isValid,
 *  values?:any[],
 *  regex?:string,
 *  typeof?:string,
 *  length?:number
 * }[]} validations 
 */

/**
 * 
 * @param {validations} validations
 */
const validatePropertyValues = (validations) => (o) => {
  const invalid = validations.filter(v => {
    const propVal = o[v.propKey];
    if (!propVal) {
      return false;
    }
    if (v.isValid) {
      if (!v.isValid(o, propVal)) {
        return true;
      }
    }
    if (v.values?.length > 0) {
      if (!v.values.includes(propVal)) {
        return true;
      }
    }
    if (v.typeof) {
      if (typeof propVal !== v.typeof) {
        return true;
      }
    }
    if (v.length) {
      if (propVal.length > v.length) {
        return true;
      }
    }
    if (v.regex) {
      if (!new RegExp(v.regex).test(propVal)) {
        return true;
      }
    }
    return false;
  });

  if (invalid?.length > 0) {
    throw new Error(
      `invalid value for ${[...invalid.map(v => v.propKey)]}`
    );
  }

  return updateMixins(
    mixinType.post, o, validatePropertyValues.name,
    () => validatePropertyValues(validations)
  );
}

/**
 * Require properties listed in `propKeys`
 * @param  {Array<string | function(*):string>} propKeys -
 * list of names (or functions that return names) of properties
 */
export function requirePropertiesMixin(...propKeys) {
  return requireProperties(...propKeys);
}

/**
 * Prevent updates to properties listed in `propKeys`
 * @param  {Array<string | function(*):string>} propKeys - 
 * list of names (or functions that return names) of properties 
 */
export function freezePropertiesMixin(...propKeys) {
  return freezeProperties(false, ...propKeys);
}

/**
 * Encyrpt properties listed in `propKeys`
 * @param  {Array<string | function(*):string>} propKeys -
 * list of names (or functions that return names) of properties
 */
export function encryptPropertiesMixin(...propKeys) {
  return encryptProperties(...propKeys);
}

/**
 * Hash passwords listed in `propKeys`
 * @param  {Array<string | function(*):string>} propKeys -
 * list of names (or functions that return names) of properties
 */
export function hashPasswordsMixin(...propKeys) {
  return hashPasswords(hash, ...propKeys);
}

/**
 * Only allow properties listed in `propKeys`
 * @param  {Array<string | function(*):string>} propKeys -
 * list of names (or functions that return names) of properties
 */
export function allowPropertiesMixin(...propKeys) {
  return allowProperties(false, ...propKeys);
}

/**
 * Validate property values are members of a list, 
 * match a regular expression, are of a certain length, or type,
 * or satisfy a custom validation function.
 * @param {validations} validations 
 */
export function validatePropertyValuesMixin(validations) {
  return validatePropertyValues(validations);
}

/**
 * Implement GDPR encryption requirement across models
 */
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


