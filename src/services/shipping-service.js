"use strict";

/**
 * @typedef {import('../adapters/event-adapter').EventMessage} EventMessage
 */

/**
 * @typedef {import('../adapters/event-adapter').CommandEvent} CommandEvent
 */

/**
 * @typedef {Object} shippingService formats and parses shipping event messages
 * @property {string} serviceName - programmatic service name in eventSource/Target
 * @property {string} topic - event topic "shippingChannel" when sending messasges
 * @property {function():EventMessage} shipOrder - request label and pickup of order
 * @property {function():EventMessage} trackShipment - report on location/status of parcel
 * @property {function():EventMessage} verifyDelivery - ensure customer recieved parcel
 * @property {function():EventMessage} returnShipment - return to sender if refunding
 * @property {function(EventMessage):{[key]:string}} getPayload - extract payload
 */

function createEventMessage({ requester, service, type, name, id, data }) {
  return {
    eventSource: requester,
    eventTarget: service,
    eventType: type,
    eventName: name,
    eventTime: new Date().getTime(),
    eventUuid: id,
    eventData: data,
  };
}

function createCommandEvent(name, topic, ...args) {
  return {
    commandName: name,
    commandResp: topic,
    commandArgs: { ...args },
  };
}

/**
 * Shipping service events
 * @type {shippingService}
 */
export const Shipping = {
  serviceName: "shippingService",
  topic: "shippingChannel",

  /**
   *
   * @param {*} param0
   * @returns {shipMessage}
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
    return createEventMessage({
      requester,
      service: this.serviceName,
      type: "command",
      name: this.shipOrder.name,
      id: externalId,
      data: createCommandEvent(
        this.shipOrder.name,
        respondOn,
        shipTo,
        shipFrom,
        lineItems,
        signature,
        externalId
      ),
    });
  },

  /**
   *
   * @param {*} param0
   * @returns {EventMessage}
   */
  trackShipment({ externalId, shipmentId, trackingId, requester, respondOn }) {
    return createEventMessage({
      requester,
      service: this.serviceName,
      type: "command",
      name: this.shipOrder.name,
      id: externalId,
      data: createCommandEvent(
        this.shipOrder.name,
        respondOn,
        externalId,
        shipmentId,
        trackingId
      ),
    });
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

  returnShipment() {},

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
