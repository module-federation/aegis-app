'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  validatePropertyValuesMixin,
  allowPropertiesMixin,
  updatePropertyValuesMixin,
  PREVMODEL
} from './mixins';

import onUpdate from './on-update';

const MAXPRICE = 99999;

const checkItems = function (items) {
  if (!items) {
    throw new Error('order contains no items');
  }
  const _items = Array.isArray(items) ? items : [items];

  if (_items.length > 0 && (_items.every(i => i['name'] &&
    typeof i['price'] === 'number' && i['price'] < MAXPRICE))
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

  factory: () => {
    return function createOrder({ customerId, items }) {
      checkItems(items);
      return Object.freeze({
        total: calcTotal(items),
        customerId,
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
        if (!o[PREVMODEL]?.orderStatus) return null;
        // can't change status if canceled or complete 
        return ['COMPLETE', 'CANCELED'].includes(
          o[PREVMODEL].orderStatus
        ) ? 'orderStatus'
          : null
      },
      (o) => {
        if (!o[PREVMODEL]?.orderStatus) return null;
        // can't edit items once approved
        return o[PREVMODEL].orderStatus !== 'PENDING'
          ? 'items'
          : null
      },
    ),
    updatePropertyValuesMixin([
      {
        propKey: 'items',
        update: (o, propVal) => {
          // New total if items are updated
          return {
            total: calcTotal(propVal)
          };
        }
      }
    ]),
    validatePropertyValuesMixin([
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
        maxNum: MAXPRICE
      }
    ]),
    allowPropertiesMixin(
      'customerId',
      'items',
      'orderStatus',
      'total'
    )
  ],

  ...onUpdate,

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

