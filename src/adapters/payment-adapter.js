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

/**
 * @type {adapterFactory}
 */
export function authorizePayment(service) {
  return async function ({ model: order }) {
    return service.authorizePayment(order);
  }
}
/**
 * @type {adapterFactory}
 */
export function completePayment(service) {
  return async function ({ model }) {
    service.completePayment({ model });
  }
}
/**
 * @type {adapterFactory}
 */
export function refundPayment(service) {
  return async function ({ model: order, parms }) {
    service.refundPayment({ model, parms });
  }
} 
