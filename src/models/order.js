'use strict'

import { authorizePayment, fillOrder, trackShipment } from '../adapters';
import { compose } from '../lib/utils';
import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  validatePropertiesMixin,
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
const OrderStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  SHIPPING: 'SHIPPING',
  COMPLETE: 'COMPLETE',
  CANCELED: 'CANCELED'
}

const checkItems = function (items) {
  if (!items) {
    throw new Error('order contains no items');
  }
  const _items = Array.isArray(items)
    ? items
    : [items];

  if (_items.length > 0
    && _items.every(i => i['itemId']
      && typeof i['price'] === 'number'
    )) {
    return _items;
  }
  throw new Error('order items invalid');
}

const calcTotal = function (items) {
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
const freezeOnApproval = (propKey) => (o) => {
  return o[PREVMODEL].orderStatus !== OrderStatus.PENDING
    ? propKey
    : null;
}

/**
 * No changes to `propKey` once order is complete or canceled
 * @param {*} o - the order
 * @param {*} propKey 
 * @returns {string | null} the key or `null`
 */
const freezeOnCompletion = (propKey) => (o) => {
  return [
    OrderStatus.COMPLETE,
    OrderStatus.CANCELED
  ].includes(o[PREVMODEL].orderStatus)
    ? propKey
    : null;
}

/**
 * Value required to complete order
 * @param {*} o 
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
const requiredForCompletion = (propKey) => (o) => {
  if (!o.orderStatus) {
    return;
  }
  return o.orderStatus === OrderStatus.COMPLETE
    ? propKey
    : void 0;
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

/** 
 * Don't delete orders before they're complete.
 */
function readyToDelete(model) {
  if (![
    OrderStatus.COMPLETE,
    OrderStatus.CANCELED
  ].includes(model.orderStatus)) {
    throw new Error('order status incomplete');
  }
  return model;
}

function handleError(error, func) {
  console.error({ func, error });
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

async function paymentCompleted({ order, resolve }) {
  order.update({ orderStatus: OrderStatus.COMPLETE })
    .then(order => handleStatusChange(order))
    .then(order => resolve(order))
    .catch(error => handleError(error, paymentCompleted.name))
}

/**
 * 
 * @param {*} param0 
 */
async function deliveryVerified({
  order, resolve, proofOfDelivery, trackingStatus
}) {
  order.update({ proofOfDelivery })
    .then(order => order.completePayment(paymentCompleted))
    .catch(error => handleError(error, deliveryVerified.name));
}

/**
 * Handle shipment tracking update
 * @param {{order: Order }} param0 
 */
async function trackingUpdate({
  order, trackingId, trackingStatus, resolve
}) {
  order.update({ trackingId, trackingStatus })
    .then(async order => {
      if (trackingStatus === 'orderDelivered') {
        resolve(order);
        await order.verifyDelivery(deliveryVerified, { resolve: true });
      }
    }).catch(error => handleError(error, trackingUpdate.name));
}

/**
 * Callback invoked by shipping adapter when order is shipped.
 * @param {{
 *  message:string,
 *  subscription:import('../adapters/event-adapter').Subscription 
 * }} param0 
 */
async function orderShipped({ order, shipmentId, resolve }) {
  const changes = { shipmentId, orderStatus: OrderStatus.SHIPPING };
  order.update(changes)
    .then(order => resolve(order))
    .catch(error => handleError(error, orderShipped.name));
}

/**
 * In stock, ready for pickup
 * @param {{order: Order }} param0 
 */
async function orderFilled({ order, pickupAddress }) {
  order.update({ pickupAddress })
    .then(order => order.shipOrder(orderShipped))
    .then(order => handleStatusChange(order))
    .catch(error => handleError(error, orderFilled.name));
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
        order.validateAddress(),
        order.authorizePayment()
      ]);
    } catch (error) {
      handleError(error, func);
    }
  },

  /** 
   * Fill the order and specify the pickup location  
   * @param {Order} order 
   */
  [OrderStatus.APPROVED]: async (order) => {
    const func = OrderStatus.APPROVED;
    try {
      await order.fillOrder(orderFilled, { resolve: true });
    } catch (error) {
      handleError(error, func);
    }
  },

  /** 
   * 
   * @param {Order} order 
   */
  [OrderStatus.SHIPPING]: async (order) => {
    try {
      await order.trackShipment(trackingUpdate, { resolve: true });
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
    // await order.surveyCustomer();
    console.log('customer sentiment');
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
 * @type {import('./index').ModelSpecification}
 */
const Order = {
  modelName: 'order',
  endpoint: 'orders',
  ports: {
    listen: {
      service: 'Event',
      type: 'inbound',
    },
    notify: {
      service: 'Event',
      type: 'outbound',
    },
    save: {
      service: 'Persistence',
      type: 'outbound'
    },
    find: {
      service: 'Persistence',
      type: 'outbound'
    },
    shipOrder: {
      service: 'Shipping',
      type: 'outbound',
    },
    authorizePayment: {
      service: 'Payment',
      type: 'outbound'
    },
    refundPayment: {
      service: 'Payment',
      type: 'outbound'
    },
    completePayment: {
      service: 'Payment',
      type: 'outbound',
    },
    trackShipment: {
      service: 'Shipping',
      type: 'outbound'
    },
    verifyDelivery: {
      service: 'Shipping',
      type: 'outbound'
    },
    cancelShipment: {
      service: 'Shipping',
      type: 'outbound'
    },
    validateAddress: {
      service: 'Address',
      type: 'outbound'
    },
    fillOrder: {
      service: 'Inventory',
      type: 'outbound'
    }
  },
  factory: function (dependencies) {
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
  },
  mixins: [
    requirePropertiesMixin(
      customerInfo,
      orderItems,
      creditCardNumber,
      shippingAddress,
      billingAddress,
      requiredForCompletion(proofOfDelivery)
    ),
    freezePropertiesMixin(
      customerInfo,
      freezeOnApproval(orderItems),
      freezeOnApproval(creditCardNumber),
      freezeOnApproval(shippingAddress),
      freezeOnApproval(billingAddress),
      freezeOnCompletion(orderStatus),
    ),
    updatePropertiesMixin([
      {
        // Recalc total
        propKey: orderItems,
        update: (o, propVal) => ({
          orderTotal: calcTotal(propVal)
        }),
      }
    ]),
    validatePropertiesMixin([
      {
        propKey: orderStatus,
        values: Object.values(OrderStatus),
        isValid: statusChangeValid,
      },
      {
        propKey: orderTotal,
        maxnum: MAXORDER
      }
    ]),
  ],
  onUpdate: processUpdate,
  onDelete: model => readyToDelete(model),
  eventHandlers: [
    /** @param {{model:Order}} */
    async ({ model: order, eventType, changes }) => {
      if (changes?.orderStatus || eventType === 'CREATE') {
        await order.save();
        await handleStatusChange(order);
      }
    }
  ]
}

export default Order