"use strict";

/**
 * @typedef {import('./event-service').EventMessage} EventMessage
 *
 * @typedef {import('./event-service').CommandEvent} CommandEvent
 *
 * @typedef {{shipTo}} CommandArgs
 * @typedef {function():ShipMessage} shipOrder
 * @typedef {Object} shippingServiceType
 * @property {string} serviceName
 * @property {string} channel
 * @property {shipOrder} shipOrder
 * @property {function():ShipMessage} trackShipment
 * @property {function():ShipMessage} verifyDelivery
 */

/**
 * Shipping service events
 */
export const Shipping = {
  serviceName: "shippingService",
  topic: "shippingChannel",

  /**
   *
   * @param {*} param0
   * @returns {ShipMessage}
   */
  shipOrder({
    shipTo,
    shipFrom,
    lineItems,
    signature,
    externalId,
    requester,
    respondOn,
  }) {
    return {
      eventSource: requester,
      eventTarget: this.serviceName,
      eventType: "command",
      eventName: this.shipOrder.name,
      eventTime: new Date().getTime(),
      eventUuid: externalId,
      eventData: {
        commandName: this.shipOrder.name,
        commandResp: respondOn,
        /**
         * @type {CommandArgs}
         */
        commandArgs: {
          shipTo,
          shipFrom,
          lineItems,
          signature,
          externalId,
        },
      },
    };
  },

  /**
   *
   * @param {*} param0
   * @returns {EventMessage}
   */
  trackShipment({ externalId, shipmentId, trackingId, requester, respondOn }) {
    return {
      eventSource: requester,
      eventTarget: this.serviceName,
      eventType: "command",
      eventName: this.trackShipment.name,
      eventTime: new Date().getTime(),
      eventUuid: externalId,
      eventData: {
        commandName: this.trackShipment.name,
        commandResp: respondOn,
        commandArgs: {
          externalId,
          shipmentId,
          trackingId,
        },
      },
    };
  },

  /**
   *
   * @param {*} param0
   * @returns {EventMessage}
   */
  verifyDelivery({ requester, respondOn, trackingId, externalId }) {
    return {
      eventSource: this.serviceName,
      eventTarget: requester,
      eventType: "command",
      eventName: this.verifyDelivery.name,
      eventTime: new Date().getTime(),
      eventUuid: externalId,
      eventData: {
        commandName: this.verifyDelivery.name,
        commandResp: respondOn,
        commandArgs: {
          trackingId,
          externalId,
        },
      },
    };
  },

  getPayload(func, event) {
    const payloads = {
      [this.shipOrder.name]: {
        shipmentId: event.eventData.shipmentId,
      },
      [this.trackShipment.name]: {
        trackingId: event.eventData.trackingId,
        trackingStatus: event.eventData.trackingStatus,
      },
      [this.verifyDelivery.name]: {
        proofOfDelivery: event.eventData.proofOfDelivery,
      },
    };
    return payloads[func];
  },

  getProperty(event, key) {
    return event.eventData[key];
  },
};
