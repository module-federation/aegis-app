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

const MAXORDER = 100000;

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

/**
 * @type {import('./index').ModelConfig}
 */
const Order = {
  modelName: 'order',
  endpoint: 'orders',

  factory: () => {
    return function createOrder({
      customerId, items, vendorEmail
    }) {
      checkItems(items);
      return Object.freeze({
        total: calcTotal(items),
        customerId,
        vendorEmail,
        items,
        orderStatus: 'PENDING'
      });
    }
  },

  mixins: [
    requirePropertiesMixin(
      'customerId',
      'items'
    ),
    freezePropertiesMixin(
      'customerId',
      (o) => {
        // can't change status if canceled or complete 
        return ['COMPLETE', 'CANCELED'].includes(o[PREVMODEL].orderStatus)
          ? 'orderStatus'
          : null
      },
      (o) => {
        // can't edit items once approved
        return o[PREVMODEL].orderStatus !== 'PENDING'
          ? 'items'
          : null
      },
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
          if (!o[PREVMODEL]?.orderStatus) return true;
          // Can't change back to pending once approved
          return !(propVal === 'PENDING' &&
            o[PREVMODEL].orderStatus === 'APPROVED')
        }
      },
      {
        propKey: 'total',
        maxnum: MAXORDER
      },
      {
        propKey: 'vendorEmail',
        regex: 'email'
      }
    ]),
    allowPropertiesMixin(
      'customerId',
      'items',
      'orderStatus',
      'total',
      'vendorEmail'
    )
  ],

  onUpdate: processUpdate,

  onDelete: (model) => {
    // Can't delete orders that are still being processed
    if (!['COMPLETE', 'CANCELED'].includes(model.orderStatus)) {
      throw new Error('order status incomplete');
    }
    return model;
  },

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

