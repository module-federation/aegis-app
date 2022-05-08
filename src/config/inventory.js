'use strict'

import { DataSourceAdapterMongoDb } from '../adapters/datasources/datasource-mongodb'
import {
  makeInventoryFactory,
  assetTypes,
  properties,
  categories
} from '../domain/inventory'

import {
  requireProperties,
  freezeProperties,
  validateProperties
} from '../domain/mixins'

/**
 * @type {import("../domain/order").ModelSpecification}
 */
export const Inventory = {
  modelName: 'inventory',
  endpoint: 'inventory',
  dependencies: {},
  factory: makeInventoryFactory,
  // datasource: {
  //   factory: DataSourceAdapterMongoDb,
  //   url: 'mongodb://127.0.0.1:27017',
  //   cacheSize: 4000,
  //   baseClass: 'DataSourceMongoDb'
  // },
  mixins: [
    requireProperties('name', 'inStock', 'category', 'price', 'purchaseOrder'),
    validateProperties([
      {
        propKey: 'inStock',
        typeof: 'number',
        maxnum: 99999
      },
      {
        propKey: 'category',
        values: categories
      },
      {
        propKey: 'assetType',
        values: assetTypes
      },
      {
        propKey: 'properties',
        isValid: (_obj, prop) => prop.every(p => properties.includes(p))
      },
      {
        propKey: 'price',
        typeof: 'number',
        maxnum: 999.99
      }
    ]),
    freezeProperties('*')
  ],
  relations: {
    orders: {
      modelName: 'order',
      type: 'oneToMany',
      foreignKey: 'itemId',
      desc: 'many items per order'
    }
  }
}
