'use strict'

import {
  requireProperties,
  freezeProperties
} from './mixins'

export default {
  modelName: 'user',
  factory: ({ hash, uuid }) => {
    return function ({
      userName,
      password,
      firstName,
      lastName,
      email
    } = {}) {
      if (!password) {
        throw new Error('password required');
      }
      return Object.freeze({
        userId: uuid(),
        password: hash(password),
        userName,
        firstName,
        lastName,
        email
      });
    }
  },
  mixins: [
    requireProperties(
      'userName',
      'password',
      'firstName'
    ),
    freezeProperties(
      'userId',
      'userName'
    )
  ],
  onUpdate: ({ model, changes }) => {
    model.requireProperties();
    model.freezeProperties(changes);
  },
  onDelete: model => console.log(model),
}


