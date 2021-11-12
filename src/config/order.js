'use strict'

import {
  makeOrderFactory,
  readyToDelete,
  handleOrderEvent,
  orderShipped,
  paymentCompleted,
  OrderStatus,
  recalcTotal,
  requiredForCompletion,
  statusChangeValid,
  freezeOnApproval,
  freezeOnCompletion,
  orderTotalValid,
  returnInventory,
  returnShipment,
  refundPayment,
  returnDelivery,
  cancelPayment,
  updateSignature,
  requiredForGuest,
  requiredForApproval,
  approve,
  cancel
} from '../domain/order' 

import {
  requireProperties,
  freezeProperties,
  updateProperties,
  validateProperties,
  validateModel
} from '../domain/mixins'

import { DataSourceAdapterMongoDb } from '../adapters/datasources/datasource-mongodb'
import { nanoid } from 'nanoid'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Order = {
  modelName: 'order',
  endpoint: 'orders',
  factory: makeOrderFactory,
  // datasource: {
  //   factory: DataSourceAdapterMongoDb,
  //   url: 'mongodb://localhost:27017',
  //   cacheSize: 4000,
  //   baseClass: 'DataSourceMongoDb'
  // },
  dependencies: { uuid: () => nanoid(8) },
  mixins: [
    requireProperties(
      'orderItems',
      requiredForGuest([
        'lastName',
        'firstName',
        'billingAddress',
        'shippingAddress',
        'creditCardNumber',
        'email'
      ]),
      requiredForApproval('paymentAuthorization'),
      requiredForCompletion('proofOfDelivery')
    ),
    freezeProperties(
      'orderNo',
      'customerId',
      freezeOnApproval([
        'email',
        'lastName',
        'firstName',
        'orderItems',
        'orderTotal',
        'billingAddress',
        'shippingAddress',
        'creditCardNumber',
        'paymentAuthorization'
      ]),
      freezeOnCompletion('*')
    ),
    updateProperties([
      {
        propKey: 'orderItems',
        update: recalcTotal
      },
      {
        propKey: 'orderItems',
        update: updateSignature
      }
    ]),
    validateProperties([
      {
        propKey: 'orderStatus',
        values: Object.values(OrderStatus),
        isValid: statusChangeValid
      },
      {
        propKey: 'orderTotal',
        maxnum: 99999.99,
        isValid: orderTotalValid
      },
      {
        propKey: 'email',
        regex: 'email'
      },
      {
        propKey: 'creditCardNumber',
        regex: 'creditCard'
      },
      {
        propKey: 'phone',
        regex: 'phone'
      }
    ])
  ],
  validate: validateModel,
  onDelete: readyToDelete,
  eventHandlers: [handleOrderEvent],
  ports: {
    listen: {
      service: 'Event',
      type: 'outbound',
      timeout: 0
    },
    notify: {
      service: 'Event',
      type: 'outbound',
      timeout: 0
    },
    save: {
      service: 'Persistence',
      type: 'outbound',
      timeout: 0
    },
    find: {
      service: 'Persistence',
      type: 'outbound',
      timeout: 0
    },
    validateAddress: {
      service: 'Address',
      type: 'outbound',
      keys: 'shippingAddress',
      producesEvent: 'addressValidated',
      disabled: true
    },
    authorizePayment: {
      service: 'Payment',
      type: 'outbound',
      keys: 'paymentAuthorization',
      consumesEvent: 'startWorkflow',
      producesEvent: 'paymentAuthorized',
      undo: cancelPayment
    },
    pickOrder: {
      service: 'Inventory',
      type: 'outbound',
      keys: 'pickupAddress',
      consumesEvent: 'itemsAvailable',
      producesEvent: 'orderPicked',
      undo: returnInventory,
      circuitBreaker: {
        portTimeout_pickOrder_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 60000
        }
      }
    },
    shipOrder: {
      service: 'Shipping',
      type: 'outbound',
      callback: orderShipped,
      consumesEvent: 'orderPicked',
      producesEvent: 'orderShipped',
      undo: returnShipment,
      circuitBreaker: {
        portTimeout_shipOrder_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 60000
        },
        portRetryFailed_order: {
          callVolume: 3,
          errorRate: 2,
          intervalMs: 60000,
          fallbackFn: cancel
        },
        default: {
          callVolume: 3,
          errorRate: 3,
          intervalMs: 60000
        }
      }
    },
    trackShipment: {
      service: 'Shipping',
      type: 'outbound',
      keys: ['trackingStatus', 'trackingId'],
      consumesEvent: 'orderShipped',
      producesEvent: 'orderDelivered',
      circuitBreaker: {
        portRetryFailed_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 60000
        }
      }
    },
    verifyDelivery: {
      service: 'Shipping',
      type: 'outbound',
      keys: 'proofOfDelivery',
      consumesEvent: 'orderDelivered',
      producesEvent: 'deliveryVerified',
      undo: returnDelivery
    },
    completePayment: {
      service: 'Payment',
      type: 'outbound',
      callback: paymentCompleted,
      consumesEvent: 'deliveryVerified',
      producesEvent: 'orderComplete',
      undo: refundPayment
    },
    cancelShipment: {
      service: 'Shipping',
      type: 'outbound'
    },
    refundPayment: {
      service: 'Payment',
      type: 'outbound'
    }
  },
  relations: {
    customer: {
      modelName: 'customer',
      foreignKey: 'customerId',
      type: 'manyToOne',
      desc: 'Many orders per customer, just one customer per order'
    },
    inventory: {
      modelName: 'inventory',
      foreignKey: 'itemId',
      key: 'orderItems',
      type: 'containsMany',
      desc: 'An order contains a list of inventory items to ship.'
    }
  },
  commands: {
    decrypt: {
      command: 'decrypt',
      acl: ['read', 'decrypt']
    },
    approve: {
      command: approve,
      acl: ['write', 'approve']
    },
    cancel: {
      command: cancel,
      acl: ['write', 'cancel']
    },
    runFibonacci: {
      command: model => {
        const start = Date.now()
        function fibonacci (x) {
          if (x === 0) {
            return 0
          }
          if (x === 1) {
            return 1
          }
          return fibonacci(x - 1) + fibonacci(x - 2)
        }
        const param = parseFloat(model.fibonacci)
        return {
          result: fibonacci(Number.isNaN(param) ? 10 : param),
          time: Date.now() - start
        }
      },
      acl: ['read', 'write']
    }
  },
  serializers: [
    {
      on: 'deserialize',
      key: 'creditCardNumber',
      type: 'string',
      value: (key, value) => decrypt(value),
      enabled: false
    },
    {
      on: 'deserialize',
      key: 'shippingAddress',
      type: 'string',
      value: (key, value) => decrypt(value),
      enabled: false
    },
    {
      on: 'deserialize',
      key: 'billingAddress',
      type: 'string',
      value: (key, value) => decrypt(value),
      enabled: false
    }
  ]
}
