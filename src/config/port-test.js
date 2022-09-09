'use strict'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const PortTest = {
  modelName: 'PortTest',
  endpoint: 'port-test',
  factory: dependencies => (...args) =>
    Object.freeze({ ...dependencies, args }),
  ports: {
    test: {
      service: 'test',
      type: 'inbound',
      timeout: 0,
      callback: ({ model, payload }) => ({
        payload: { ...payload, altered: 'by callback' }
      }),
      path: '/tyson-port'
    },
    cancelOrders: {
      type: 'inbound',
      service: 'test'
    }
  }
}
