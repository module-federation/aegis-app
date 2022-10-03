'use strict'

/**
 * @type {import('./index').ModelSpecification}
 */
export async function systemsInGalaxy (data) {
  console.log({ data })
  const systems = await this.list({
    options: { filter: { galaxyId: data.id } }
  })
  console.log({ systems })
  return systems
}

export async function receiveGalacticBroadcast (data) {
  console.log({ fn: receiveGalacticBroadcast.name, o: 'SolarSystem' })
}

export async function broadcastSolarSystemSignal (data) {
  console.log({ fn: broadcastSolarSystemSignal.name, o: 'SolarSystem' })
}
