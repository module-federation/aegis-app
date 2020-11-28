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

  return async function (options) {
    const {
      model: order,
      args: [callback]
    } = options;

    return new Promise(async function (resolve, reject) {
      try {
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
            resolve(order);
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
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
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

    return new Promise(async function (resolve, reject) {
      try {
        await order.listen({
          once: false,
          model: order,
          id: order.orderNo,
          topic: 'orderChannel',
          filter: order.orderNo,
          callback: async function ({
            message,
            subscription
          }) {
            const event = JSON.parse(message);
            console.log('received event...', event);
            const trackingId = event.eventData.trackingId;
            const trackingStatus = event.eventData.trackingStatus;
            const { doResolve, order: newOrder } = await callback(
              options,
              trackingId,
              trackingStatus
            );
            if (doResolve) {
              subscription.unsubscribe();
              resolve(newOrder);
            }
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
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
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

    return new Promise(async function (resolve, reject) {
      try {
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
            const proofOfDelivery = event.eventData.proofOfDelivery;
            const newOrder = await callback(options, proofOfDelivery);
            resolve(newOrder);
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
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  }
}
