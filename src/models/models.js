import crypto from 'crypto';
import DefineModels from './define-models';
import createModel1Factory from './model1';
import createModel2Factory from './model2';

const models = new DefineModels();

function hash(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

models.add({
  modelName: 'model1',
  factory: createModel1Factory(hash),
  handler: async (event) => {
    console.log(`event handler >>>>>>>>>>> ${event.eventName}`);
  }
});

models.add({
  modelName: 'model2',
  factory: createModel2Factory()
});

export default models;
