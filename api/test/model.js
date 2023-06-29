const Litehouse = require('..')
const litehouse = new Litehouse()
const test = require('node:test')
const assert = require('node:assert')

const MODEL = 'classifier'
const INSTANCE = 'birds'
const METHOD_CLASSIFY = 'classify'
const METHOD_IMPORTDB = 'importDb'

const Classifier = (msg, deps) => ({
  desc: msg.desc,
  classdb: msg.classdb,
  async [METHOD_IMPORTDB] () {
    await import(this.classdb) // federated module
  },
  [METHOD_CLASSIFY] (msg) {
    return require(this.classdb).classify(msg.readableStream)
  }
})

test('model', () => {
  litehouse.addModel(MODEL, Classifier, {
    export: [METHOD_IMPORTDB, METHOD_CLASSIFY]
  })

  litehouse.listen()

  return Promise.all([
    litehouse
      .httpClient(`localhost:8080/models/${MODEL}`, {
        method: 'post',
        body: { desc: 'for birder.com', classdb: 'mlrepo/birds' },
        headers: { idempotencyKey: INSTANCE }
      })
      .then(msg => Promise.resolve(assert.equal(msg.modelId, INSTANCE)))
      .catch(err => Promise.reject(err)),

    litehouse
      .httpClient(
        `localhost:8080/models/${MODEL}/${INSTANCE}/${METHOD_IMPORTDB}`,
        {
          method: 'put'
        }
      )
      .then(msg => Promise.resolve(assert.equal(msg.modelId, INSTANCE)))
      .catch(err => Promise.reject(err)),

    litehouse
      .httpClient(
        `localhost:8080/models/${MODEL}/${INSTANCE}/${METHOD_CLASSIFY}`,
        {
          method: 'put',
          file: 'bird.jpg'
        }
      )
      .then(msg => Promise.resolve(assert.equal(msg.name, 'bald eagle')))
      .catch(err => Promise.reject(err))
  ])
})

test('remote import', async () => {
  const litehouse = new Litehouse()
  const fs = require('fs')
  const factory = litehouse.import('models/classifier')
  const model = factory({ classdb: 'birds' })
  await model.importDb()
  const result = model.classify(fs.createReadStream('bird.jpg'))
  assert.equal(result.name, 'bald eagle')
})
