/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const AccessController = {
  endpoint: 'access-controller',
  domain: 'queryengine',
  factory: dependencies => payload => ({ ...dependencies, ...payload }),
  ports: {
    callServiceMethod: {
      service: 'queryengine',
      type: 'inbound',
      timeout: 0
    }
  }
}
