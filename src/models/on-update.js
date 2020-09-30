
'use strict'
import { compose } from './utils';

export default {
  onUpdate: (model, changes) => {
    const updates = model.preUpdateMixins
      ? compose(...model.preUpdateMixins.values())(changes)
      : changes;

    const updated = { ...model, ...updates };

    return model.postUpdateMixins
      ? compose(...model.postUpdateMixins.values())(updated)
      : updated;
  }
}


