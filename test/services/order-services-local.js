'use strict'

const OrderService = require('../../src/services/order-service').OrderService;

(async () => {
  const orderInfo = {
    customerInfo: 'user1',
    billingAddress: '9612 Park Ave S, Bloomington, MN 55408',
    shippingAddress: '9612 Park Ave S, Bloomington, MN 55408',
    creditCardNumber: '378282246310005',
    local: true
  }
  const os = new OrderService(orderInfo);
  let orderId = null;
  orderId = await os.addOrderItem('item1', 90.22)
    .addOrderItem('item2', 87.60)
    .createOrder()
    .then(os => os.orderId)
    .catch(e => console.error(e.message));
  console.log(orderId);
})();