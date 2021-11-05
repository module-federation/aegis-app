/**
 * @type {import('../domain/index').ModelSpecification}
 */
const Catalog = {
  modelName: 'catalog',
  endpoint: 'catalogs',
  factory: dependencies => (...args) => Object.freeze({ args: args })
}
