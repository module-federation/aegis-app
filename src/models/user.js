'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
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
    return async function createUser({
      userName, password, firstName, lastName, phone, email
    } = {}) {
      return Object.freeze({
        userId: uuid(),
        password, userName, firstName, lastName, phone, email
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
    hashPasswordsMixin(
      'password'
    ),
  ],

  onUpdate: processUpdate,

}

export default User;
