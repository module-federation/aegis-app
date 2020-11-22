'use strict'

import { response } from 'express';

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
  return async function ({ model: order, resolve, args: [callback] }) {
    const paymentAuthorization = await service.authorizePayment(order);
    callback({ order, paymentAuthorization, resolve });
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
export default function refundPayment(service) {
  return async function ({ model: order, resolve, args: [callback] }) {
    await service.refundPayment({ order });
    callback({ order, resolve });
  }
} 
