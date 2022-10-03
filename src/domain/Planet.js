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

export async function receiveSignal (data) {
  console.log({ fn: receiveSignal.name, o: 'Planet' })
}

export async function sendSignal (data) {
  console.log({ fn: sendSignal.name, o: 'Planet' })
}
