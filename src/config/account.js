'use strict'

import { requireProperties, freezeProperties } from '../domain/mixins'
import { uuid } from '../domain/utils'
import { theLicRoute } from '../domain'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Account = {
  endpoint: 'accounts',
  modelName: 'account',
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
  ],
  relations: {
    members: {
      modelName: 'accountMembers',
      foreignKey: 'acctId',
      type: 'oneToMany',
      desc: 'acct has many members, member belongs to just 1 acct'
    }
  },
  routes: [
    {
      path: '/accounts/:id/members',
      get: async ({ req, res, api }) =>
        res.json(api.getModel(req.params.id).members()),
      post: async ({ req, res, api }) => res.json(api.addModel(req.body))
    },
    {
      path: '/accounts/:id/members/count',
      get: ({ req, res, api }) =>
        res.json({ count: api.getModel(req.params.id).members().length })
    },
    theLicRoute
  ]
}
