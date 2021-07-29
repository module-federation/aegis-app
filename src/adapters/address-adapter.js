"use strict";

/**
 * @typedef {import('../domain/order').Order} Order
 * @typedef {string} address
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order})} - verified/corrected address
 */

/**
 *
 * @type {adapterFactory}
 * @param {import("../services/address-service").Address} service
 */
export function validateAddress(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    try {
      const shippingAddress = await service.validateAddress(
        order.decrypt().shippingAddress
      );
      const update = await callback(options, { shippingAddress });
      return update;
    } catch (error) {
      console.error({ func: validateAddress.name, error, options });
    }
  };
}
