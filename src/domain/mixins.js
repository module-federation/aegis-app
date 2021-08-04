"use strict";

import { hash, encrypt, decrypt, compose } from "../domain/utils";
import util from "util";

/**
 * Functional mixin created by `functionalMixinFactory`
 * @callback functionalMixin
 * @param {Object} o Object to compose
 * @returns {Object} Composed object
 */

/**
 * Functional mixin factory - partial application - returns mixin function
 * @callback functionalMixinFactory
 * @param {*} mixinParams params for mixin function
 * @returns {functionalMixin}
 */

/**
 * @typedef {import("../domain/index").Model} Model
 */

/**
 * Private key to access previous version of the model
 */
export const prevmodel = Symbol("prevModel");
/**
 * private key to access validation config
 */
export const validations = Symbol("validations");
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
const premixins = mixinSets[mixinType.pre];
/**
 * Set of post mixins
 */
const postmixins = mixinSets[mixinType.post];

/**
 * Apply any pre and post mixins and return the result.
 * @deprecated
 * @param {*} model - current model
 * @param {*} changes - object containing changes
 * @returns {import('.').Model} updated model
 */
export function processUpdate(model, changes) {
  changes[prevmodel] = JSON.parse(JSON.stringify(model)); // keep history

  const updates = model[premixins]
    ? compose(...model[premixins].values())(changes)
    : changes;

  const updated = { ...model, ...updates };

  return model[postmixins]
    ? compose(...model[postmixins].values())(updated)
    : updated;
}

/**
 * @deprecated
 * Store mixins for execution on update
 * @param {mixinType} type
 * run before changes are applied or afterward
 * @param {*} o  Object containing changes to apply (pre)
 * or new object after changes have been applied (post)
 * @param {string} name `Function.name`
 * @param {functionalMixin} cb mixin function
 */
