

/**
 * @callback findModelType
 * @param {string} id
 * @returns {object} - model
 */

/**
 * @callback listModelsType
 * @returns {object} model
 */

/**
 * @callback addModelType
 * @param {*} args
 * @returns {object} model
 */

/**
 * @callback editModelType
 * @param {*} changes
 * @returns {object} model
 */

/**
 * @callback removeModelType
 * @param {string} id
 * @returns {object} - model
 */

/**
 * @typedef EventSubscriber
 * @property {subscriptionCallback} subscribe
 */

/**
 * @typedef EventConsumer
 * @property {Function} getSubscriptions
 * @property {Function} unsubscribe
 * @property {function(string):string} getId
 * @property {function(string):string} getTopic
 */

/**
 * @callback handleEvent
 * @param {{
 *  topic: string,
 *  message: {
 *    value: string,
 *  },
 *  consumer: EventConsumer
 * }} 
 * @returns {void}
 */

/**
 * @callback subscribeType
 * @param {string} topic
 * @param {string} id,
 * @param {handleEvent} callback
 */

/**
 * @typedef {object} dependencyType
 * @property {findModelType} findModel
 * @property {addModelType} addModel
 * @property {findModelType} findModel
 * @property {listModelsType} listModels
 * @property {addModelType} addModel
 * @property {editModelType} editModel
 * @property {removeModelType} removeMode,
 * @property {subscribeType} consumeEvents
 * @property {{[x: string]: Function}} serviceMame
 */

/**
 * @callback factoryType
 * @param {dependencyType}
 */

/**
 * @typedef UseCaseSpecification
 * @property {string} modelName
 * @property {string} endpoint
 * @property {factoryType} factory
 */

'use strict'

import ShippingService from '../services'
import { ShipOrder } from '../use-cases'

/**
 * 
 * @param {UseCaseSpecification} UseCaseSpec 
 * @param {*} dependencies 
 */
function make(UseCaseSpec, dependencies) {
  UseCaseSpec.dependencies = dependencies || {};
}

make(ShipOrder, {
  ShippingService
});

export {
  ShipOrder
}