const model = require('./models/classifier')
const decorate = require('./models/classifier/decorate')
const litehouse = new Litehouse()

// overrides generated method, see model.js
model.addMethod('classify', (msg, model) =>
  decorate(model.classify(msg.readable))
)

litehouse.listen()
