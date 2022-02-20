'use strict'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Project = {
  modelName: 'project',
  endpoint: 'projects',
  factory: dependencies => (...args) => Object.freeze({ ...dependencies, args })
}
