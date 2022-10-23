'use strict'

/**
 * @type {import('./index').ModelSpecification}
 */
export async function systemsInGalaxy (data) {
  console.log({ data })
  const systems = await this.list({
    query: { galaxyId: data.galaxyId || data.args.galaxyId }
  })
  console.log({ systems })
  return systems
}

export async function receiveGalacticSignal (data) {
  console.log({ fn: receiveGalacticSignal.name, o: 'SolarSystem' })
}

export async function sendSolarSignal (data) {
  console.log({ fn: sendSolarSignal.name, o: 'SolarSystem' })
}
