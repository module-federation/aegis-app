'use strict'

import { validateModel } from '../domain/mixins'
import { userFactory, userMixins } from '../domain/user'
import { uuid } from '../domain/utils'

/**
 * @type {import('../domain').ModelSpecification}
 */
export const User = {
  endpoint: 'users',
  dependencies: { uuid },
  factory: userFactory,
  mixins: userMixins,
  validate: validateModel,
  ports: {
    authenticate: {
      service: 'auth',
      type: 'inbound'
    },
    createWebToken: {
      service: 'auth',
      type: 'outbound'
    },
    verifyWebToken: {
      service: 'auth',
      type: 'outbound'
    },
    authorize: {
      service: 'authz',
      type: 'inbound'
    },
    applyRateLimits: {
      service: 'authz',
      type: 'inbound'
    }
  },
  routes: [
    {
      path: '/users/login',
      post: (req, res, ports) => {
        const { userName, password } = req.body
        return ports.invokePort({
          port: 'authenticate',
          args: [userName, password]
        })
      }
    }
  ],
  relations: {
    customer: {
      foreignKey: 'customerId',
      type: 'oneToOne',
      modelName: 'customer'
    }
  }
}
