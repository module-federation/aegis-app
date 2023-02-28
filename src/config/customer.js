'use strict'

import {
  validateModel,
  freezeProperties,
  validateProperties,
  requireProperties
} from '../domain/mixins'
import { makeCustomerFactory, okToDelete } from '../domain/customer'
import { DataSourceAdapterMongoDb } from '../adapters/datasources/datasource-mongodb'
import { nanoid } from 'nanoid'
import { DataSourceAdapterCustomer } from '../adapters/datasources/datasource-adapter-customer'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Customer = {
  modelName: 'customer',
  endpoint: 'customers',
  dependencies: { uuid: () => nanoid(8) },
  factory: makeCustomerFactory,
  validate: validateModel,
  onDelete: okToDelete,
  // datasource: {
  //   factory: DataSourceAdapterCustomer,
  //   cacheSize: 4000,
  //   baseClass: 'DataSourceFile'
  // },
  mixins: [
    freezeProperties('customerId'),
    requireProperties(
      'firstName',
      'lastName',
      'email',
      'shippingAddress',
      'billingAddress',
      'creditCardNumber'
    ),
    validateProperties([
      {
        propKey: 'email',
        // unique: { encrypted: true },
        regex: 'email'
      },
      {
        propKey: 'creditCardNumber',
        regex: 'creditCard'
      }
    ])
  ],
  relations: {
    orders: {
      modelName: 'order',
      type: 'oneToMany',
      foreignKey: 'customerId'
    }
  },
  commands: {
    decrypt: {
      command: 'decrypt',
      acl: ['read', 'decrypt']
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
  ports: {
    runFibonacciCust: {
      service: 'customer',
      type: 'inbound',
      timeout: 0
    },
    doesFieldExist: {
      service: 'customer',
      type: 'inbound',
      timeout: 0
    }
  },
  accessControlList: {
    customer: {
      allow: 'read',
      type: 'relation',
      desc: 'Allow orders to see customers.'
    }
  }
}
