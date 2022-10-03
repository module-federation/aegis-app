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
  },
  ports: {
    systemsInGalaxy: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 0
    },
    receiveGalacticBroadcast: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'galacticSignalBroadcasting',
      producesEvent: 'galacticSignalReceived'
    },
    broadcastSolarSystemSignal: {
      service: 'Cosmos',
      type: 'outbound',
      timeout: 0,
      consumesEvent: 'galacticSignalReceived',
      producesEvent: 'solarSystemSignalBroadcast'
    }
  }
}
