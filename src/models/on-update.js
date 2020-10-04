
'use strict'

import { processUpdate } from './mixins';

/**
 * Callback invoked on update. 
 */
export default {
  /**
   * Callback invoked on update
   * @param model - current model
   * @param changes - object containing changes
   * @returns updated model
   */
  onUpdate: (model, changes) => processUpdate(model, changes)
}


