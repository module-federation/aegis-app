
'use strict'
import { compose } from './utils';
import { mixinType, mixinTypes } from './mixins';

const pre = mixinTypes[mixinType.pre];
const post = mixinTypes[mixinType.post];

export default {
  onUpdate: (model, changes) => {
    const updates = model[pre]
      ? compose(...model[pre].values())(changes)
      : changes;

    const updated = { ...model, ...updates };

    return model[post]
      ? compose(...model[post].values())(updated)
      : updated;
  }
}


