import GlobalMixins from './mixins';
import { uuid } from './utils';

import User from './user';
import Order from './order';

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

make(User, { uuid });
make(Order, {});

export {
  User,
  Order
}





