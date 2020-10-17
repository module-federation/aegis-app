'use strict'

import GlobalMixins from './mixins'

// Dependencies
import { uuid } from '../lib/utils';
import {
  validateAddress
} from '../services/address-service';
import {
  authorizePayment,
  completePayment,
  refundPayment
} from '../services/payment-service';
import {
  shipOrder,
  trackShipment,
  verifyDelivery
} from '../services/shipping-service';

// Models
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
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback onDelete
 * @param {Model} model
 * @returns {Model | Error} updated model or throw
 */

/**
 * @typedef {Object} ModelSpecification Specify model data and behavior 
 * @property {string} modelName name of model (case-insenstive)
 * @property {string} endpoint URI reference (e.g. plural of `modelName`)
 * @property {function(...args): any} factory factory function that creates model
 * @property {Array<import("./mixins").mixinFunction>} [mixins] functional mixins
 * @property {onUpdate} [onUpdate] function called to handle update requests
 * @property {onDelete} [onDelete] function called before deletion
 * @property {Array<function({
 *  eventName:string,
 *  eventType:string,
 *  eventTime:string,
 *  modelName:string,
 *  model:Model
 * }):Promise<void>>} [eventHandlers] callbacks invoked when model events occur
 */

const requiredProperties = [
  'modelName',
  'endpoint',
  'factory'
];

function validateModel(model) {
  const missing = requiredProperties.filter(p => !model[p]);
  if (missing?.length > 0) {
    throw new Error(
      `missing required properties: ${missing} > ${Object.entries(model)}`
    );
  }
}

/**
 * @param {ModelSpecification} modelSpec 
 * @param {*} dependencies 
 */
function make(modelSpec, dependencies) {
  validateModel(modelSpec);
  modelSpec.dependencies = dependencies || {};
  const mixins = modelSpec.mixins || [];
  modelSpec.mixins = mixins.concat(GlobalMixins);
}

make(User, { uuid });
make(Order, {
  validateAddress,
  authorizePayment,
  completePayment,
  refundPayment,
  shipOrder,
  trackShipment,
  verifyDelivery,
  uuid
});

export {
  User,
  Order
}
