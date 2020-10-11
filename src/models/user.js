'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  allowPropertiesMixin,
  hashPasswordsMixin,
  processUpdate,
  DECRYPT
} from './mixins';

/**
 * @type {import('./index').ModelConfig}
 */
const User = {
  modelName: 'user',
  endpoint: 'users',

  factory: ({ uuid }) => {
    return function createUser({
      userName,
      password,
      firstName,
      lastName,
      phone,
      email
    } = {}) {
      return Object.freeze({
        userId: uuid(),
        password,
        userName,
        firstName,
        lastName,
        phone,
        email
      });
    }
  },

  mixins: [
    requirePropertiesMixin(
      'userName',
      'password',
      'firstName'
    ),
    freezePropertiesMixin(
      'userId',
      'userName'
    ),
    allowPropertiesMixin(
      'userName',
      'password',
      'firstName',
      'lastName',
      'userId',
      'phone',
      'email'
    ),
    hashPasswordsMixin(
      'password'
    ),
  ],

  onUpdate: processUpdate,

  eventHandlers: [
    ({ model }) => {
      if (!model && !model[DECRYPT]) return;
      console.log('decrypted: %s', {
        ...model[DECRYPT](model)
      });
    }
  ]
}

export default User;
