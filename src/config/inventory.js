'use strict'

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
