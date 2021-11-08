/**
 * @type {import('../domain/index').ModelSpecification}
 */
const Catalog = {
  modelName: 'catalog',
  endpoint: 'catalogs',
  factory: dependencies => (...args) => Object.freeze({ args: args }),
  ports: {
    myPort: {
      service: 'myService',
      timeout: 0,
      circuitBreaker: {
        default: {
          callVolume: 100,
          intervalMs: 6000,
          errorRate: 25,
          fallbackFn: data => {
            console.log('do this', data)
          }
        },
        conntimeout: {}
      },
      consumesEvent: 'executeMyPort',
      producesEvent: 'myPortExecuted',
      callback: () => null,
      type: 'outbound'
    }
  }
}
