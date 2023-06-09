/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const DigitalAssetMgmt = {
  modelName: 'DigitalAssetMgmt',
  endpoint: 'dam',
  domain: 'DigitalAssetMgmt',
  factory: dependencies => payload => ({ ...dependencies, ...payload }),
  ports: {
    damUploadIn: {
      service: 'dam',
      type: 'inbound',
      timeout: 0
    },
    damSearchIn: {
      service: 'dam',
      type: 'inbound',
      timeout: 0
    },
    damBrowseIn: {
      service: 'dam',
      type: 'inbound',
      timeout: 0
    },
    damDownloadIn: {
      service: 'dam',
      type: 'inbound',
      timeout: 0
    },
    damDownloadOut: {
      service: 'dam',
      type: 'outbound',
      timeout: 500,
      circuitBreaker: {
        default: {
          callVolume: 100,
          intervalMs: 20,
          errorRate: 30
        }
      }
    },
    damUploadOut: {
      service: 'dam',
      type: 'outbound',
      timeout: 500,
      circuitBreaker: {
        default: {
          callVolume: 100,
          intervalMs: 20,
          errorRate: 30
        }
      }
    },
    damSearchOut: {
      service: 'dam',
      type: 'outbound',
      timeout: 500,
      circuitBreaker: {
        default: {
          callVolume: 100,
          intervalMs: 20,
          errorRate: 30
        }
      }
    },
    damBrowseOut: {
      service: 'dam',
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
