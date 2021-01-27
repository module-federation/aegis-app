"use strict";

/**
 * @typedef {import('../models/order').Order} Order
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
  return function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    return service
      .authorizePayment(
        order.orderNo,
        order.orderTotal,
        "orderService",
        order.customerId,
        false
      )
      .then(paymentAuthorization => callback(options, { paymentAuthorization }))
      .then(model => model)
      .catch(error => console.error(error));
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
