'use strict'

import {
  validatePropertiesMixin,
  requirePropertiesMixin,
  freezePropertiesMixin,
  updatePropertiesMixin,
  processUpdate,
  checkFormat,
  PREVMODEL,
} from './mixins'

/**
 * @typedef {string|RegExp} topic
 * @typedef {function(string)} eventCallback
 * @typedef {import('../adapters/index').adapterFunction} adapterFunction
 * @typedef {string} id
 * 
 * @typedef {Object} Order
 * @property {function(topic,eventCallback)} listen - listen for events
 * @property {import('../adapters/event-adapter').notifyType} notify
 * @property {adapterFunction} validateAddress - returns valid address or throws exception
 * @property {adapterFunction} completePayment - completes payment for an authorized charge
 * @property {adapterFunction} verifyDelivery - verify the order was received by the customer
 * @property {adapterFunction} trackShipment
 * @property {adapterFunction} refundPayment
 * @property {function():Promise<Order>} fillOrder - pick the items and get them ready for shipment
 * @property {adapterFunction} authorizePayment - verify payment info, credit avail
 * @property {import('../adapters/shipping-adapter').} shipOrder
 * {import('../adapters/shipping-adapter').shipOrder} shipOrder -
 * calls shipping service to request delivery
 * @property {function(Order):Promise<void>} save - saves order
 * @property {function():Promise<Order>} find - finds order
 * @property {string} shippingAddress
 * @property {string} orderNo = the order number
 * @property {string} trackingId - id given by tracking status for this `orderNo`
 * @property {function()} decrypt
 * @property {function(*):Promise<Order>} update 
 * @property {'APPROVED'|'SHIPPING'|'CANCELED'|'COMPLETED'} orderStatus
 */

export const ORDERTOPIC = 'orderChannel';
const MAXORDER = 99999.99;
const orderItems = 'orderItems';
const customerInfo = 'customerInfo';
const billingAddress = 'billingAddress';
const shippingAddress = 'shippingAddress'
const proofOfDelivery = 'proofOfDelivery';
const creditCardNumber = 'creditCardNumber';
const paymentAuthorization = 'paymentAuthorization';
const customerId = 'customerId';
const orderStatus = 'orderStatus';
const orderTotal = 'orderTotal';
const cancelReason = 'cancelReason';
const trackingId = 'trackingId';
const orderNo = 'orderNo';
export const OrderStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  SHIPPING: 'SHIPPING',
  COMPLETE: 'COMPLETE',
  CANCELED: 'CANCELED'
}

/**
 * 
 * @param {*} items 
 */
export const checkItems = function (items) {
  if (!items) {
    throw new Error('order contains no items');
  }
  const _items = Array.isArray(items) ?
    items : [items];

  if (_items.length > 0 &&
    _items.every(i => i['itemId'] &&
      typeof i['price'] === 'number'
    )) {
    return _items;
  }
  throw new Error('order items invalid');
}

/**
 * 
 * @param {*} items 
 */
export const calcTotal = function (items) {
  const _items = checkItems(items);
  return _items.reduce((total, item) => {
    return total += item.price
  }, 0);
}

/**
 * No changes to `propKey` once order is approved
 * @param {*} o - the order
 * @param {*} propKey 
 * @returns {string | null} the key or `null`
 */
export const freezeOnApproval = (propKey) => (o) => {
  return o[PREVMODEL].orderStatus !== OrderStatus.PENDING ?
    propKey :
    null;
}

/**
 * No changes to `propKey` once order is complete or canceled
 * @param {*} o - the order
 * @param {*} propKey 
 * @returns {string | null} the key or `null`
 */
export const freezeOnCompletion = (propKey) => (o) => {
  return [
    OrderStatus.COMPLETE,
    OrderStatus.CANCELED
  ].includes(o[PREVMODEL].orderStatus) ?
    propKey :
    null;
}

/**
 * Value required to complete order
 * @param {*} o 
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
export const requiredForCompletion = (propKey) => (o) => {
  if (!o.orderStatus) {
    return;
  }
  return o.orderStatus === OrderStatus.COMPLETE ?
    propKey :
    void 0;
}

const invalidStatusChange = (from, to) => (o, propVal) => {
  return propVal === to && o[PREVMODEL].orderStatus === from;
}

const invalidStatusChanges = [
  // Can't change back to pending once approved
  invalidStatusChange(OrderStatus.APPROVED, OrderStatus.PENDING),
  // Can't change back to pending once shipped
  invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.PENDING),
  // Can't change back to approved once shipped
  invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.APPROVED),
  // Can't change directly to shipping from pending
  invalidStatusChange(OrderStatus.PENDING, OrderStatus.SHIPPING),
  // Can't change directly to complete from pending
  invalidStatusChange(OrderStatus.PENDING, OrderStatus.COMPLETE)
];

/**
 * Check that status changes are valid
 */
export const statusChangeValid = (o, propVal) => {
  if (!o[PREVMODEL]?.orderStatus) {
    return true;
  }
  if (invalidStatusChanges.some(i => i(o, propVal))) {
    throw new Error('invalid status change');
  }
  return true;
}

export const orderTotalValid = (o, propVal) => {
  return calcTotal(o.orderItems) === propVal;
}

/**
 * Recalculate order total
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
export const recalcTotal = (o, propVal) => ({
  orderTotal: calcTotal(propVal)
})

/** 
 * Don't delete orders before they're complete.
 */
