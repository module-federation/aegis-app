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
  //   factory: DataSourceAdapterMongoDb,
  //   url: "mongodb://localhost:27017",
  //   cacheSize: 2000,
  //   baseClass: "DataSourceMongoDb",
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
