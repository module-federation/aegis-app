'use strict'

export const makeInventoryFactory = dependencies => ({
  category,
  properties,
  price,
  discount
}) =>
  Object.freeze({
    category,
    properties,
    price: price - discount || 0,
    itemId: dependencies.uuid()
  })
