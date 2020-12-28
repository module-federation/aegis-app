"use strict";

/**
 * @typedef {string|RegExp} topic
 * @callback eventCallback
 * @param {string} message
 * @param {{
 *  unsubscribe:function()
 * }} subscription
 * @typedef {Object} shipOrderServiceType
 * @property {string} serviceName
 * @property {string} channel
 * @property {function():function():import('../services/event-service').EventMessage} shipOrder
 * @property {function():function():import('../services/event-service').EventMessage} trackShipment
 * @property {function():function():import('../services/event-service').EventMessage} verifyDelivery
 *
 * @typedef {{
 *  shipOrder:function(),
 *  trackShipment:function(),
 *  verifyDelivery:function()
 * }} ShippingAdapter
 * @typedef {import('../models/order').Order} Order
 * @typedef {shipOrderServiceType} service
 * @typedef {{
 *  listen:function(topic,RegExp,eventCallback)
 *  notify:function(topic,eventCallback)
 * }} event
 * @callback adapterFactory
 * @param {service} service
 * @param {event} event
 * @returns {function({model:Order,parms:[eventCallback]})}
 */

const respondOn = "orderChannel";
const requester = "orderService";

/**
 *
 * @param {}
 * @type {adapterFactory}
 */
export function shipOrder(service) {
  return async function shipOrder(options) {
    const {
      model: order,
      args: [callback],
    } = options;

    return new Promise(function (resolve, reject) {
      return order
        .listen({
          once: true,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filter: order.orderNo,

          callback: async ({ message }) => {
            try {
              const event = JSON.parse(message);
              console.log("received event... ", event);

              const shippingId = service.shipmentId(event);
              const newOrder = await callback(options, shippingId);
              resolve(newOrder);
            } catch (error) {
              reject(error);
            }
          },
        })
        .then(() => {
          return order.notify(
            service.channel,
            JSON.stringify(
              service.shipOrder({
                shipTo: order.decrypt().shippingAddress,
                shipFrom: order.pickupAddress,
                lineItems: order.orderItems,
                signature: order.signatureRequired,
                externalId: order.orderNo,
                requester,
                respondOn,
              })
            )
          );
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  };
}

/**
 * @type {adapterFactory}
 */
export function trackShipment(service) {
  return async function trackShipmentAsync(options) {
    const {
      model: order,
      args: [callback],
    } = options;

    return new Promise(function (resolve, reject) {
      return order
        .listen({
          once: false,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filter: order.orderNo,

          callback: async function ({ message, subscription }) {
            try {
              const event = JSON.parse(message);
              console.log("received event...", event);

              const trackingId = service.trackingId(event);
              const trackingStatus = service.trackingStatus(event);
              const { done, order: newOrder } = await callback(
                options,
                trackingId,
                trackingStatus
              );

              if (done) {
                subscription.unsubscribe();
                resolve(newOrder);
              }
            } catch (error) {
              reject(error);
            }
          },
        })
        .then(() => {
          return order.notify(
            service.channel,
            JSON.stringify(
              service.trackShipment({
                trackingId: order.trackingId,
                shipmentId: order.shipmentId,
                externalId: order.orderNo,
                requester,
                respondOn,
              })
            )
          );
        });
    }).catch((error) => {
      throw new Error(error);
    });
  };
}

/**
 *
 * @type {adapterFactory}
 */
export function verifyDelivery(service) {
  return async function verifyDeliveryAsync(options) {
    const {
      model: order,
      args: [callback],
    } = options;

    return new Promise(function (resolve, reject) {
      return order
        .listen({
          once: true,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filter: order.orderNo,

          callback: async ({ message }) => {
            try {
              const event = JSON.parse(message);
              console.log("received event...", event);

              const proofOfDelivery = service.proofOfDelivery(event);
              const newOrder = await callback(options, proofOfDelivery);
              resolve(newOrder);
            } catch (e) {
              reject(e);
            }
          },
        })
        .then(() => {
          return order.notify(
            service.channel,
            JSON.stringify(
              service.verifyDelivery({
                trackingId: order.trackingId,
                externalId: order.orderNo,
                requester,
                respondOn,
              })
            )
          );
        });
    }).catch((error) => {
      throw new Error(error);
    });
  };
}
