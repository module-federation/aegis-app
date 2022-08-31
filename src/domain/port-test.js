'use strict'

export function test (data) {
  console.log(data)
  this.save(data.id, JSON.stringify(data.args))
  return this.find(data.id)
}

export async function cancelOrders (data) {
  const cancelOrders = new Transform({
    objectMode: true,
    transform: (chunk, _encoding, done) => {
      if (chunk._id) delete chunk._id
      done(null, JSON.stringify({ ...chunk, modelName: 'WRONG' }))
    }
  })

  await this.list({
    filter: data.args.filter,
    writable: this.createWriteStream(),
    transform: cancelOrders,
    cache: false,
    serialize: false
  })

  return { status: 'ok' }
}
