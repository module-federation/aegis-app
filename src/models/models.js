import {
  hash,
  uuid,
  requireParams as rp
} from '../lib/utils';
import DefineModels from "./define-models";
import createUserFactory, {
  validateUser,
  handleUserEvent
} from './user';
import createModel2 from './model2';
import {
  encryptProperties,
  requireProperties
} from './mixins';

const models = new DefineModels();

models.add({
  modelName: 'user',
  factory: createUserFactory(hash, uuid, rp),
  isValid: validateUser,
  handler: handleUserEvent,
  mixins: [requireProperties(
    'userName', 
    'password',
    'lastName'
  )]
});

models.add({
  modelName: 'model2',
  factory: createModel2,
  mixins: [encryptProperties('field1')]
});

export default models;
