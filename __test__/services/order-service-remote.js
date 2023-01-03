"use strict";

var assert = require("assert");
const OrderService = require("../../src/services/order-service").OrderService;

describe("OrderService", function () {
  describe("#createOrder()", function () {
    it("should create and submit order", async function () {
      const orderInfo = {
        firstName: "Dr.",
        lastName: "Dre",
        email: "dre@mail.com",
        billingAddress: "9612 Park Ave S, Bloomington, MN 55408",
        shippingAddress: "9612 Park Ave S, Bloomington, MN 55408",
        creditCardNumber: "378282246310005",
      };
      const os = new OrderService();
      const status = await os
        .addOrder(orderInfo)
        .addOrderItem("item1", 90.99)
        .addOrderItem("item2", 87.6, 2)
        .createOrder()
        .then(os => os.submitOrder())
        .then(os => os.getOrder())
        .then(order => order.orderStatus)
        .catch(e => console.error(e));
      assert.match(status, /APPROVED|SHIPPING|COMPLETED/);
    });
  });
});

async function processOrder(fn, ...args) {
  const os = new OrderService();
  await os[fn](...args).catch(e => console.error(e.message));
}

const disableTests = true;

(async () => {
  if (disableTests) return;

  const orderInfo = {
    customerInfo: "user1",
    billingAddress: "223",
    shippingAddress: "12343",
    creditCardNumber: "378282246310005",
  };
  const os = new OrderService();

  const orderId = (
    await os.addOrder(orderInfo).addOrderItem("item1", 2343.99).createOrder()
  ).then(os => os.orderId);

  await processOrder("submitOrder", orderId);
  await processOrder("shipOrder", orderId);
  await processOrder("deliverOrder", "proof", orderId);
  await processOrder("cancelOrder", "reason", orderId);
})();
