"use strict";

/**
 * @typedef {import('./event-service').EventMessage} EventMessage
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
   * @returns {EventMessage}
   */
  shipOrder({ shipTo, shipFrom, lineItems, externalId, requester, respondOn }) {
    return {
      eventSource: requester,
      eventTarget: this.serviceName,
      eventType: "command",
      eventName: this.shipOrder.name,
      eventTime: new Date().toUTCString(),
      eventUuid: "",
      eventData: {
        commandName: "shipOrder",
        commandResp: respondOn,
        commandArgs: {
          shipTo,
          shipFrom,
          lineItems,
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
      eventUuid: "",
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
      eventUuid: "",
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
