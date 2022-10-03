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
      consumesEvent: 'planetSignalRequested',
      producesEvent: 'planetSignalReceived'
    },
    sendSignal: {
      service: 'Galaxy',
      type: 'outbound ',
      timeout: 0,
      consumesEvent: 'planetSignalRecevied',
      producesEvent: 'planet'
    }
  }
}