export function updateMixins(type, o, name, cb) {
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
 * bitmask for identifying events
 */
const eventMask = {
  update: 1, //  0001 Update
  create: 1 << 1, //  0010 Create
  onload: 1 << 2, //  0100 Load
};

function handleUpdateEvent(model, updates, event) {
  const isUpdate = eventMask.update & event;
  const decrypted = isUpdate ? model.decrypt() : {};
  return {
    ...model,
    ...updates,
    ...decrypted,
  };
}

function isObject(p) {
  return p != null && typeof p === "object";
}

function containsUpdates(model, changes, event) {
  if (eventMask.update & event) {
    const changeList = Object.keys(changes);
    if (changeList.length < 1) return false;

    if (
      changeList.every(
        k => model[k] && util.isDeepStrictEqual(changes[k], model[k])
      )
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Run validation functions enabled for a given event.
 * @param {Model} model - the composed object
 * @param {*} changes - object containing changes
 * @param {Number} event - Indicates what event is occuring:
 * 1st bit turned on means update, 2nd bit create, 3rd load,
 * see `eventMask`.
 */
export function validateModel(model, changes, event) {
  // if there are no changes, and the event is an update, return
  if (!containsUpdates(model, changes, event)) {
    return model;
  }

  // keep a history of the last saved model
  const input = { ...changes, [prevmodel]: JSON.parse(JSON.stringify(model)) };

  // Validate just the input data
  const updates = model[validations]
    .filter(v => v.input & event)
    .sort((a, b) => a.order - b.order)
    .map(v => model[v.name].apply(input))
    .reduce((p, c) => ({ ...p, ...c }), input);

  const updated = { ...model, ...updates };

  // Validate the updated model
  return updated[validations]
    .filter(v => v.output & event)
    .sort((a, b) => a.order - b.order)
    .map(v => updated[v.name]())
    .reduce((p, c) => ({ ...p, ...c }), updated);
}

/**
 * Specify when validations run.
 */
const enableValidation = (() => {
  const onUpdate = enableEvent(true, false, false);
  const onCreate = enableEvent(false, true, false);
  const onCreateAndUpdate = enableEvent(true, true, false);
  const onLoad = enableEvent(false, false, true);
  const onAll = enableEvent(true, true, true);
  const never = enableEvent(false, false, false);
  return {
    /**
     * Validation runs on update.
     */
    onUpdate,
    /**
     * Validation runs on create.
     */
    onCreate,
    /**
     * Validation runs on both create and update.
     */
    onCreateAndUpdate,
    /**
     * Validation runs on load.
     */
    onLoad,
    /**
     * Validation runs on all events.
     */
    onAll,
    /**
     * Validation runs on zero events (disabled).
     */
    never,
  };
})();

/**
 * Enable validation to run on specific events.
 * @param {boolean} onUpdate - whether or not to run the validation on update.
 * Defaults to `true`.
 * @param {boolean} onCreate - whether or not to run the validation on create.
 * Defaults to `true`.
 * @param {boolean} onLoad - whether or not to run the validation when
 * the object is being loaded into memory after being deserialized.
 * Defaults to `false`.
 */
function enableEvent(onUpdate = true, onCreate = true, onLoad = false) {
  let enabled = 0;

  if (onUpdate) {
    enabled |= eventMask.update;
  }
  if (onCreate) {
    enabled |= eventMask.create;
  }
  if (onLoad) {
    enabled |= eventMask.onload;
  }
  return enabled;
}

/**
 * Add a validation function to be called for a given event.
 * @typedef {object} validationConfig
 * @property {*} o - the composed object
 * @property {string} name - name of function to run
 * @property {number} input - "input" validations run against
 * the data passed by the caller in the request. Use `enableValidation`
 * to provide a value for this param.
 * @property {number} output - "output" functions run against the
 * model after the changes have been applied.
 * @property {number} order - order in which validation runs
 * @param {validationConfig} param0
 */
function addValidation({ model, name, input = 0, output = 0, order = 50 }) {
  const config = model[validations] || [];

  if (config.some(v => v.name === name)) {
    return model;
  }

  return {
    ...model,
    validateModel,
    [validations]: [...config, { name, input, output, order }],
  };
}

/**
 * Resolve keys:
 * If the value includes an array, flatten it, then for each element:
 * If the value is "*", return all keys of the object.
 * If the value is a function, execute it to get a dynamic key or key list.
 * If the value is a RegExp, test it to get dynamic key list.
 * If any of the above produce an array of keys, flatten it.
 * @param {*} o - Object to compose
 * @param  {Array<string | function(*):string>} propKeys -
 * Names (or functions that return names) of properties
 * @returns {string[]} list of (resolved) property keys
 */
function parseKeys(o, ...propKeys) {
  const keys = propKeys.flat().map(function (k) {
    if (typeof k === "function") return k(o);
    if (k instanceof RegExp) return Object.keys(o).filter(key => k.test(key));
    if (k === "*") return Object.keys(o);
    return k;
  });
  return keys.flat();
}

/**
 * Encrypt properties. Properties remain encrypted indefinitely, and
 * must be explicitly decrypted as needed, e.g. reading values in memory,
 * from storage, serializing and sending to an external system.
 * @param  {Array<string | function(*):string>} propKeys -
 * Names (or functions that return names) of properties to encrypt
 * @returns {functionalMixin} mixin function
 */
export const encryptProperties =
  (...propKeys) =>
  o => {
    const keys = parseKeys(o, ...propKeys);

    const encryptProps = obj => {
      return keys
        .map(key => (obj[key] ? { [key]: encrypt(obj[key]) } : {}))
        .reduce((p, c) => ({ ...p, ...c }));
    };

    return {
      encryptProperties() {
        return encryptProps(this);
      },

      ...addValidation({
        model: o,
        name: encryptProperties.name,
        input: enableValidation.onUpdate,
        output: enableValidation.onCreate,
        order: 99,
      }),

      decrypt() {
        return keys
          .map(key => (this[key] ? { [key]: decrypt(this[key]) } : {}))
          .reduce((p, c) => ({ ...p, ...c }));
      },
    };
  };

/**
 * Prevent properties from being modified.
 * Accepts a property name or a function that returns a property name.
 * @param  {Array<string | function(*):string | RegExp>} propKeys - names of properties to freeze
 */
export const freezeProperties =
  (...propKeys) =>
  o => {
    const preventUpdates = obj => {
      const keys = parseKeys(obj, ...propKeys);

      const sideEffects = Object.keys(obj).filter(key => keys.includes(key));
      if (sideEffects?.length > 0) {
        throw new Error(`cannot update readonly properties: ${sideEffects}`);
      }
    };

    return {
      freezeProperties() {
        preventUpdates(this);
      },

      ...addValidation({
        model: o,
        name: freezeProperties.name,
        input: enableValidation.onUpdate,
        order: 20,
      }),
    };
  };

/**
 * Enforce required fields.
 * @param {Array<string | function(*):string | RegExp>} propKeys -
 * required property key names - can be a function or regex
 * that returns the property key names
 */
export const requireProperties =
  (...propKeys) =>
  o => {
    const keys = parseKeys(o, ...propKeys);

    function requireProps(obj) {
      const missing = keys.filter(key => key && !obj[key]);
      if (missing?.length > 0) {
        throw new Error(`missing required properties: ${missing}`);
      }
    }
    return {
      requireProperties() {
        requireProps(this);
      },

      ...addValidation({
        model: o,
        name: requireProperties.name,
        output: enableValidation.onCreateAndUpdate,
        order: 75,
      }),
    };
  };

/**
 * Hash passwords.
 * @param {*} hash hash algorithm
 * @param  {Array<string | function(*):string | RegExp>} propKeys name of password props
 */
export const hashPasswords =
  (...propKeys) =>
  o => {
    const keys = parseKeys(o, ...propKeys);

    function hashPwds(obj) {
      return keys
        .map(key => (obj[key] ? { [key]: hash(obj[key]) } : {}))
        .reduce((p, c) => ({ ...p, ...c }));
    }

    return {
      hashPasswords() {
        return hashPwds(this);
      },

      ...addValidation({
        model: o,
        name: hashPasswords.name,
        input: enableValidation.onUpdate,
        output: enableValidation.onCreate,
        order: 80,
      }),
    };
  };

const internalPropList = [];

/**
 * Reject unknown properties in user input. Allow only approved keys.
 * @param  {...any} propKeys
 */
export const allowProperties =
  (...propKeys) =>
  o => {
    function rejectUnknownProps() {
      const keys = parseKeys(o, ...propKeys);

      const allowList = keys.concat(internalPropList);
      const unknownProps = Object.keys(o).filter(
        key => !allowList.includes(key)
      );

      if (unknownProps?.length > 0) {
        throw new Error(`invalid properties: ${unknownProps}`);
      }
    }

    return {
      rejectUnknownProperties() {
        return rejectUnknownProps(this);
      },

      ...addValidation({
        model: o,
        name: "rejectUnknownProperties",
        input: enableValidation.onUpdate,
        order: 15,
      }),
    };
  };

/**
 * Test regular expressions
 */
export const RegEx = {
  email: /^(.+)@(.+){2,}\.(.+){2,}$/,
  ipv4Address:
    /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/,
  ipv6Address:
    /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/,
  phone: /^[1-9]\d{2}-\d{3}-\d{4}/,
  creditCard:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  ssn: /^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$/,
  /**
   * Allow caller to pass a keyword that refers to one of the regex above
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
 *  unique?:{ encrypted:boolean }
 * }} validation
 */

function evaluateUniqueness(v, o, propVal) {
  const compareVal = v.unique.encrypted ? encrypt(propVal) : propVal;
  return o.listSync({ [v.propKey]: compareVal }).length < 1;
}

/**
 * Run validation tests
 */
const Validator = {
  tests: {
    isValid: (v, o, propVal) => v.isValid(o, propVal),
    values: (v, o, propVal) => v.values.includes(propVal),
    regex: (v, o, propVal) => RegEx.test(v.regex, propVal),
    typeof: (v, o, propVal) => v.typeof === typeof propVal,
    maxnum: (v, o, propVal) => v.maxnum + 1 > propVal,
    maxlen: (v, o, propVal) => v.maxlen + 1 > propVal.length,
    unique: (v, o, propVal) => evaluateUniqueness(v, o, propVal),
  },
  /**
   * Returns true if tests pass.
   * @param {validation} v validation config
   * @param {Object} o object to compose
   * @param {*} propVal value of property to validate
   * @returns {boolean} true if tests pass
   */
  isValid(v, o, propVal) {
    return Object.keys(this.tests).every(key => {
      if (v[key]) {
        // the test `key` is specified, run it
        return this.tests[key](v, o, propVal);
      }
      return true;
    });
  },
};

/**
 * Verify a property value is a member of a list,
 * is unique within a set of model instances,
 * is of a certain length, size or type,
 * matches a regular expression,
 * or satisfies a custom validation function.
 * @param {validation[]} validations
 */
export const validateProperties = validations => o => {
  function validate(obj) {
    const invalid = validations.filter(v => {
      const propVal = obj[v.propKey];

      if (!propVal) {
        return false;
      }
      return !Validator.isValid(v, obj, propVal);
    });

    if (invalid?.length > 0) {
      throw new Error(`invalid value for ${[...invalid.map(v => v.propKey)]}`);
    }
  }

  return {
    validateProperties() {
      validate(this);
    },

    ...addValidation({
      model: o,
      name: validateProperties.name,
      input: enableValidation.onUpdate,
      output: enableValidation.onCreate,
      order: 90,
    }),
  };
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
 * Respond to property updates by updating addtional (dependent) properties as needed.
 * @param {updater[]} updaters
 */
export const updateProperties = updaters => o => {
  function updateProps(obj) {
    const updates = updaters.filter(u => obj[u.propKey]);

    if (updates?.length > 0) {
      return updates
        .map(u => u.update(o, obj[u.propKey]))
        .reduce((p, c) => ({ ...p, ...c }));
    }
  }

  return {
    updateProperties() {
      return updateProps(this);
    },

    ...addValidation({
      model: o,
      name: updateProperties.name,
      input: enableValidation.onUpdate,
      order: 35,
    }),
  };
};

/**
 * Set a validation that invokes a port. The port must be configured
 * in the `ModelSpecification`.
 * @param {string} fn - name of port (as it appears in the ModelSpec)
 * @param {boolean} onCreate - invoke on create
 * @param {boolean} onUpdate - invoke on update
 * @param  {...any} args - pass arguments
 */
export const invokePort =
  (fn, onCreate, onUpdate, ...args) =>
  async o => {
    return {
      ...o,
      invokePort() {
        console.log({ func: "invokePort", fn, args });
        return this[fn](...args).then(o => o);
      },

      ...addValidation({
        model: o,
        name: "invokePort",
        output: enableValidation.onUpdate,
        order: 85,
      }),
    };
  };

/**
 * Set a validation that calls a model method or provided function.
 * @param {string|function(Model, ...any):Promise<any>} fn - callback function
 * or name of method to executee
 * @param {boolean} onCreate - invoke on create
 * @param {boolean} onUpdate - invoke on update
 * @param  {...any} args - pass arguments to the method/function
 * @return {Model}
 */
export const execMethod =
  (fn, onCreate, onUpdate, ...args) =>
  async o => {
    const functionType = {
      function: (fn, obj, ...args) => fn(obj, ...args).then(o => o),
      string: (fn, obj, ...args) => obj[fn](...args).then(o => o),
    };

    return {
      ...o,
      async execMethod() {
        const model = await functionType[typeof fn](fn, this, ...args);
        return model;
      },

      ...addValidation({
        model: o,
        name: "execMethod",
        output: enableValidation.onUpdate,
        order: 40,
      }),
    };
  };

/**
 * Create a method on a model.
 * @param {*} fn
 * @param  {...any} args
 */
export const createMethod =
  (fn, ...args) =>
  o => {
    return {
      ...o,
      [fn.name]: () => fn(...args),
    };
  };

/**
 * Check the value of the property before returning its key.
 * @param {*} propKey
 * @param {regexType} expr
 * @returns {function(any):any} dynamic property func
 */
export const withValidFormat = (propKey, expr) => o => {
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
  /^last.*Name$|^surname$|^family.*Name$/i,
  /^shipping.*Address$/i,
  /^billing.*Address$/i,
  /^home.*Address$/i,
  /email|e-mail/i,
  /^phone$|^home.*phone$/i,
  /^mobile$|^mobile.*number$|^cell.*number$/i,
  /^credit.*Card/i,
  /^cvv$/i,
  /^ssn$|^socialSecurity/i,
  /^encrypted/i
);

/**
 * Global mixins
 */
const GlobalMixins = [encryptPersonalInfo];

export default GlobalMixins;
