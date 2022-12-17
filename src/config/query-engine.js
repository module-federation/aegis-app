/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const QueryEngine = {
  modelName: 'QueryEngine',
  endpoint: 'query-engine',
  domain: 'queryengine',
  factory: dependencies => payload => ({ ...dependencies, ...payload }),
  ports: {
    qeRunFibonacci: {
      service: 'QE',
      type: 'inbound',
      timeout: 0
    },
    qeCustomHttpStatus: {
      service: 'QE',
      type: 'inbound',
      timeout: 0
    },
    qeGetPublicIpAddressIn: {
      service: 'QE',
      type: 'inbound',
      timeout: 0
    },
    qeGetPublicIpAddressOut: {
      service: 'QE',
      type: 'outbound',
      timeout: 500,
      circuitBreaker: {
        default: {
          callVolume: 100,
          intervalMs: 20,
          errorRate: 30
        }
      }
    }
  }
}
