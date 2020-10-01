'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  validatePropertyValuesMixin,
  PREVMODEL
} from './mixins';

import onUpdate from './on-update';

/**
 * @type {import('./index').ModelConfig}
 */
export default {
  modelName: 'order',

  factory: () => {
    return function createOrder({ customerId, items }) {
      if (!items) {
        throw new Error('no items');
      }
      const _items = Array.isArray(items) ? items : [items];

      if (_items.length < 1 || !_items.every(i => i['price'])) {
        throw new Error('order invalid');
      }

      return Object.freeze({
        total: _items.reduce((tot, item) => tot += item.price, 0),
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
      // conditionally readonly
      (o) => (
        !['PENDING']
          .includes(o[PREVMODEL].orderStatus)
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
        ]
      },
      {
        propName: 'total',
        isValid: (o, val) => {
          if (o.items?.length > 0) {
            o.total = o.items.reduce(
              (tot, item) => tot += item.price, 0
            );
          }
          return true;
        }
      }
    ])
  ],

  ...onUpdate,

  onDelete: (model) => {
    if (model.orderStatus !== 'COMPLETE') {
      throw new Error('order status incomplete');
    }
    return model;
  }
}


