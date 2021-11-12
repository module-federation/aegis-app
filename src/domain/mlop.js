'use strict'

const { models } = require('.')

/**
 * Machine Learning Operation - Operations ML deployment
 * @type {import(".").ModelSpecification}
 */
const MLOp = {
  modelName: 'mlop',
  endpoint: 'ml-ops',
  factory: deps => (...args) => Object.freeze({ args, deps })
}

exports = MLOp
