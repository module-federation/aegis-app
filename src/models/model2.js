'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin
} from './mixins';

import onUpdate from './on-update';

/**
 * @type {import('./index').ModelConfig}
 */
export default {
  modelName: 'model2',
  factory: () => {
    return ({ field1, field2 }) => {
      return Object.freeze({
        field1,
        field2
      });
    }
  },
  mixins: [
    requirePropertiesMixin(
      'field1',
      'field2'
    ),
    freezePropertiesMixin(
      'field1'
    )
  ],

  ...onUpdate,

  onDelete: (model) => {
    console.log(`deleting: ${model}`);
  }
}


