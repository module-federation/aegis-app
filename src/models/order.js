'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  validatePropertyValuesMixin,
  allowPropertiesMixin,
  PREVMODEL
} from './mixins';

import onUpdate from './on-update';

const checkItems = function (items) {
  if (!items) {
    throw new Error('no items');
  }
  const _items = Array.isArray(items) ? items : [items];

  if (_items.length < 1
    || !_items.every(i => typeof i['price'] === 'number')
    || !_items.every(i => i['name'])
  ) {
    throw new Error('order items invalid');
  }
}

/**
 * @type {import('./index').ModelConfig}
 */
export default {
  modelName: 'order',

  factory: () => {
    return function createOrder({ customerId, items }) {
      checkItems(items);

      return Object.freeze({
        total: items.reduce((tot, item) => tot += item.price, 0),
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
      (o) => ( // conditionally frozen
        o[PREVMODEL].orderStatus === 'COMPLETE'
          ? 'orderStatus'
          : ''
      ),
      (o) => ( // conditionally frozen
        o[PREVMODEL].orderStatus !== 'PENDING'
          ? 'items'
          : ''
      ),
    ),
    validatePropertyValuesMixin([
      {
        propName: 'orderStatus',
        values: [
          'PENDING',
          'APPROVED',
          'CANCELED',
          'COMPLETE'
        ],
        isValid: (o, propVal) => {
          if (!o[PREVMODEL]) return true;
          return !(propVal === 'PENDING' &&
            o[PREVMODEL].orderStatus === 'APPROVED')
        }
      },
      {
        propName: 'items',
        isValid: (o, propVal) => {
          checkItems(propVal);
          return true;
        }
      },
      {
        propName: 'total',
        isValid: (o, propVal) => {
          if (o.items?.length > 0) {
            o.total = o.items.reduce(
              (tot, item) => tot += item.price, 0
            );
          }
          return true;
        }
      },
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
    if (model.orderStatus !== 'COMPLETE') {
      throw new Error('order status incomplete');
    }
    return model;
  },

  // schema: {},
  // relations: {},
  // useCases: {},
  // controllers: {}
}


