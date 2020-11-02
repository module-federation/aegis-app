'use strict'

/**
 * @typedef {import('../models/order').Order} Order
 * @typedef {{
 * authorizePayment:function(),
 * completePaymet:function(),
 * refundPayment:function()
 * }} service 
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order,parms:any[]})} 
 */

/**
 * @type {adapterFactory}
 */
export function authorizePayment(service) {
  return async function (data) {
    console.log('authorizePayment adapter');
    service.authorizePayment(data);
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
