'use strict'

export * from './service-locator'
export * from './websocket-adapter'
export * from './address-adapter'
export * from './event-adapter'
export * from './inventory-adapter'
export * from './order-adapter'
export * from './payment-adapter'
export * from './shipping-adapter'
export * from './qe-public-ipaddr'
export * from './wasm-public-ipaddr'
export * from './dam-api'
export * from './ticket-master'

/**
 * @typedef {import('../domain').Model} Model
 * @typedef {function(function(eventCallback):Promise<Model>)} adapterFunction
 */
