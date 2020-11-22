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
    console.log(shipOrder.name);

    await order.listen({
      once: true,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.orderNo,
      callback: async ({ message }) => {
        const event = JSON.parse(message);
        console.log(event);
        const shipmentId = event.eventData.shipmentId;
        callback({ order, shipmentId, resolve });
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

    await order.listen({
      once: false,
      model: order,
      id: order.orderNo,
      topic: 'orderChannel',
      filter: order.orderNo,
      callback: ({ message }) => {
        const event = JSON.parse(message);
        console.log(event);
        const trackingId = event.eventData.trackingId;
        const trackingStatus = event.eventData.trackingStatus;
        callback({ order, trackingId, trackingStatus, resolve });
      }
    });

    await order.notify('shippingChannel', JSON.stringify({
      eventData: {
        commandArgs: {
          shipmentId: order.shipmentId,
          externalId: order.orderNo,
          trackingId: order.trackingId
        },
        commandName: 'trackShipment',
        replyChannel: 'orderChannel',
      },
      eventType: 'Command',
      eventName: 'trackShipment',
      eventTime: new Date().toUTCString(),
      eventSource: 'orderService'
    }));

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
      filter: order.orderNo,
      callback: ({ message }) => {
        const event = JSON.parse(message);
        console.log(event);
        const proofOfDelivery = event.eventData.proofOfDelivery;
        callback({ order, proofOfDelivery, resolve });
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

    if (options?.resolve) {
      resolve(order);
    }
  }
} 