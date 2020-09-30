import GlobalMixins from './mixins';
import { uuid } from './utils';

import { default as user } from './user';
import { default as order } from './order';

/**
 * @callback onUpdate
 * @param {model: Model, changes: Object} changes
 */

/**
 * @typedef {Object} ModelConfig
 * @property {string} modelName
 * @property {function(...args): any} factory
 * @property {Array<import("./mixins").mixinFunction>} [mixins]
 * @property {onUpdate} [onUpdate]
 * @property {onDelete} [onDelete]
 */

/**
 * @param {ModelConfig} module 
 * @param {*} dependencies 
 */
function make(module, dependencies) {
  module.factory = module.factory(dependencies);
  module.mixins = module.mixins.concat(GlobalMixins);
}

make(user, { uuid });
make(order, {});

export {
  user,
  order
}





