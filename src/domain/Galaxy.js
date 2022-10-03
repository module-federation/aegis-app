'use strict'

/**
 * @type {import('./index').ModelSpecification}
 */
export async function listSolarSystems (data) {
  console.log({ data })
  // return { SOLARSYSTEMS: await this.solarSystems() }
  const solarSystem = await this.fetchRelatedModel('SOLARSYSTEM')
  console.log({ solarSystem })
  return { SOLARSYSTEMS: await solarSystem.systemsInGalaxy(data) }
}

export async function broadcastGalaticSignal (data) {
  console.log({ fn: receiveSignal.name, o: 'Galaxy' })
}
