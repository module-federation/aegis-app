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

import { ORDERTOPIC } from './event-adapter'


/**
 * 
 * @type {adapterFactory}
 */
export function shipOrder(service) {
  return async function ({ model: order, parms: [callback] }) {
    if (callback) {
      await order.listen({
        topic: ORDERTOPIC,
        once: true,
        model: order,
        id: order.orderNo,
        filter: order.orderNo,
        callback: ({ message, subscription }) => {
          console.info({
            event: 'order shipped',
            message,
            subscribers: subscription.getSubscriptions()
          });
          return callback({ message, order: subscription.getModel() });
        },
      });
    }
    await service.shipOrder({
      creditCard: order.decrypt().creditCardNumber,
      shippingAddress: order.decrypt().shippingAddress,
      items: order.orderItems,
      orderNum: order.orderNo
    });
  }
}

/**
 * @type {adapterFactory}
 */
export function trackShipment(service) {
  return async function ({ model: order, parms: [callback] }) {
    if (callback) {
      await order.listen({
        topic: ORDERTOPIC,
        once: true,
        model: order,
        filter: order.orderNo,
        callback: ({ message, subscription }) => {
          console.info({
            event: 'orderArrived',
            message,
            subscribers: subscription.getSubscriptions()
          });
          return callback({ message, order: subscription.getModel() });
        },
      });
    }
    const trackingId = await service.trackShipment(order.orderNo);
    return order.update({ trackingId });
  }
}

/**
 * 
 * @type {adapterFactory}
 */
export function verifyDelivery(service) {
  return async function ({ model: order, parms: [callback] }) {
    if (callback) {
      await order.listen({
        topic: ORDERTOPIC,
        once: true,
        model: order,
        filter: order.orderNo,
        callback: ({ message, subscription }) => {
          console.info({
            event: 'proofOfDelivery',
            message,
            subscribers: subscription.getSubscriptions()
          });
          return callback({
            response: JSON.parse(message),
            order: subscription.getModel()
          });
        },
      });
    }
    return service.verifyDelivery(order.trackingId);
  }
}