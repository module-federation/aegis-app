"use strict";

/**
 * @typedef {import('./event-service').EventMessage} EventMessage
 *
 * @typedef {import('./event-service').CommandEvent} CommandEvent
 *
 * @typedef {{shipTo}} CommandArgs
 *
 * @typedef {Object} shippingServiceType
 * @property {string} serviceName
 * @property {string} channel
 * @property {function():ShipMessage} shipOrder
 * @property {function():ShipMessage} trackShipment
 * @property {function():ShipMessage} verifyDelivery
 */

/**
 * Shipping service events
 */
export const Shipping = {
  serviceName: "shippingService",
  channel: "shippingChannel",

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
      eventTime: new Date().toUTCString(),
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
      eventTime: new Date().toUTCString(),
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

  getProperty(event, key) {
    return event.eventData[key];
  },

  shipmentId(event) {
    return event.eventData[this.shipmentId.name];
  },

  trackingId(event) {
    return event.eventData[this.trackingId.name];
  },

  trackingStatus(event) {
    return event.eventData[this.trackingStatus.name];
  },

  proofOfDelivery(event) {
    return event.eventData[this.proofOfDelivery.name];
  },
};
