'use strict'

import { requireProperties, freezeProperties } from '../domain/mixins'
import { uuid } from '../domain/utils'

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
      path: '/accounts/:id/detail',
      /**
       *
       * @param {Request} req
       * @param {Response} res
       * @param {import('../domain/index').DomainPortAPI} ports
       * @returns
       */
      get: async (req, res, ports) => {
        const model = await ports.addModel(req.body)
        res.status(200).send(
          JSON.stringify(
            await ports.findModel({
              id: model.id,
              query: req.query
            })
          )
        )
      },
      post: async (req, res, ports) =>
        res.status(200).send(await ports.addModel(req.body))
    },
    {
      path: '/accounts/:id/members/count',
      get: async (req, res, ports) =>
        res.json({
          count: await (await ports.findModel({ id: req.params.id })).members()
            .length
        })
    }
  ]
}
