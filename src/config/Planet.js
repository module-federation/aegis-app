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
    receiveSolarSignal: {
      service: 'Galaxy',
      type: 'inbound',
      timeout: 0,
      consumesEvent: 'solarSystemSignalSenting',
      producesEvent: 'solarSystemSignalReceived'
    },
    sendSolarSignal: {
      service: 'Galaxy',
      type: 'outbound ',
      timeout: 0,
      consumesEvent: 'solarSystemSignalReceived',
      producesEvent: 'notifyPlanet'
    }
  }
}
