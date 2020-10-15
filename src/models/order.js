'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  validatePropertiesMixin,
  updatePropertiesMixin,
  allowPropertiesMixin,
  processUpdate,
  checkFormat,
  PREVMODEL,
} from './mixins'

const MAXORDER = 99999.99;

const checkItems = function (items) {
  if (!items) {
    throw new Error('order contains no items');
  }
  const _items = Array.isArray(items)
    ? items
    : [items];

  if (_items.every(i => i['name']
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
  return o[PREVMODEL].orderStatus !== 'PENDING'
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
    'COMPLETE',
    'CANCELED'
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
  if (!o.orderStatus) return;
  return o.orderStatus === 'COMPLETE'
    ? propKey
    : void 0;
}

/**
 * Can't change back to pending once approved
 */
const statusChangeValid = () => (o, propVal) => {
  if (!o[PREVMODEL]?.orderStatus) return true;
  return !(propVal === 'PENDING' &&
    o[PREVMODEL].orderStatus === 'APPROVED')
}

/** 
 * Don't delete orders before they're complete.
 */
function readyToDelete(model) {
  if (!['COMPLETE', 'CANCELED'].includes(model.orderStatus)) {
    throw new Error('order status incomplete');
  }
  return model;
}

async function shipOrder(order) {
  await order.completePayment();
  await order.shipOrder();
}

async function trackShipment(order) {
  await order.trackShipment();
}

async function refundPayment(order) {
  await order.refundPayment();
}

async function verifyDelivery(order) {
  await order.verifyDelivery();
}

const OrderActions = {
  PENDING: () => void 0,
  APPROVED: shipOrder,
  SHIPPING: trackShipment,
  CANCELED: refundPayment,
  COMPLETE: verifyDelivery
}

async function handleStatusChange(order) {
  await OrderActions[order.orderStatus](order);
}

/**
 * @type {import('./index').ModelSpecification}
 */
const Order = {
  modelName: 'order',
  endpoint: 'orders',

  factory: function ({
    validateAddress,
    authorizePayment,
    completePayment,
    refundPayment,
    shipOrder,
    trackShipment,
    verifyDelivery,
    uuid
  }) {
    return async function createOrder({
      customerInfo,
      orderItems,
      shippingAddress,
      billingAddress,
      creditCardNumber, //TODO paymentInfo: { creditCard, paypal, blockchain }
      requireSignature = false
    }) {
      checkItems(orderItems);
      checkFormat(creditCardNumber, 'creditCard');
      const shipAddr = await validateAddress(
        shippingAddress
      );
      const payAuth = await authorizePayment(
        customerInfo,
        creditCardNumber,
        billingAddress,
        calcTotal(orderItems)
      );
      return Object.freeze({
        completePayment() {
          return completePayment(this);
        },
        refundPayment() {
          return refundPayment(this);
        },
        shipOrder() {
          return shipOrder(this);
        },
        trackShipment() {
          return trackShipment(this);
        },
        verifyDelivery() {
          return verifyDelivery(this);
        },
        customerInfo,
        orderItems,
        creditCardNumber,
        billingAddress,
        requireSignature,
        proofOfDelivery: null,
        shippingAddress: shipAddr,
        paymentAuthorization: payAuth,
        total: calcTotal(orderItems),
        orderStatus: 'PENDING',
        orderId: uuid()
      });
    }
  },
  mixins: [
    requirePropertiesMixin(
      'customerInfo',
      'orderItems',
      'creditCardNumber',
      'shippingAddress',
      'billingAddress',
      requiredForCompletion('proofOfDelivery')
    ),
    freezePropertiesMixin(
      'customerInfo',
      freezeOnApproval('items'),
      freezeOnApproval('creditCardNumber'),
      freezeOnApproval('shippingAddress'),
      freezeOnApproval('billingAddress'),
      freezeOnCompletion('orderStatus'),
    ),
    updatePropertiesMixin([
      {
        // Recalc total
        propKey: 'orderItems',
        update: (o, propVal) => ({
          total: calcTotal(propVal)
        }),
      }
    ]),
    validatePropertiesMixin([
      {
        propKey: 'orderStatus',
        values: [
          'PENDING',
          'APPROVED',
          'SHIPPING',
          'CANCELED',
          'COMPLETE'
        ],
        isValid: statusChangeValid,
      },
      {
        propKey: 'total',
        maxnum: MAXORDER
      }
    ]),
    allowPropertiesMixin(
      'customerInfo',
      'orderItems',
      'orderStatus',
      'total',
      'creditCardNumber',
      'shippingAddress',
      'billingAddress',
      'paymentAuthorization',
      'completePayment',
      'signatureRequired',
      'proofOfDelivery',
      'refundPayment',
      'shipOrder',
      'trackShipment'
    )
  ],

  onUpdate: processUpdate,

  onDelete: (model) => readyToDelete(model),

  eventHandlers: [
    async ({ model, eventName, changes, ...rest }) => {
      console.log({
        eventName: eventName,
        eventHandler: 'Order.handleStatusChange',
        modelData: { ...model },
        eventData: { ...rest }
      });
      if (model.decrypt) {
        console.log(model.decrypt());
      }
      if (changes?.orderStatus) {
        await handleStatusChange(model);
      }
    }
  ]
}

export default Order

