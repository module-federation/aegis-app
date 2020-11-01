'use strict'

/**
 * @typedef {Object} Model
 * @property {Symbol} id 
 * @property {Symbol} modelName
 * @property {Symbol} createTime
 * @property {Symbol} onUpdate
 * 
 * @callback onUpdate
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model | Error} updated model or throw
 * 
 * @callback onDelete
 * @param {Model} model
 * @returns {Model | Error} updated model or throw
 * 
 * @typedef {Object} ModelSpecification Specify model data and behavior 
 * @property {string} modelName name of model (case-insenstive)
 * @property {string} endpoint URI reference (e.g. plural of `modelName`)
 * @property {function(...args): any} factory factory function that creates model
 * @property {object} dependencies injected into the model for inverted control
 * @property {Array<import("./mixins").mixinFunction>} [mixins] functional mixins
 * @property {onUpdate} [onUpdate] function called to handle update requests
 * @property {onDelete} [onDelete] function called before deletion
 * @property {{
 *  [x: string]: {
 *    service: string,
 *    type?:'inbound'|'outbound',
 *    disabled?: boolean
 *    adapter?: string
 *  }
 * }} [ports] input/output ports for the domain
 * @property {Array<function({
 *  eventName:string,
 *  eventType:string,
 *  eventTime:string,
 *  modelName:string,
 *  model:Model
 * }):Promise<void>>} [eventHandlers] callbacks invoked when model events occur 
 */

import GlobalMixins from './mixins'

// Dependencies
import { uuid } from '../lib/utils';
import * as services from '../services'
import * as adapters from '../adapters'

// Models
import User from './user';
import Order from './order';

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

function makeAdapters(ports) {
  if (!ports) {
    return;
  }
  return Object.keys(ports).map(port => {
    if (port.disabled) {
      return;
    }
    try {
      return {
        [port]: adapters[port](
          services[ports[port].service]
        )
      }
    } catch (e) {
      console.warn(e.message);
    }
  }).reduce((p, c) => ({ ...c, ...p }));
}

/**
 * 
 * @param {ModelSpecification} model 
 * @param {*} dependencies - services injected
 */
function makeModel(model, dependencies) {
  validateModel(model);
  model.dependencies = {
    ...dependencies,
    ...makeAdapters(model.ports)
  };
  model.mixins = model.mixins.concat(GlobalMixins);
}

makeModel(User, { uuid });
makeModel(Order, { uuid });

export {
  User,
  Order,
}
