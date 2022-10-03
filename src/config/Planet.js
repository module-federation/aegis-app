/**
 * @type {import('../domain/index').ModelSpecification}
 */
export const Planet = {
  endpoint: 'planets',
  modelName: 'Planet',
  factory: () => args => ({ ...args }),
  relations: {
    solarSystem: {
      modelName: 'SolarSystem',
      type: 'manyToOne',
      foreignKey: 'solarSysId'
    }
  },
  ports: {
    planetsInSolarSystem: {
      service: 'Galaxy',
      type: 'inbound',
      timeout: 0
    },
    receiveSignal: {
      service: 'Galaxy',
      type: 'inbound',
      timeout: 0,
      consumesEvent: 'solarSystemSignalBroadcasting',
      producesEvent: 'solarSystemSignalReceived'
    },
    sendSignal: {
      service: 'Galaxy',
      type: 'outbound ',
      timeout: 0,
      consumesEvent: 'solarSystemSignalReceived',
      producesEvent: 'notifyPlanet'
    }
  }
}
