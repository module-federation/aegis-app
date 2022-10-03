'use strict'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Galaxy = {
  endpoint: 'Galaxies',
  modelName: 'Galaxy',
  factory: () => args => ({ ...args }),
  relations: {
    solarSystems: {
      modelName: 'SolarSystem',
      type: 'oneToMany',
      foreignKey: 'galaxyId'
    }
  },
  ports: {
    listSolarSystems: {
      service: 'Cosmology',
      type: 'inbound',
      timeout: 0
    }
  }
}
