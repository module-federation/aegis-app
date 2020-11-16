'use strict'

/**
 * @typedef {string|RegExp} topic
 * @callback eventCallback
 * @param {string} message
 * @param {{
 *  getModel:function():object,
 *  unsubscribe:function()
 * }} subscription
 * @typedef {eventCallback} shipOrderType
 * @param topic,
 * @param eventCallback
 * @typedef {{
 *  shipOrder:shipOrderType,
 *  trackShipment:function(),
 *  verifyDelivery:function()
 * }} ShippingAdapter
 * @typedef {import('../models/order').Order} Order
 * @typedef {ShippingAdapter} service 
 * @typedef {{
 *  listen:function(topic,RegExp,eventCallback)
 *  notify:function(topic,eventCallback)
 * }} event
 * @callback adapterFactory
 * @param {service} service
 * @param {event} event
 * @returns {function({model:Order,parms:[eventCallback]})} 
 */

/**
 * 
 * @type {adapterFactory}
 */
export function shipOrder(service) {

  return async function ({ model: order, resolve, args: [callback, options] }) {

    await order.listen({
      once: true,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.orderNo,
      callback: async ({ message, subscription }) => {
        const event = JSON.parse(message);
        console.log(event);
        const eventName = event.eventName;
        const shipmentId = event.eventData.shipmentId;
        callback({ order, shipmentId, eventName, resolve });
      }
    });

    await service.shipOrder({
      shipTo: order.decrypt().shippingAddress,
      shipFrom: order.pickupAddress,
      lineItems: order.orderItems,
      externalId: order.orderNo
    });

    if (options?.resolve) {
      resolve(order);
    }
  }
}

/**
 * @type {adapterFactory}
 */
export function trackShipment(service) {
  return async function ({ model: order, resolve, args: [callback, options] }) {

    console.log('order.shipmentId %s', order.shipmentId);
    await order.listen({
      once: false,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.shipmentId,
      callback: ({ message }) => {
        const event = JSON.parse(message);
        console.log(event);
        const trackingId = event.eventData.trackingId;
        const trackingStatus = event.eventData.trackingStatus;
        callback({ order, trackingId, trackingStatus, resolve });
      }
    });

    await service.trackShipment(order.shipmentId);

    if (options?.resolve) {
      resolve(order);
    }
  }
}

/**
 * 
 * @type {adapterFactory}
 */
export function verifyDelivery(service) {
  return async function ({ model: order, resolve, args: [callback, options] }) {

    order.listen({
      once: true,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.trackingId,
      callback: ({ message }) => {
        const event = JSON.parse(message);
        console.log(event);
        const eventName = event.eventData.eventName;
        const proofOfDelivery = event.eventData.proofOfDelivery;
        callback({ order, proofOfDelivery, eventName, resolve });
      }
    });

    await service.verifyDelivery(order.trackingId);

    if (options?.resolve) {
      resolve(order);
    }
  }
} 