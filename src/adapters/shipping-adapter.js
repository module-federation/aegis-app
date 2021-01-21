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
 * @property {string} toppic
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
 * @param {import('../services/shipping-service').shipOrder}
 * @type {adapterFactory}
 */
export function shipOrder(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    console.log({ func: shipOrder.name, ...service, options });

    function shipOrderCallback(resolve, reject) {
      return async function ({ message }) {
        try {
          const event = JSON.parse(message);
          console.log("received event... ", event);
          const payload = service.getPayload(shipOrder.name, event);
          const updated = await callback(options, payload);
          resolve(updated);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      };
    }

    function callShipOrder() {
      return order.notify(
        service.topic,
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
    }

    return new Promise(function (resolve, reject) {
      return order
        .listen({
          once: true,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filters: [order.orderNo, "orderShipped", "shipmentId"],
          callback: shipOrderCallback(resolve, reject),
        })
        .then(callShipOrder)
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
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    function trackShipmentCallback(resolve, reject) {
      return async function ({ message, subscription }) {
        try {
          const event = JSON.parse(message);
          console.log("received event...", event);
          const payload = service.getPayload(trackShipment.name, event);
          const { done, order: updated } = await callback(options, payload);
          if (done) {
            subscription.unsubscribe();
            resolve(updated);
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      };
    }

    function callTrackShipment() {
      return order.notify(
        service.topic,
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
    }

    return new Promise(async function (resolve, reject) {
      return order
        .listen({
          once: false,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filters: [order.orderNo, "trackingStatus", "trackingId"],
          callback: trackShipmentCallback(resolve, reject),
        })
        .then(callTrackShipment)
        .catch((error) => {
          throw new Error(error);
        });
    });
  };
}

/**
 *
 * @type {adapterFactory}
 */
export function verifyDelivery(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    function verifyDeliveryCallback(resolve, reject) {
      return async function ({ message }) {
        try {
          const event = JSON.parse(message);
          console.log("received event...", event);
          const payload = service.getPayload(verifyDelivery.name, event);
          const updated = await callback(options, payload);
          resolve(updated);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      };
    }

    function callVerifyDelivery() {
      return order.notify(
        service.topic,
        JSON.stringify(
          service.verifyDelivery({
            trackingId: order.trackingId,
            externalId: order.orderNo,
            requester,
            respondOn,
          })
        )
      );
    }

    return new Promise(async function (resolve, reject) {
      return order
        .listen({
          once: true,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filters: [order.orderNo, "deliveryVerified", "proofOfDelivery"],
          callback: verifyDeliveryCallback(resolve, reject),
        })
        .then(callVerifyDelivery)
        .catch((error) => {
          throw new Error(error);
        });
    }).catch((error) => {
      throw new Error(error);
    });
  };
}
