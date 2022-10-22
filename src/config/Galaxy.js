'use strict'

/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Galaxy = {
  endpoint: 'Galaxies',
  modelName: 'Galaxy',
  domain: 'galaxy',
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
      service: 'Cosmos',
      type: 'inbound',
      timeout: 0
    },
    sendGalaticSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'sendGalacticSignal',
      producesEvent: 'galacticSignalSent'
    }
  }
}
