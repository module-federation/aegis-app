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
      timeout: 3000
    }
  }
}
