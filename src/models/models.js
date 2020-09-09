import DefineModels from './define-models';
import createModel2Factory from './create-model2';

const models = new DefineModels();

models.add({
  modelName: 'model3',
  factory: createModel2Factory()
});

models.add({
  modelName: 'model4',
  factory: createModel2Factory()
});

export default models;
