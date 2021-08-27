"use strict";

import { Event } from "../../src/services/event-service";

function sendEvent({ eventData, eventName }) {
  setTimeout(async () => {
    await Event.notify(
      "orderChannel",
      JSON.stringify({
        eventData,
        eventName,
        eventType: "CommandResponse",
        eventTime: new Date().toUTCString(),
        eventSource: "Inventory",
      })
    );
  }, 5000);
}

export const Inventory = {
  async pickOrder({ externalId, lineItems }) {
    console.log("inventory items");
    console.log(lineItems);
    const pickupAddress = "1234 warehouse dr, dock2";
    sendEvent({
      eventName: "orderPicked",
      eventData: { pickupAddress, externalId },
    });
  },
};
