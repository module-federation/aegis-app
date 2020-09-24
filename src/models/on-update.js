
'use strict'
import { compose } from './utils';

export default {
  onUpdate: (model, changes) => {
    if (model.preUpdateMixins) {
      changes = compose(...model.preUpdateMixins.values())(changes);
    }
    let updated = { ...model, ...changes };

    if (model.postUpdateMixins) {
      updated = compose(...model.postUpdateMixins.values())(updated);
    }
    return updated;
  }
}


