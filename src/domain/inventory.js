'use strict'

export const assetTypes = ['rotating-asset', 'spare-part']
export const properties = ['height', 'length', 'width', 'weight', 'color']
export const categories = ['home', 'auto', 'business']

export const makeInventoryFactory = dependencies => ({
  category,
  properties,
  price,
  discount,
  name,
  desc,
  sku,
  purchaseOrder,
  vendor,
  inStock,
  assetType,
  quantity
}) =>
  Object.freeze({
    category,
    properties,
    price: price - (discount || 0.0),
    name,
    desc,
    sku,
    purchaseOrder,
    vendor,
    inStock,
    assetType,
    quantity
  })
