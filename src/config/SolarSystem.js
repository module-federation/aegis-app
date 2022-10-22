/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const SolarSystem = {
  endpoint: 'SolarSystems',
  modelName: 'SolarSystem',
  domain: 'galaxy',
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
    receiveGalacticSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'galacticSignalSent',
      producesEvent: 'galacticSignalReceived'
    },
    sendSolarSignal: {
      service: 'Cosmos',
      type: 'inbound',
      timeout: 1000,
      consumesEvent: 'galacticSignalReceived',
      producesEvent: 'sendSolarSignal'
    }
  }
}
