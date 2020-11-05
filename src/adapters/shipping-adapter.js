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

  return async function ({ model: order, parms: [callback] }) {
    if (callback) {
      await order.listen({
        topic: 'orderShipped',
        callback: callback,
        model: order,
        filter: order.orderNo,
        id: order.orderNo,
        once: true
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
      order.listen({
        topic: 'orderShipped',
        callback: callback,
        model: order,
        filter: order.orderNo,
        id: order.orderNo,
        once: true
      });
    }
    return service.trackShipment(order.orderNo);
  }
}

/**
 * 
 * @type {adapterFactory}
 */
export function verifyDelivery(service) {
  return async function (orderParam) {
    return service.verifyDelivery(orderParam.model.orderNo);
  }
}