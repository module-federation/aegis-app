"use strict";

var assert = require("assert");
const publishEvent = require("../../src/services/webswitch").publishEvent;

describe("#webswitch", function () {
  it("should send", async function () {
    const event = {eventName:"test", model:{modelName:"test",modelId:"test"}}
    webswitch(event)

    console.log();
  });
});

describe("#trackShipment", function () {
  it("should create order with correct total", async function () {
    const payload = Shipping.trackShipment({
      externalId: 123,
      trackingId: 345,
      shipmentId: 678,
      requester: "orderService",
      respondOn: "orderChannel",
    });
    console.log(payload);
  });
});
