'use strict'

import { makeAssetFactory } from '../domain/asset';

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Asset = {
  modelName: 'asset',
  endpoint: 'assets',
  factory: makeAssetFactory
}