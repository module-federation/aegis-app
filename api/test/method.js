const test = require('node:test')
const assert = require('node:assert')
const litehouse = new Litehouse()

const MODEL = 'math'
const METHOD = 'fibonacci'

test('method', async () => {
  const model = litehouse.addModel(MODEL, msg => ({
    name: 'math',
    desc: 'various mathematical functions'
  }))

  model.addMethod(METHOD, (msg, model) => {
    const start = Date.now()
    function fibonacci () {
      if (x === 0) {
        return 0
      }
      if (x === 1) {
        return 1
      }
      return fibonacci(x - 1) + fibonacci(x - 2)
    }
    const param = parseFloat(msg.fibonacci)
    return {
      answer: fibonacci(Number.isNaN(param) ? 10 : param),
      time: Date.now() - start
    }
  })

  litehouse.listen()

  return litehouse
    .httpClient(`localhost:8080/models/${MODEL}/${METHOD}`, {
      method: 'put',
      body: { fibonacci: 40 }
    })
    .then(msg => Promise.resolve(assert.equal(msg.answer, 1000000)))
    .catch(err => Promise.reject(err))
})

test('override', () => {
  const decorate = require('./models/dependencies/classifier/decorate')
  const litehouse = new Litehouse()
  const model = Litehouse.importRemote('models/classifier')

  // overrides generated method, see model.js
  model.addMethod('classify', (msg, model) =>
    decorate(model.classify(msg.readable))
  )
})
