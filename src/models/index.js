'use strict'

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
 * @returns {Model} updated model
 */

/**
 * @callback onDelete
 * @param {Model} model
 * @returns {Model} updated model
 */

/**
 * @typedef {Object} ModelConfig
 * @property {string} modelName name of model (case-insenstive)
 * @property {function(...args): any} factory factory function that creates model
 * @property {Array<import("./mixins").mixinFunction>} [mixins] functional mixins
 * @property {onUpdate} [onUpdate] function called to handle model update request
 * @property {onDelete} [onDelete] function called before model is deleted
 * @property {Array<function({
 *  eventName:string, 
 *  [x: string]:any[]
 * }):Promise<void>>} [eventHandlers] callbacks invoked when model events occur
 */

/**
 * @param {ModelConfig} model 
 * @param {*} dependencies 
 */
function make(model, dependencies) {
  model.factory = model.factory(dependencies);
  model.mixins = model.mixins.concat(GlobalMixins);
}

make(User, { uuid });
make(Order, {});

export {
  User,
  Order
}





