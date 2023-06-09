import { dependencies } from 'webpack'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const TicketMaster = {
  modelName: 'TicketMaster',
  endpoint: 'ticket-master',
  domain: 'TicketMaster',
  factory: dependencies => payload => ({ ...dependencies, ...payload }),
  ports: {
    tmListEventsIn: {
      service: 'TicketMaster',
      type: 'inbound',
      timeout: 0
    },
    tmListEventsOut: {
      service: 'TicketMaster',
      type: 'outbound',
      timeout: 500,
      circuitBreaker: {
        default: {
          callVolume: 20,
          errorRate: 25,
          fallbackFn: () => console.log('fallback')
        }
      }
    }
  },
  routes: [
    {
      get: (req, res, api) => {
        return api.getService('ticketmaster').tmListEventsOut(res)
      }
    }
  ]
}
