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
  cancel,
  accountOrder,
  OrderError,
  orderPicked
} from '../domain/order'

import {
  requireProperties,
  freezeProperties,
  updateProperties,
  validateProperties,
  validateModel,
  allowProperties
} from '../domain/mixins'
import { nanoid } from 'nanoid'
import { DataSourceAdapterMongoDb } from '../adapters/datasources/datasource-mongodb'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Order = {
  endpoint: 'orders',
  factory: makeOrderFactory,
  domain: 'order',
  // datasource: {
  //   factory: DataSourceAdapterMongoDb,
  //   url: 'mongodb://127.0.0.1:27017',
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
      requiredForApproval('paymentStatus'),
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
        'paymentStatus'
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
    // allowProperties([fibonacci, time, result])
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
      keys: 'paymentStatus',
      consumesEvent: 'startWorkflow',
      producesEvent: 'paymentAuthorized',
      undo: cancelPayment,
      disabled: true
    },
    pickOrder: {
      service: 'Inventory',
      type: 'outbound',
      keys: 'pickupAddress',
      callback: orderPicked,
      consumesEvent: 'itemsAvailable',
      producesEvent: 'orderPicked',
      undo: returnInventory,
      circuitBreaker: {
        portTimeout_pickOrder_order: {
          callVolume: 2,
          errorRate: 1,
          intervalMs: 5000
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
    },
    cancelOrders: {
      service: 'Order',
      type: 'inbound',
      timeout: 0,
      methods: ['post']
    },
    approveOrders: {
      service: 'Order',
      type: 'inbound',
      timeout: 0,
      methods: ['patch']
    },
    trackAsyncContext: {
      service: 'Telemetry',
      type: 'inbound',
      timeout: 0
    },
    customHttpStatus: {
      service: 'Telemetry',
      type: 'inbound',
      timeout: 0
    },
    testContainsMany: {
      service: 'Inventory',
      type: 'inbound',
      timeout: 0
    },
    runFibonacciJs: {
      service: 'Test',
      type: 'inbound',
      timeout: 0
    },
    getFieldList: {
      service: 'Test',
      type: 'inbound',
      timeout: 0
    },
    createModelEvent: {
      service: 'Test',
      type: 'inbound',
      timeout: 0
    }
  },
  relations: {
    customer: {
      modelName: 'customer',
      type: 'manyToOne',
      foreignKey: 'customerId',
      desc: 'Many orders per customer, just one customer per order'
    },
    inventory: {
      modelName: 'inventory',
      type: 'containsMany',
      foreignKey: 'itemId',
      arrayKey: 'orderItems',
      desc: 'An order contains a list of inventory items to ship.'
    }
  },
  routes: [
    {
      path: '/orders',
      get: async (req, res, ports) =>
        ports.listModels({
          writable: res,
          query: req.query
        }),

      post: async (req, res, ports) => {
        try {
          const result = await ports.createModel(req.body)
          res
            .status(200)
            .json({ message: 'ok', ctx: result.context, id: result.id })
        } catch (error) {
          throw new OrderError(error, 404)
        }
      }
    },
    {
      path: '/orders/:id',
      get: async (req, res, ports) => ports.findModel(req.params.id),
      patch: async (req, res, ports) => {
        try {
          const result = await ports.editModel({
            id: req.params.id,
            changes: req.body
          })
          res.status(200).json({ message: 'ok', ctx: result.context })
        } catch (error) {
          throw new OrderError(error, 404)
        }
      },
      delete: async (req, res, ports) => {
        ports.removeModel(req.params.id)
        res.status(200).json({ message: 'ok' })
      }
    }
  ],
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
    }
    // {
    //   on: 'deserialize',
    //   key: 'billingAddress',
    //   type: 'string',
    //   value: (key, value) => decrypt(value),
    //   enabled: false
    // }
  ]
}
