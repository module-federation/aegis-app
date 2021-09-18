'use strict'

import { validateModel } from '../domain/mixins'
import { userFactory, userMixins } from '../domain/user'
import { uuid } from '../domain/utils'

/**
 * @type {import('../domain').ModelSpecification}
 */
export const User = {
  modelName: 'user',
  endpoint: 'users',
  dependencies: { uuid },
  factory: userFactory,
  mixins: userMixins,
  validate: validateModel,
  relations: {
    customer: {
      foreignKey: 'customerId',
      type: 'oneToOne',
      modelName: 'customer'
    }
  },
  commands: {
    runFibonacci: {
      command: model => {
        function run (x = model.fibonacci) {
          if (x === 0) {
            return 0
          }

          if (x === 1) {
            return 1
          }

          return fibonacci(x - 1) + fibonacci(x - 2)
        }
        return run(model.fibonacci)
      },
      acl: ['read', 'write']
    }
  }
}
