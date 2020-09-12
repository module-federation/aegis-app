import crypto from 'crypto';
import DefineModels from "./define-models";
import createModel1Factory, {
  validateModel1Factory
} from './model1';
import createModel2Factory from './model2';
import mixins, { redact } from './mixins';


function hash(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

const models = new DefineModels();

models.add({
  modelName: 'model1',
  factory: createModel1Factory(hash),
  isValid: validateModel1Factory(),
  handler: async (event) => {
    console.log(`event handler >>> ${event.eventName}`);
  },
  mixins: mixins
});

models.add({
  modelName: 'model2',
  factory: createModel2Factory(),
  mixins: [redact]
});

export default models;
