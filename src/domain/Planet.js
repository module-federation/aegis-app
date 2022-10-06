'use strict'

/**
 * @type {import('./index').ModelSpecification}
 */
export async function planetsInSolarSystem (data) {
  console.log({ data })
  const systems = await this.list({
    options: { filter: { galaxyId: data.id } }
  })
  console.log({ systems })
  return systems
}

export async function receiveSolarSignal (data) {
  console.log({ fn: receiveSolarSignal.name, o: 'Planet' })
}

export async function sendSolarSignal (data) {
  console.log({ fn: sendSolarSignal.name, o: 'Planet' })
}
