/**
 * @type {import('./index').ModelSpecification}
 */
export async function listSolarSystemsPort (data) {
  console.log({ data })
  const result = await this.listRelated('SOLARSYSTEM', {
    options: { filter: { galaxyId: data.id } }
  })
  console.log({ result })
  return { result }
}