export function readyToDelete(model) {
  if (![
    OrderStatus.COMPLETE,
    OrderStatus.CANCELED
  ].includes(model.orderStatus)) {
    throw new Error('order status incomplete');
  }
  return model;
}

/**
 * 
 * @param {*} error 
 * @param {*} func 
 */
function handleError(error, func) {
  console.error({
    func,
    error
  });
  throw new Error(error);
}

/**
 * 
 * @param {Order} order 
 * @returns {Promise<Order>}
 */
async function findOrder(order) {
  const current = await order.find();
  if (!current) {
    console.warn('no order found');
    return order;
  }
  return current;
}

/**
 * 
 * @param {Order} order 
 * @param {*} changes 
 */
async function updateOrder(order, changes) {
  const current = await findOrder(order);
  const updated = processUpdate(current, changes);
  await updated.save();
  return updated;
}

/**
 * 
 * @param {*} param0 
 */
export async function paymentCompleted({ model: order }) {
  return order.update({ orderStatus: OrderStatus.COMPLETE });
}

/**
 * 
 * @param {*} param0 
 */
export async function deliveryVerified(options, proofOfDelivery) {
  const { model: order } = options;
  return order.update({ proofOfDelivery });
}

/**
 * Handle shipment tracking update
 * @param {{order: Order }} param0 
 */
export async function trackingUpdate(
  options,
  trackingId,
  trackingStatus
) {
  const { model: order } = options;
  await order.update({ trackingId, trackingStatus });
  return {
    done: trackingStatus === 'orderDelivered',
    order
  }
}

/**
 * Callback invoked by shipping adapter when order is shipped.
 * @param {{
 *  shipmentId:string,
 *  model:Order 
 * }} options 
 */
export async function orderShipped(options, shipmentId) {
  const { model: order } = options;
  return order.update({
    shipmentId,
    orderStatus: OrderStatus.SHIPPING
  });
}

/**
 * In stock, ready for pickup
 * @param {{ model:Order, resolve:function(Order) }} options
 */
export async function orderFilled(options, pickupAddress) {
  const { model: order } = options;
  return order.update({ pickupAddress });
}

/**
 * 
 * @param {{ model:Order, resolve:function(Order) }} options
 */
export async function addressValidated(options, shippingAddress) {
  const { model: order } = options;
  return order.update({ shippingAddress });
}

/**
 * Called by adapter when port recevies response from payment service.
 * @param {{ model:Order, resolve:function(Order) }} options
 * @param {*} paymentAuthorization 
 */
export async function paymentAuthorized(options, paymentAuthorization) {
  const { model: order } = options;
  return order.update({ paymentAuthorization });
}

/**
 * Implements the order service workflow.
 */
const OrderActions = {
  /** 
   * Verifies the shipping address and authorizes payment 
   * for the order total when the order is first created.
   * @param {Order} order - the order
   */
  [OrderStatus.PENDING]: async (order) => {
    const func = OrderStatus.PENDING;
    try {
      await Promise.all([
        order.validateAddress(addressValidated),
        order.authorizePayment(paymentAuthorized)
      ]);
    } catch (error) {
      handleError(error, OrderStatus.PENDING);
    }
  },
  /** 
   * Fill the order and specify the pickup location  
   * @param {Order} order 
   */
  [OrderStatus.APPROVED]: async (order) => {
    try {
      // don't block the caller waiting for this 
      order.fillOrder(orderFilled);
    } catch (error) {
      handleError(error, OrderStatus.APPROVED);
    }
  },
  /** 
   * 
   * @param {Order} order 
   */
  [OrderStatus.SHIPPING]: async (order) => {
    try {
      // don't block the caller waiting for this
      order.trackShipment(trackingUpdate);
    } catch (error) {
      handleError(error, OrderStatus.SHIPPING);
    }
  },
  /** 
   * 
   * @param {Order} order 
   */
  [OrderStatus.CANCELED]: async (order) => {
    try {
      await order.refundPayment();
    } catch (error) {
      handleError(error, OrderStatus.SHIPPING);
    }
  },
  /** 
   * 
   * @param {Order} order 
   */
  [OrderStatus.COMPLETE]: async (order) => {
    console.log('do customer sentiment etc');
    return;
  }
}

/**
 * 
 * @param {Order} order 
 */
export async function handleStatusChange(order) {
  return OrderActions[order.orderStatus](order);
}

/** 
 * @param {{model:Order}} 
 */
export async function handleOrderEvent({
  model: order,
  eventType,
  changes
}) {
  if (changes?.orderStatus || eventType === 'CREATE') {
    await handleStatusChange(order);
  }
}

/**
 * 
 * @param {*} dependencies 
 */
export function orderFactory(dependencies) {
  return async function createOrder({
    customerInfo,
    orderItems,
    shippingAddress,
    billingAddress,
    creditCardNumber,
    signatureRequired = false
  }) {
    checkItems(orderItems);
    checkFormat(creditCardNumber, 'creditCard');
    const order = {
      customerInfo,
      orderItems,
      creditCardNumber,
      billingAddress,
      signatureRequired,
      shippingAddress,
      [orderTotal]: calcTotal(orderItems),
      [orderStatus]: OrderStatus.PENDING,
      [orderNo]: dependencies.uuid(),
      async update(changes) {
        return updateOrder(this, changes);
      }
    };
    return Object.freeze(order);
  }
}

export function timeoutCallback({ port, model: order }) {
  console.error('timeoutCallback...', port, order);
}

export function handleLatePickup({ model: order }) {
  console.log(handleLatePickup.name);
}