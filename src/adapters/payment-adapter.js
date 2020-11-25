'use strict'

/**
 * @typedef {import('../models/order').Order} Order
 * @typedef {{
 * authorizePayment:function():Promise<string>,
 * completePaymet:function():Promise<void>,
 * refundPayment:function():Promise<void>
 * }} service 
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order,parms:any[]})} 
 */

import handlePortOptions from '../models/handle-port-options'

/**
 * @type {adapterFactory}
 */
export function authorizePayment(service) {
  return async function (options) {
    const { model: order } = options;
    const paymentAuthorization = await service.authorizePayment(order);
    return handlePortOptions(options, paymentAuthorization);
  }
}
/**
 * @type {adapterFactory}
 */
export function completePayment(service) {
  return async function (options) {
    const { model: order } = options;
    await service.completePayment(order);
    return handlePortOptions(options);
  }
}
/**
 * @type {adapterFactory}
 */
export function refundPayment(service) {
  return async function (options) {
    const { model: order } = options;
    await service.refundPayment({ order });
    return handlePortOptions(options);
  }
}