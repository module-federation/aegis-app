import GlobalMixins from './mixins';
import { uuid } from './utils';

import User from './user';
import Order from './order';

/**
 * @typedef {Object} Model
 * @property {Symbol} id
 * @property {Symbol} modelName
 * @property {Symbol} createTime
 * @property {Symbol} onUpdate
 */

/**
 * @callback onUpdate
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model}
 */

/**
 * @callback onDelete
 * @param {Model} model
 * @returns {Model}
 */

/**
 * @typedef {Object} ModelConfig
 * @property {string} modelName name of model
 * @property {function(...args): any} factory factory function that returns model
 * @property {Array<import("./mixins").mixinFunction>} [mixins] mixed into model
 * @property {onUpdate} [onUpdate] function called when model is updated
 * @property {onDelete} [onDelete] function called when model is deleted
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





