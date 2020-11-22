'use strict'

import {
  requirePropertiesMixin,
  freezePropertiesMixin,
  processUpdate,
} from './mixins';


/**
 * @type {import('./index').ModelSpecification}
 */
const Workflow = {
  modelName: 'workflow',
  endpoint: 'workflows',
  ports: {
    run: {

    }
  },
  factory: function ({ uuid }) {
    /**@param {{model: import('./index').ModelSpecification}} */
    return async function createWorkflow({
      workflowName,
      model,
    } = {}) {
      return Object.freeze({

        workflowName,
        model
      });
    }
  },

  mixins: [
    requirePropertiesMixin(
      'workflowName',
      'modelName',
    ),
    freezePropertiesMixin(
      'workflowName',
      'modelName',
    ),
  ],

  onUpdate: processUpdate,

}