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
    listSolarSystemsPort: {
      service: 'Cosmology',
      type: 'inbound',
      timeout: 0
      //path: '/galaxies/:id/:port'
    }
  }
}
