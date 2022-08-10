'use strict'

export * from './service-locator'
export * from './websocket-adapter'
export * from './address-adapter'
export * from './event-adapter'
export * from './inventory-adapter'
export * from './order-adapter'
export * from './payment-adapter'
export * from './shipping-adapter'

/**
 * @typedef {import('../domain').Model} Model
 * @typedef {function(function(eventCallback):Promise<Model>)} adapterFunction
 */
