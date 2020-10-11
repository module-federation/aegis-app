'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  validatePropertiesMixin,
  updatePropertiesMixin,
  allowPropertiesMixin,
  processUpdate,
  PREVMODEL
} from './mixins';

const MAXORDER = 99999.99;

const checkItems = function (items) {
  if (!items) {
    throw new Error('order contains no items');
  }
  const _items = Array.isArray(items) ? items : [items];
  if (_items.length > 0 && (_items.every(i => i['name'] &&
    typeof i['price'] === 'number' && i['price'] < MAXORDER))
  ) {
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

function freezeOnApproval(o, propKey) {
  return o[PREVMODEL].orderStatus !== 'PENDING' ? propKey : null;
}

/**
 * No status changes once order has been canceled or completed 
 * @param {*} o 
 * @param {*} propKey 
 */
function freezeOnCompletion(o, propKey) {
  return ['COMPLETE', 'CANCELED'].includes(o[PREVMODEL].orderStatus)
    ? propKey
    : null
}

/**
 * Value required in order to complete order
 * @param {*} o 
 * @param {*} propKey 
 */
function requiredForCompletion(o, propKey) {
  if (!o.orderStatus) return;
  return o.orderStatus !== 'PENDING' ? propKey : null;
}

/**
 * Can't change back to pending once approved
 */
function statusChangeValid(o, propVal) {
  if (!o[PREVMODEL]?.orderStatus) return true;
  return !(propVal === 'PENDING' &&
    o[PREVMODEL].orderStatus === 'APPROVED')
}

/** 
 * Don't delete orders before they're done processing.
 */
function readyToDelete(model) {
  if (!['COMPLETE', 'CANCELED'].includes(model.orderStatus)) {
    throw new Error('order status incomplete');
  }
  return model;
}

/**
 * @type {import('./index').ModelConfig}
 */
const Order = {
  modelName: 'order',
  endpoint: 'orders',

  factory: () => {
    return function createOrder({
      customerId, items, shippingAddress, creditCardNumber
    }) {
      checkItems(items);
      return Object.freeze({
        total: calcTotal(items),
        customerId,
        shippingAddress,
        creditCardNumber,
        items,
        orderStatus: 'PENDING'
      });
    }
  },

  mixins: [
    requirePropertiesMixin(
      'customerId',
      'items',
      'creditCardNumber',
      (o) => requiredForCompletion(o, 'shippingAddress')
    ),
    freezePropertiesMixin(
      'customerId',
      (o) => freezeOnCompletion(o, 'orderStatus'),
      (o) => freezeOnApproval(o, 'items'),
      (o) => freezeOnApproval(o, 'creditCardNumber'),
      (o) => freezeOnApproval(o, 'shippingAddress')
    ),
    updatePropertiesMixin([
      {
        propKey: 'items',
        update: (o, propVal) => ({
          // New total if items are updated
          total: calcTotal(propVal)
        })
      }
    ]),
    validatePropertiesMixin([
      {
        propKey: 'orderStatus',
        values: [
          'PENDING',
          'APPROVED',
          'CANCELED',
          'COMPLETE'
        ],
        isValid: (o, propVal) => {
          return statusChangeValid(o, propVal)
        }
      },
      {
        propKey: 'total',
        maxnum: MAXORDER
      }
    ]),
    allowPropertiesMixin(
      'customerId',
      'items',
      'orderStatus',
      'total',
      'creditCardNumber',
      'shippingAddress'
    )
  ],

  onUpdate: processUpdate,

  onDelete: (model) => readyToDelete(model),

  eventHandlers: [
    ({ eventName, ...rest }) => {
      console.log({
        eventHandler: 'Order',
        eventName: eventName,
        eventData: { ...rest }
      });
    }
  ]
}

export default Order

