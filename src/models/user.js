'use strict'

import onUpdate from './on-update';

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  allowPropertiesMixin,
  hashPasswordsMixin,
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

  ...onUpdate

}

export default User;
