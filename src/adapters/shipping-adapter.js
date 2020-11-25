'use strict'

import handlePortOptions from '../models/handle-port-options';

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

  return async function (options) {
    console.log(shipOrder.name);

    const {
      model: order,
      args: [callback]
    } = options;

    await order.listen({
      once: true,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.orderNo,
      callback: async ({
        message
      }) => {
        const event = JSON.parse(message);
        console.log('received event...', event);
        const shipmentId = event.eventData.shipmentId;
        await callback(options, shipmentId);
      }
    });

    await order.notify('shippingChannel', JSON.stringify({
      eventType: 'Command',
      eventName: 'shipOrder',
      eventTime: new Date().toUTCString(),
      eventData: {
        replyChannel: 'orderChannel',
        commandName: 'shipOrder',
        commandArgs: {
          shipTo: order.decrypt().shippingAddress,
          shipFrom: order.pickupAddress,
          lineItems: order.orderItems,
          externalId: order.orderNo
        }
      },
      eventSource: 'orderService'
    }));

    return handlePortOptions(options);
  }
}

/**
 * @type {adapterFactory}
 */
export function trackShipment(service) {

  return async function (options) {
    const {
      model: order,
      args: [callback]
    } = options;

    await order.listen({
      once: false,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.orderNo,
      callback: async function ({
        message
      }) {
        const event = JSON.parse(message);
        console.log('received event...', event);
        const trackingId = event.eventData.trackingId;
        const trackingStatus = event.eventData.trackingStatus;
        await callback(options, trackingId, trackingStatus);
      }
    });

    await order.notify('shippingChannel', JSON.stringify({
      eventType: 'Command',
      eventName: 'trackShipment',
      eventTime: new Date().toUTCString(),
      eventSource: 'orderService',
      eventData: {
        replyChannel: 'orderChannel',
        commandName: 'trackShipment',
        commandArgs: {
          shipmentId: order.shipmentId,
          externalId: order.orderNo,
          trackingId: order.trackingId
        },
      },
    }));

    return handlePortOptions(options);
  }
}

/**
 * 
 * @type {adapterFactory}
 */
export function verifyDelivery(service) {
  return async function (options) {
    const {
      model: order,
      args: [callback]
    } = options;

    order.listen({
      once: true,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.orderNo,
      callback: async ({
        message
      }) => {
        const event = JSON.parse(message);
        console.log('received event...', event);
        const proofOfDelivery = event.eventData.proofOfDelivery;
        await callback(options, proofOfDelivery);
      }
    });

    await order.notify('shippingChannel', JSON.stringify({
      eventData: {
        commandArgs: {
          trackingId: order.trackingId,
          externalId: order.orderNo
        },
        replyChannel: 'orderChannel',
        commandName: 'verifyDelivery',
      },
      eventType: 'Command',
      eventName: 'verifyDelivery',
      eventTime: new Date().toUTCString(),
      eventSource: 'orderService'
    }));

    return handlePortOptions(options);
  }
}
