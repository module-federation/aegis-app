"use strict";

/**
 * @typedef {import('../domain/order').Order} Order
 * @typedef
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order,parms:any[]})}
 */

/**
 * @type {adapterFactory}
 * @param {import("../services/payment-service").PaymentService} service
 */
export function authorizePayment(service) {
  return async function (options) {
      const {
        model: order,
        args: [callback],
      } = options;

      const paymentAuthorization = await service.authorizePayment(
        order.orderNo,
        12.0,
        "src",
        "ibm",
        false
      );
      return callback(options, { paymentAuthorization });
  };
}

/**
 * @type {adapterFactory}
 */
export function completePayment(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;
    const confirmationCode = await service.completePayment(order);
    const newOrder = await callback(options, { confirmationCode });
    return newOrder;
  };
}
/**
 * @type {adapterFactory}
 */
export function refundPayment(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;
    await service.refundPayment(order);
    const newOrder = await callback(options);
    return newOrder;
  };
}
