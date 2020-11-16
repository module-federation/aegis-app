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
  return async function ({ model: order, resolve }) {
    console.log(authorizePayment);
    const paymentAuthorization = await service.authorizePayment(order);
    order.update({ paymentAuthorization }).then(order => resolve(order));
  }
}
/**
 * @type {adapterFactory}
 */
export function completePayment(service) {
  return async function ({ model: order, resolve, args: [callback] }) {
    await service.completePayment({ order });
    callback({ order, resolve });
  }
}
/**
 * @type {adapterFactory}
 */
export function refundPayment(service) {
  return async function ({ model: order, resolve }) {
    await service.refundPayment({ order });
    resolve(order);
  }
} 
