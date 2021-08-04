"use strict";

/**
 * @callback portCallback
 * @param {{options:{}}}
 * @param {{payload:{[key]:string}}}
 */

/**
 * @typedef {string} message
 * @callback eventCallback
 * @param {string} message
 * @param {{
 *  unsubscribe:function(),
 *  filter:function(message):boolean
 * }} subscription
 */

/**
 * @typedef {import('../domain/order').Order} Order
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

const ORDER_SERVICE = "orderService";
const ORDER_TOPIC = "orderChannel";

const handleError = (error, reject = null, func = null) => {
  console.error({ file: __filename, func, error });
  if (reject) reject(error);
};

/**
 * Call `shipOrder` to request shipment of the order items.
 * @param {import('../services/shipping-service').shippingService} service
 * @type {adapterFactory}
 * @returns {function(options):Promise<Order>}
 * Return a promise that is resolved once we receive
 * a response message from the shipping service. Start
 * listening for the response first and then send the
 * request message.
 *
 */
export function shipOrder(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    /**
     * Called by the event listener when the shipOrder
     * response message arrives. Resolve the promise
     * the caller has been waiting on since we sent
     * the request message.
     * @param {function(Order)} resolve
     * @param {function(Error)} reject
     * @returns {function(message):Promise<Order>}
     */
    function shipOrderCallback(resolve, reject) {
      return async function ({ message }) {
        try {
          const event = JSON.parse(message);
          console.debug("received event... ", event);
          const payload = service.getPayload(shipOrder.name, event);
          const updated = await callback(options, payload);
          resolve(updated);
        } catch (error) {
          handleError(error, reject, shipOrderCallback.name);
        }
      };
    }

    /**
     * Send the shipOrder event to the shipping service.
     */
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
            requester: ORDER_SERVICE,
            respondOn: ORDER_TOPIC,
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
          topic: ORDER_TOPIC,
          filters: [order.orderNo, "orderShipped", "shipmentId"],
          callback: shipOrderCallback(resolve, reject),
        })
        .then(callShipOrder)
        .catch(handleError);
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
     * @param {function(Order)} resolve resolve the promise
     * @param {function(Error)} reject reject promise
     */
    function trackShipmentCallback(resolve, reject) {
      return async function ({ message, subscription }) {
        try {
          const event = JSON.parse(message);
          console.debug("received event...", event);
          const payload = service.getPayload(trackShipment.name, event);
          const updated = await callback(options, payload);
          if (updated.trackingStatus === "orderDelivered") {
            subscription.unsubscribe();
            resolve(updated);
          }
        } catch (error) {
          handleError(error, reject, trackShipment.name);
        }
      };
    }

    function callTrackShipment() {
      return order.notify(
        service.topic,
        JSON.stringify(
          service.trackShipment({
            shipmentId: order.shipmentId,
            externalId: order.orderNo,
            requester: ORDER_SERVICE,
            respondOn: ORDER_TOPIC,
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
          topic: ORDER_TOPIC,
          filters: [order.orderNo, "trackingId", "trackingStatus"],
          callback: trackShipmentCallback(resolve, reject),
        })
        .then(callTrackShipment)
        .catch(handleError);
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

    /**
     *
     * @param {function(Order)} resolve
     * @param {function(Error)} reject
     * @returns
     */
    function verifyDeliveryCallback(resolve, reject) {
      return async function ({ message }) {
        try {
          const event = JSON.parse(message);
          console.debug("received event...", event);
          const payload = service.getPayload(verifyDelivery.name, event);
          const updated = await callback(options, payload);
          resolve(updated);
        } catch (e) {
          handleError(e, reject, verifyDeliveryCallback.name);
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
            requester: ORDER_SERVICE,
            respondOn: ORDER_TOPIC,
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
        .catch(handleError);
    });
  };
}
