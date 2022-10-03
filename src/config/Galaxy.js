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
      service: 'Cosmos',
      type: 'inbound',
      timeout: 0
    },
    broadcastGalaticSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 0,
      consumesEvent: 'broadcastGalaticSignal',
      producesEvent: 'galacticSignalBroadcasting'
    }
  }
}
