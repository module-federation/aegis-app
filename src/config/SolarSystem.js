/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const SolarSystem = {
  endpoint: 'SolarSystems',
  modelName: 'SolarSystem',
  factory: () => args => ({ ...args }),
  relations: {
    galaxy: {
      modelName: 'Galaxy',
      type: 'manyToOne',
      foreignKey: 'galaxyId'
    }
  }
}
