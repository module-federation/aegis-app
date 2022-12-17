'use strict'
import { authorize, getAuthorizationStrategy } from '../domain/port-auth'

/**
 * Authorization plugin
 *
 * Default implementation
 */

/**
 * @type {import('../domain').ModelSpecification}
 */
export const PortAuth = {
  modelName: 'PortAuth',
  endpoint: 'portauth',
  domain: 'portauth',
  desc: 'Default port authorization plugin',
  factory: dependencies => input =>
    Object.freeze({
      module: input.module,
      strategy: input.strategy,
      secret: input.secret,
      apiKey: input.apiKey,
      disabled: input.disabled,
      options: input.options,
      ...dependencies,
      getAuthorizationStrategy,
      authorize
    })
}
