'use strict'

import {
  orderMixins,
  orderFactory,
  readyToDelete,
  handleOrderEvent,
  addressValidated,
  paymentAuthorized,
  orderFilled,
  orderShipped,
  trackingUpdate,
  handleLatePickup,
  deliveryVerified,
  paymentCompleted,
  timeoutCallback
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
      timeout: 0
    },
    notify: {
      service: 'Event',
      type: 'outbound',
    },
    save: {
      service: 'Persistence',
      type: 'outbound',
    },
    find: {
      service: 'Persistence',
      type: 'outbound',
    },
    validateAddress: {
      service: 'Address',
      type: 'outbound',
      consumesEvent: 'validateAddress',
      producesEvent: 'addressValidated',
      callback: addressValidated,
      disabled: true
    },
    authorizePayment: {
      service: 'Payment',
      type: 'outbound',
      consumesEvent: 'authorizePayment',
      producesEvent: 'paymentAuthorized',
      callback: paymentAuthorized
    },
    fillOrder: {
      service: 'Inventory',
      type: 'outbound',
      consumesEvent: 'fillOrder',
      producesEvent: 'orderFilled',
      timeout: 440000000,
      callback: orderFilled
    },
    shipOrder: {
      service: 'Shipping',
      type: 'outbound',
      timeout: 440000000,
      callback: orderShipped,
      consumesEvent: 'orderFilled',
      producesEvent: 'orderShipped',
      timeoutCallback: handleLatePickup
    },
    trackShipment: {
      service: 'Shipping',
      type: 'outbound',
      callback: trackingUpdate,
      consumesEvent: 'orderShipped',
      producesEvent: 'orderDelivered',
    },
    verifyDelivery: {
      service: 'Shipping',
      type: 'outbound',
      timeout: 10000,
      callback: deliveryVerified,
      consumesEvent: 'orderDelivered',
      producesEvent: 'deliveryVerified'
    },
    completePayment: {
      service: 'Payment',
      type: 'outbound',
      callback: paymentCompleted,
      consumesEvent: 'deliveryVerified',
      producesEvent: 'paymentCompleted',
      timeoutCallback
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