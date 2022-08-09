'use strict'

export * from './service-locator'
export * from './websocket-adapter'
export * from './event-adapter'

/**
 * @typedef {import('../domain').Model} Model
 * @typedef {function(function(eventCallback):Promise<Model>)} adapterFunction
 */
