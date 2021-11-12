'use strict'

import { makeInventoryFactory } from '../domain/inventory'
import { requireProperties, freezeProperties } from '../domain/mixins'
import { uuid } from '../domain/utils'

/**
 * @type {import("../domain/order").ModelSpecification}
 */
export const Inventory = {
  modelName: 'inventory',
  endpoint: 'inventory',
  dependencies: { uuid },
  factory: makeInventoryFactory,
  mixins: [
    requireProperties('category', 'properties', 'price'),
    freezeProperties('*')
  ]
}
