'use strict'

/**
 * @type {import('./index').ModelSpecification}
 */
export async function listSolarSystems (data) {
  console.log({ data })
  const solarSystem = await this.fetchRelatedModel('SOLARSYSTEM')
  console.log({ msg: 'result of', fn: this.fetchRelatedModel.name, solarSystem })
  return {
    SOLARSYSTEMS: await solarSystem.systemsInGalaxy({ galaxyId: data.id })
  }
}

export async function sendGalaticSignal (data) {
  console.log({ fn: sendGalaticSignal.name, o: 'Galaxy', msg: 'port function invoked', data })
}
