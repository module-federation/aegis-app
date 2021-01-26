"use strict";

/**
 * @callback portCallback
 * @param {{options:{}}}
 * @param {{payload:{[key]:string}}}
 */

/**
 * @callback eeventCallback
 * @param {string} message
 * @param {{
 *  unsubscribe:function()
 * }} subscription
 */

/**
 * @typedef {import('../models/order').Order} Order
 */

/**
 * @typedef {import("../services/shipping-service").shippingService} shippingService
 */

/**
 * @typedef {{
 *  listen:function(topic,RegExp,portCallback)
 *  notify:function(topic,eventCallback)
 * }} event
 */

/**
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order,args:[portCallback]}):Order}
 */

const respondOn = "orderChannel";
const requester = "orderService";

/**
 *
 * @param {import('../services/shipping-service').shippingService} service
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
        .catch(error => {
          throw new Error(error);
        });
    });
  };
}

/**
 * @param {import('../services/shipping-service').shippingService} service
 * @type {adapterFactory}
 */
export function trackShipment(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    /**
     *
     * @param {*} resolve
     * @param {*} reject
     * @returns {eventCallback}
     */
    function trackShipmentCallback(resolve, reject) {
      return async function ({ message, subscription }) {
        try {
          const event = JSON.parse(message);
          console.log("received event...", event);
          const payload = service.getPayload(trackShipment.name, event);
          const updated = await callback(options, payload);
          if (updated.trackingStatus === "orderDelivered") {
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
        .catch(error => {
          throw new Error(error);
        });
    });
  };
}

/**
 * @param {import('../services/shipping-service').shippingService} service
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
        .catch(error => {
          throw new Error(error);
        });
    }).catch(error => {
      throw new Error(error);
    });
  };
}
