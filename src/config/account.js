'use strict'

import { requireProperties, freezeProperties } from '../domain/mixins'
import { uuid } from '../domain/utils'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Account = {
  endpoint: 'accounts',
  modelName: 'Account',
  dependencies: { uuid },
  factory: dependencies => ({
    name,
    recurly_code = null,
    billing_email,
    settings = null,
    slug = null,
    canonical_domain_id = null,
    account_favicons = [],
    account_logos = []
  } = {}) =>
    Object.freeze({
      id: dependencies.uuid(),
      name,
      created_at: Date.now(),
      updated_at: Date.now(),
      recurly_code,
      billing_email,
      settings,
      slug,
      canonical_domain_id,
      account_favicons,
      account_logos
    }),
  mixins: [
    requireProperties('name', 'billing_email'),
    freezeProperties('id', 'name', 'billing_email')
  ]
}
