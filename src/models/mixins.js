"use strict";

import { hash, encrypt, decrypt, compose } from "../lib/utils";

/**
 * Functional mixin
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
export const PREVMODEL = Symbol("prevModel");

/**
 * Process mixin pre or post update
 */
export const mixinType = {
  pre: Symbol("pre"),
  post: Symbol("post"),
};

/**
 * Stored mixins - use private symbol as key to prevent overwrite
 */
export const mixinSets = {
  [mixinType.pre]: Symbol("preUpdateMixins"),
  [mixinType.post]: Symbol("postUpdateMixins"),
};

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
 * @returns {import('.').Model} updated model
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
    throw new Error("invalid mixin type");
  }

  const mixinSet = o[mixinSets[type]] || new Map();

  if (!mixinSet.has(name)) {
    mixinSet.set(name, cb());

    return {
      ...o,
      [mixinSets[type]]: mixinSet,
    };
  }
  return o;
}

/**
 * Execute any functions in `propKeys` and return key names
 * @param {*} o - Object to compose
 * @param  {Array<string | function(*):string>} propKeys -
 * Names (or functions that return names) of properties
 * @returns {string[]} list of (resolved) property keys
 */
function getConditionalProps(o, ...propKeys) {
  return propKeys.map((k) => (typeof k === "function" ? k(o) : k));
}

/**
 * Functional mixin that encrypts the properties specified in `propKeys`
 * @param  {Array<string | function(*):string>} propKeys -
 * Names (or functions that return names) of properties to encrypt
 * @returns {mixinFunction} mixin function
 */
const encryptProperties = (...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  const encryptProps = () => {
    if (o.isLoading) {
      return {};
    }
    return keys
      .map((key) => (o[key] ? { [key]: encrypt(o[key]) } : {}))
      .reduce((p, c) => ({ ...c, ...p }));
  };

  const mixins = updateMixins(mixinType.pre, o, encryptProperties.name, () =>
    encryptProperties(...propKeys)
  );

  return {
    decrypt() {
      return keys
        .map((key) => (this[key] ? { [key]: decrypt(this[key]) } : {}))
        .reduce((p, c) => ({ ...c, ...p }));
    },
    ...mixins,
    ...encryptProps(),
  };
};

/**
 * Functional mixin that prevents properties from being updated.
 * Accepts a property name or a function that returns a property name.
 * @param {boolean} isUpdate - set to false on create and true on update
 * @param  {Array<string | function(*):string>} propKeys - names of properties to freeze
 */
const freezeProperties = (isUpdate, ...propKeys) => (o) => {
  const preventUpdates = () => {
    const keys = getConditionalProps(o, ...propKeys);

    const mutations = Object.keys(o).filter((key) => keys.includes(key));

    if (mutations?.length > 0) {
      throw new Error(`cannot update readonly properties: ${mutations}`);
    }
  };

  if (isUpdate) {
    preventUpdates();
  }

  return updateMixins(mixinType.pre, o, freezeProperties.name, () =>
    freezeProperties(true, ...propKeys)
  );
};

/**
 * Functional mixin that enforces required fields
 * @param {Array<string | function(*):string>} propKeys -
 * required property names
 */
const requireProperties = (...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  const missing = keys.filter((key) => key && !o[key]);
  if (missing?.length > 0) {
    throw new Error(`missing required properties: ${missing}`);
  }

  return updateMixins(mixinType.post, o, requireProperties.name, () =>
    requireProperties(...propKeys)
  );
};

/**
 * Functional mixin that hashes passwords
 * @param {*} hash hash algorithm
 * @param  {Array<string | function(*):string>} propKeys name of password props
 */
const hashPasswords = (hash, ...propKeys) => (o) => {
  const keys = getConditionalProps(o, ...propKeys);

  function hashPwds() {
    if (o.isLoading) return {};
    return keys
      .map((key) => (o[key] ? { [key]: hash(o[key]) } : {}))
      .reduce((p, c) => ({ ...c, ...p }));
  }

  const mixins = updateMixins(mixinType.pre, o, hashPasswords.name, () =>
    hashPasswords(hash, ...propKeys)
  );

  return {
    ...mixins,
    ...hashPwds(),
  };
};

const internalPropList = ["decrypt"];

/**
 *
 * @param {*} isUpdate
 * @param  {...any} propKeys
 */
const allowProperties = (isUpdate, ...propKeys) => (o) => {
  function rejectUnknownProps() {
    const keys = getConditionalProps(o, ...propKeys);
    const allowList = keys.concat(internalPropList);

    const unknownProps = Object.keys(o).filter(
      (key) => !allowList.includes(key)
    );

    if (unknownProps?.length > 0) {
      throw new Error(`invalid properties: ${unknownProps}`);
    }
  }

  if (isUpdate) {
    rejectUnknownProps();
  }

  return updateMixins(mixinType.pre, o, allowProperties.name, () =>
    allowProperties(true, ...propKeys)
  );
};

export const callMethod = (fn, ...args) => (o) => {
  return {
    ...o,
    ...o[fn](...args),
  };
};

/**
 * Test regular expressions
 */
