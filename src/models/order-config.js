'use strict'

import {
  orderMixins,
  orderFactory,
  readyToDelete,
  timeoutCallback,
  handleOrderEvent
} from './order';

import {
  processUpdate
} from './mixins'

/**
 * @type {import('./index').ModelSpecification}
 */
const Order = {
  modelName: 'order',
  endpoint: 'orders',
  factory: orderFactory,
  mixins: orderMixins,
  onUpdate: processUpdate,
  onDelete: readyToDelete,
  eventHandlers: [handleOrderEvent],
  ports: {
    listen: {
      service: 'Event',
      type: 'inbound',
      timeout: 0,
      resolvePromise: true,
    },
    notify: {
      service: 'Event',
      type: 'outbound',
    },
    save: {
      service: 'Persistence',
      type: 'outbound',
      resolvePromise: true,
    },
    find: {
      service: 'Persistence',
      type: 'outbound',
      resolvePromise: true,
    },
    validateAddress: {
      service: 'Address',
      type: 'outbound',
      disabled: true,
      resolvePromise: true,
    },
    authorizePayment: {
      service: 'Payment',
      type: 'outbound',
      resolvePromise: true
    },
    fillOrder: {
      service: 'Inventory',
      type: 'outbound',
      delegateCallback: true,
      resolvePromise: true,
    },
    shipOrder: {
      service: 'Shipping',
      type: 'outbound',
      delegateCallback: true,
      timeout: 440000000
    },
    trackShipment: {
      service: 'Shipping',
      type: 'outbound',
      delegateCallback: true,
    },
    verifyDelivery: {
      service: 'Shipping',
      type: 'outbound',
      delegateCallback: true,
      timeout: 10000,
      timeoutCallback
    },
    completePayment: {
      service: 'Payment',
      type: 'outbound',
    },
    cancelShipment: {
      service: 'Shipping',
      type: 'outbound'
    },
    refundPayment: {
      service: 'Payment',
      type: 'outbound'
    },
  }
}

export default Order