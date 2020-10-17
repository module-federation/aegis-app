'use strict'

const disableTests = true;

const OrderService = require('./order-service').OrderService;

const orderInfo = {
  customerInfo: 'user1',
  billingAddress: '9612 Park Ave S, Bloomington, MN 55408',
  shippingAddress: '9612 Park Ave S, Bloomington, MN 55408',
  creditCardNumber: '378282246310005'
}
const os = new OrderService(orderInfo);
os.addOrderItem('item1', 90.22)
  .addOrderItem('item2', 87.60)
  .createOrder()
  .then(os => console.log(`success: order ${os.orderId}`))
  .catch(e => console.error(e.message));




function runGoodTest() {
  const orderInfo = {
    customerInfo: 'user1',
    billingAddress: '223',
    shippingAddress: '12343',
    creditCardNumber: '378282246310005'
  }
  const os = new OrderService(orderInfo);
  os.addOrderItem('item1', 90.22)
    .addOrderItem('item2', 87.60)
    .createOrder()
    .then(os => os.submitOrder())
    .then(os => os.shipOrder())
    .then(os => os.deliverOrder({ file: 'sig.img', url: '' }))
    .then(os => console.log(`Success: ${os.orderId} complete`))
    .catch(e => console.error(e.message));
}

function runOutOfOrder() {
  const orderInfo = {
    customerInfo: 'user1',
    billingAddress: '223',
    shippingAddress: '12343',
    creditCardNumber: '378282246310005'
  }
  const os = new OrderService(orderInfo);
  os.addOrderItem('item1', 90.22)
    .addOrderItem('item2', 87.60)
    .createOrder()
    .then(os => os.shipOrder())
    .then(os => os.submitOrder())
    .then(os => os.deliverOrder({ file: 'sig.img', url: '' }))
    .then(os => console.log(`Success: ${os.orderId} complete`))
    .catch(e => console.error(e.message));
}

function runBadCredCardTest() {
  const orderInfo = {
    customerInfo: 'user1',
    billingAddress: '223',
    shippingAddress: '12343',
    creditCardNumber: '37828224631000'
  }
  const os = new OrderService(orderInfo);
  os.addOrderItem('item1', 90.22)
    .addOrderItem('item2', 87.60)
    .createOrder()
    .then(os => os.submitOrder())
    .then(os => os.shipOrder())
    .then(os => os.deliverOrder({ file: 'sig.img', url: '' }))
    .then(os => console.log(`Success: ${os.orderId} complete`))
    .catch(e => console.error(e.message));
}

function runExceedMaxOrderTest() {
  const orderInfo = {
    customerInfo: 'user1',
    billingAddress: '223',
    shippingAddress: '12343',
    creditCardNumber: '378282246310005'
  }
  const os = new OrderService(orderInfo);
  os.addOrderItem('item1', 90.22)
    .addOrderItem('item2', 870000.60)
    .createOrder()
    .then(os => os.submitOrder())
    .then(os => os.shipOrder())
    .then(os => os.deliverOrder({ file: 'sig.img', url: '' }))
    .then(os => console.log(`Success: ${os.orderId} complete`))
    .catch(e => console.error(e.message));
}

function runMissingBillAddrTest() {
  const orderInfo = {
    customerInfo: 'user1',
    // billingAddress: '223',
    shippingAddress: '12343',
    creditCardNumber: '378282246310005'
  }
  const os = new OrderService(orderInfo);
  os.addOrderItem('item1', 90.22)
    .addOrderItem('item2', 87.60)
    .createOrder()
    .then(os => os.submitOrder())
    .then(os => os.shipOrder())
    .then(os => os.deliverOrder({ file: 'sig.img', url: '' }))
    .then(os => console.log(`Success: ${os.orderId} complete`))
    .catch(e => console.error(e.message));
}

if (!disableTests) {
  runGoodTest();
  runBadCredCardTest();
  runOutOfOrder();
  runExceedMaxOrderTest();
  runMissingBillAddrTest();
}

async function processOrder(fn, ...args) {
  const os = new OrderService();
  await os[fn](...args).catch(e => console.error(e.message));
}

(async () => {

  if (disableTests) return;

  const orderInfo = {
    customerInfo: 'user1',
    billingAddress: '223',
    shippingAddress: '12343',
    creditCardNumber: '378282246310005'
  }
  const os = new OrderService(orderInfo);
  const orderId = await os.addOrderItem('item1', 2343.99)
    .createOrder()
    .then(os => os.orderId);

  await processOrder('submitOrder', orderId);
  await processOrder('shipOrder', orderId);
  await processOrder('deliverOrder', 'proof', orderId);
  await processOrder('cancelOrder', 'reason', orderId);
})();
