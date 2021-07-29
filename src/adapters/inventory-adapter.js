"use strict";

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
 * }} InventoryAdapter
 * @typedef {import('../domain/order').Order} Order
 * @typedef {InventoryAdapter} service 
 * @typedef {{
 *  listen:function(topic,RegExp,eventCallback)
 *  notify:function(topic,eventCallback)
 * }} event
 * @callback adapterFactory
 * @param {service} service
 * @param {event} event
 * @returns {function({
 * model:Order,
 * resolve:function()
 * ,args:[
 * eventCallback, 
 * options:{}]
 * })}
   
 }]})} 
 *
 */

/**
 * @type {adapterFactory}
 */
export function pickOrder(service) {
  return function (options) {
    const {
      model: order,
      args: [callback],
    } = options;

    return new Promise(function (resolve, reject) {
      // start listening first then send the event
      return order
        .listen({
          once: true,
          model: order,
          id: order.orderNo,
          topic: "orderChannel",
          filters: [order.orderNo, "orderPicked", "warehouse_addr"],
          callback: async ({ message }) => {
            try {
              const event = JSON.parse(message);
              console.log("recieved event: ", event);
              const pickupAddress = event.eventData.warehouse_addr;
              const newOrder = await callback(options, { pickupAddress });
              resolve(newOrder); // hold promise until we get an answer
            } catch (error) {
              reject(error);
            }
          },
        })
        .then(() => {
          return order.notify(
            "inventoryChannel",
            JSON.stringify({
              eventType: "Command",
              eventTime: new Date().toUTCString(),
              eventSource: "orderService",
              eventData: {
                replyChannel: "orderChannel",
                commandName: "pickOrder",
                commandArgs: {
                  lineItems: order.orderItems,
                  externalId: order.orderNo,
                },
              },
            })
          );
        })
        .catch((reason) => {
          throw new Error(reason);
        });
    });
  };
}
