"use strict";

import { EventDispatcher } from "./event-dispatcher";
import { uuid } from "./domain/utils";

export const Registry = {
  eventNames: {
    shipOrder: "orderShipped",
    trackShipment: "outForDelivery",
    verifyDelivery: "deliveryVerified",
  },

  sendEvent({ emitEvent, topic, eventData, eventSource, eventName }) {
    console.log("Sending event...");
    console.log({ emitEvent, topic, eventData, eventSource, eventName });
    setTimeout(async () => {
      await emitEvent(
        topic,
        JSON.stringify({
          eventData,
          eventName,
          eventTime: new Date().toUTCString(),
          eventType: "commandResponse",
          eventSource: eventSource,
        })
      );
    }, 5000);
  },

  generateShippingEventData(event, externalId) {
    const trackingId = uuid();
    const shipmentId = trackingId;
    const proofOfDelivery = `http://shipping.service.com?proof=${trackingId}`;
    const eventData = { externalId };
    if (event.eventName === "shipOrder") {
      return { ...eventData, shipmentId };
    }
    if (event.eventName === "trackShipment") {
      return { ...eventData, trackingId, trackingStatus: "outForDelivery" };
    }
    if (event.eventName === "verifyDelivery") {
      return { ...eventData, proofOfDelivery };
    }
  },

  generateShippingMessage(emitEvent, event, externalId) {
    return {
      emitEvent,
      topic: event.eventData.commandResp,
      eventData: this.generateShippingEventData(event, externalId),
      eventName: this.eventNames[event.eventName],
      eventSource: "shippingService",
    };
  },

  inventoryCallbackFactory() {
    function inventoryCallback({ message, emitEvent }) {
      const event = JSON.parse(message);
      const warehouseAddress = /*null;*/ "1234 warehouse dr, dock 2";
      const externalId = event.eventData.commandArgs.externalId;
      const eventName = /*'outOfStock';*/ "orderPicked";
      this.sendEvent({
        emitEvent,
        topic: event.eventData.replyChannel,
        eventName,
        eventData: { warehouse_addr: warehouseAddress, externalId },
        eventSource: "inventoryService",
      });
    }
    return inventoryCallback.bind(this);
  },

  shippingCallbackFactory() {
    function shippingCallback({ message, emitEvent }) {
      const event = JSON.parse(message);
      const externalId = event.eventData.commandArgs.externalId;
      const _message = this.generateShippingMessage(
        emitEvent,
        event,
        externalId
      );
      this.sendEvent(_message);

      if (event.eventName === "trackShipment") {
        const eventData = {
          ..._message.eventData,
          trackingStatus: "orderDelivered",
        };
        setTimeout(
          () =>
            this.sendEvent({
              ..._message,
              eventData,
              eventName: "orderDelivered",
            }),
          7000
        );
      }
    }
    return shippingCallback.bind(this);
  },
};

const dispatcher = new EventDispatcher();

dispatcher.registerCallback(
  "inventoryChannel",
  Registry.inventoryCallbackFactory()
);

dispatcher.registerCallback(
  "shippingChannel",
  Registry.shippingCallbackFactory()
);

export default dispatcher;
