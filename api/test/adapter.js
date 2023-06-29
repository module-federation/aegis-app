test('import remote adapter', async () => {
  const litehouse = new Litehouse()
  const fs = require('fs')
  const adapter = litehouse.import('adapters/fedex')
  const model.addAdapter('shipping',adapter)
  await model.importDb()
  const result = model.classify(fs.createReadStream('bird.jpg'))
  assert.equal(result.name, 'bald eagle')
})