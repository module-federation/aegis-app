'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  allowPropertiesMixin,
  hashPasswordsMixin,
  processUpdate,
} from './mixins';

/**
 * @type {import('./index').ModelSpecification}
 */
const User = {
  modelName: 'user',
  endpoint: 'users',

  factory: function ({ uuid }) {
    console.log('User factory function called.');
    return async function createUser({
      userName,
      password,
      firstName,
      lastName,
      phone,
      email
    } = {}) {
      console.log(`User async function called: ${userName}, ${password}, ${firstName}`);
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
      if (model?.decrypt) {
        console.log(model.decrypt());
      }
    }
  ]
}

export default User;
