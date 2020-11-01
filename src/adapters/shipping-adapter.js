'use strict'

import { Event } from '../services'

/**
 * @typedef {string|RegExp} topic
 * @callback eventCallback
 * @param {topic} topic
 * @param {*} eventData
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
 *  listen:function(topic,eventCallback)
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
    console.log('shipOrder -> listen: %s', order.orderNo);
    if (callback) {
      await order.listen({
        topic: 'orderShipped',
        callback,
        id: order.orderNo,
      });
    }
    await service.shipOrder({
      creditCard: order.decrypt().creditCardNumber,
      shippingAddress: order.decrypt().shippingAddress,
      billingAddress: order.billingAddress
    });
  }
}

/**
 * @type {adapterFactory}
 */
export function trackShipment(service) {
  return async function ({ model }) {
    return service.trackShipment(model.orderNo);
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