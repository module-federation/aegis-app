"use strict";

var assert = require("assert");
const Shipping = require("../../src/services/shipping-service").Shipping;

describe("#shipOrder", function () {
  it("should create order with correct total", async function () {
    const payload = Shipping.shipOrder({
      shipTo: "shipto",
      shipFrom: "shipFrom",
      lineItems: "lineItems",
      signature: "sig",
      externalId: "id",
      requester: "req",
      respondOn: "resp",
    });

    console.log(payload);
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
