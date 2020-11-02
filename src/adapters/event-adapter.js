'use strict'

import { uuid } from '../lib/utils'

/**
 * @typedef {import('../models/order').Order} Order
 * @typedef {string|RegExp} topic
 * @callback eventHandler
 * @param {string} eventData
 * @typedef {eventHandler} notifyType 
 * @typedef {{
 * listen:function(topic, eventHandler),
 * notify:notifyType
 * }} EventService 
 * @callback adapterFactory
 * @param {EventService} service
 * @returns {function(topic, eventHandler)} 
 */

/**
 * @type {adapterFactory}
 */
export function listen(service) {
  return async ({ parms: [topic, callback] }) => service.listen(topic, callback);
}

/**
 * @type {adapterFactory}
 * @returns {function(topic, eventData)}
 */
export function notify(service) {
  return async ({ parms: [topic, message] }) => service.notify(topic, message);
}