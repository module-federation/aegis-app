"use strict";

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
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;
    return new Promise(async function (resolve, reject) {
      try {
        const paymentAuthorization = await service.authorizePayment(order);
        const newOrder = await callback(options, paymentAuthorization);
        resolve(newOrder);
      } catch (error) {
        reject(error);
      }
    });
  };
}
/**
 * @type {adapterFactory}
 */
export function completePayment(service) {
  return async function (options) {
    return new Promise(async function (resolve, reject) {
      const {
        model: order,
        args: [callback],
      } = options;
      await service.completePayment(order);
      const newOrder = await callback(options);
      resolve(newOrder);
    });
  };
}
/**
 * @type {adapterFactory}
 */
export function refundPayment(service) {
  return async function (options) {
    return new Promise(async function (resolve, reject) {
      const {
        model: order,
        args: [callback],
      } = options;
      await service.refundPayment(order);
      const newOrder = await callback(options);
      resolve(newOrder);
    });
  };
}
