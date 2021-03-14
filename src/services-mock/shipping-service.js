"use strict";

/**
 * @typedef {import('../adapters/event-adapter').EventMessage} EventMessage
 */

/**
 * @typedef {import('../adapters/event-adapter').CommandEvent} CommandEvent
 */

/**
 * @callback shipOrder
 * @param {string} shipTo
 * @param {string} shipFrom
 * @param {string} lineItems
 * @param {string} signature
 * @param {string} externalId
 * @param {string} requester
 * @param {string} respondOn
 * @returns {EventMessage}
 */

/**
 * @callback trackShipment
 * @param {string} shipmentId
 * @param {string} externalId
 * @param {string} requester
 * @param {string} respondOn
 * @returns {EventMessage}
 */

/**
 * @typedef {string} functionName
 */

/**
 * @typedef {Object} shippingService formats and parses shipping event messages
 * @property {string} serviceName - programmatic service name in eventSource/Target
 * @property {string} topic - event topic "shippingChannel" when sending messasges
 * @property {shipOrder} shipOrder - format event message requesting shipping label and pickup of order
 * @property {trackShipment} trackShipment - report on location/status of parcel
 * @property {function():EventMessage} verifyDelivery - ensure customer recieved parcel
 * @property {function():EventMessage} returnShipment - return to sender if refunding
 * @property {function(functionName,EventMessage):{[key]:string}} getPayload - extract payload
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

function createCommandEvent(name, topic, args) {
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
      data: createCommandEvent(this.shipOrder.name, respondOn, {
        shipTo,
        shipFrom,
        lineItems,
        signature,
        externalId,
      }),
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
      name: this.trackShipment.name,
      id: externalId,
      data: createCommandEvent(this.trackShipment.name, respondOn, {
        externalId,
        shipmentId,
        trackingId,
      }),
    });
  },

  /**
   *
   * @param {*} param0
   * @returns {EventMessage}
   */
  verifyDelivery({ requester, respondOn, trackingId, externalId }) {
    return createEventMessage({
      requester,
      service: this.serviceName,
      type: "command",
      name: this.verifyDelivery.name,
      id: externalId,
      data: createCommandEvent(this.verifyDelivery.name, respondOn, {
        externalId,
        trackingId,
      }),
    });
  },

  returnShipment({ requester, respondOn, shipmentId, externalId }) {
    return createEventMessage({
      requester,
      service: this.serviceName,
      type: "command",
      id: externalId,
      name: this.returnShipment.name,
      data: createCommandEvent(this.returnShipment, respondOn, {
        shipmentId,
        externalId,
      }),
    });
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
