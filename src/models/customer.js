'use strict'
import onUpdate from './on-update';

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  hashPasswordsMixin
} from './mixins'

/**
 * @type {import('./index').ModelConfig}
 */
export default {

  modelName: 'customer',
  factory: ({ getOrders, getUser }) => {
    return function createCustomer({
      userId,
      company
    } = {}) {

      return Object.freeze({
        userId,
        company,
        getOrders,
        getUser
      });
    }
  },
  mixins: [
    requirePropertiesMixin(
      'userId'
    ),
    freezePropertiesMixin(
      'userId'
    ),
    // lookUpRelatedValue(
    //   'user', 
    //   'userId'
    // )
  ],

  ...onUpdate

}


