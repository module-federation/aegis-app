'use strict'

/**
 * @typedef {import('../models/order').Order} Order
 * @typedef {string} address
 * @typedef {{
 * validateAddress:function(address):Promise<address>
 * }} service - verifies/corrects address
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order})} - verified/corrected address
 */

/**
 * 
 * @type {adapterFactory} 
 */
export function validateAddress(service) {
  return async function ({
    model: order,
    resolve,
    args: [callback]
  }) {
    const shippingAddress = await service.validateAddress(
      order.decrypt().shippingAddress
    );
    callback({
      order,
      shippingAddress,
      resolve
    });
  }
}