'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin
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
      'items'
    ),
  ],

  ...onUpdate,

  onDelete: (model) => {
    if (model.orderStatus !== 'COMPLETE') {
      throw new Error('order status incomplete');
    }
  }
}