export const RegEx = {
  email: /^(.+)@(.+){2,}\.(.+){2,}$/,
  ipv4Address: /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/,
  ipv6Address: /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/,
  phone: /^[1-9]\d{2}-\d{3}-\d{4}/,
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  ssn: /^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$/,
  /**
   *
   * @param {regexType} expr
   * @param {*} val
   */
  test(expr, val) {
    const _expr =
      Object.keys(this).includes(expr) && this[expr] instanceof RegExp
        ? this[expr]
        : expr;
    return _expr.test(val);
  },
};

/**
 * @callback isValid
 * @param {Object} o - the property owner
 * @param {*} propVal - the property value
 * @returns {boolean} - true if valid
 *
 * @typedef {'email'|'phone'|'ipv4Address'|'ipv6Address'|'creditCard'|'ssn'|RegExp} regexType
 *
 * @typedef {{
 *  propKey:string,
 *  isValid?:isValid,
 *  values?:any[],
 *  regex?:regexType,
 *  maxlen?:number
 *  maxnum?:number
 *  typeof?:string
 * }} validation
 */

/**
 * Run validation tests
 */
const Validator = {
  tests: {
    isValid: (v, o, propVal) => v(o, propVal),
    values: (v, o, propVal) => v.includes(propVal),
    regex: (v, o, propVal) => RegEx.test(v, propVal),
    typeof: (v, o, propVal) => v === typeof propVal,
    maxnum: (v, o, propVal) => v + 1 > propVal,
    maxlen: (v, o, propVal) => v + 1 > propVal.length,
  },
  /**
   * Returns true if tests pass
   * @param {validation} v validation spec
   * @param {Object} o object to compose
   * @param {*} propVal value of property to validate
   * @returns {boolean} true if tests pass
   */
  isValid(v, o, propVal) {
    return Object.keys(this.tests).every((key) => {
      if (v[key]) {
        // enabled
        return this.tests[key](v[key], o, propVal);
      }
      return true;
    });
  },
};

/**
 *
 * @param {validation[]} validations
 */
const validateProperties = (validations) => (o) => {
  const invalid = validations.filter((v) => {
    const propVal = o[v.propKey];
    if (!propVal) {
      return false;
    }
    return !Validator.isValid(v, o, propVal);
  });

  if (invalid?.length > 0) {
    throw new Error(`invalid value for ${[...invalid.map((v) => v.propKey)]}`);
  }

  return updateMixins(mixinType.post, o, validateProperties.name, () =>
    validateProperties(validations)
  );
};

/**
 * @callback updaterFn
 * @param {Object} o
 * @param  {*} propVal
 * @returns {Object} object with updated properties
 *
 * @typedef {{
 * propKey: string,
 * update: updaterFn
 * }} updater
 */

/**
 * @param {boolean} isUpdate false on create, true on update
 * @param {updater[]} updaters
 */
const updateProperties = (isUpdate, updaters) => (o) => {
  function updateProps() {
    if (isUpdate) {
      const updates = updaters.filter((u) => o[u.propKey]);

      if (updates?.length > 0) {
        return updates
          .map((u) => u.update(o, o[u.propKey]))
          .reduce((p, c) => ({ ...p, ...c }));
      }
    }
    return {};
  }

  const mixins = updateMixins(mixinType.pre, o, updateProperties.name, () =>
    updateProperties(true, updaters)
  );

  return {
    ...mixins,
    ...updateProps(),
  };
};

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
 * Encyrpt properties listed in `propKeys` and add a function
 * to the object to `decrypt`.
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
 * @param {validation[]} validations
 * @returns {mixinFunction} mixin function
 */
export function validatePropertiesMixin(validations) {
  return validateProperties(validations);
}

/**
 * React to property updates. Run callbacks in `updaters`
 * when a request to update associated properties is received.
 * @param {updater[]} updaters - callbacks to run
 * @returns {mixinFunction} mixin function
 */
export function updatePropertiesMixin(updaters) {
  return updateProperties(false, updaters);
}

/**
 * Check the value of the property before returning its key.
 * @param {*} propKey
 * @param {regexType} expr
 * @returns {function(any):any} dynamic property func
 */
export const withCorrectFormat = (propKey, expr) => (o) => {
  if (o.isLoading) return propKey;
  if (o[propKey] && !RegEx.test(expr, o[propKey])) {
    throw new Error(`invalid ${propKey}`);
  }
  return propKey;
};

/**
 *
 * @param {string} value
 * @param {regexType} expr
 */
export const checkFormat = (value, expr) => {
  if (value && !RegEx.test(expr, value)) {
    const x = expr instanceof RegExp ? value : expr;
    throw new Error(`${x} invalid`);
  }
};

/**
 * Implement GDPR encryption requirement across models
 */
export const encryptPersonalInfo = encryptProperties(
  "lastName",
  "address",
  "shippingAddress",
  "billingAddress",
  withCorrectFormat("email", "email"),
  withCorrectFormat("phone", "phone"),
  withCorrectFormat("mobile", "phone"),
  withCorrectFormat("creditCardNumber", "creditCard"),
  withCorrectFormat("ssn", "ssn")
);

/**
 * Global mixins
 */
const GlobalMixins = [encryptPersonalInfo];

export default GlobalMixins;
