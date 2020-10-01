
'use strict'
import { compose } from './utils';
import { 
  mixinType, 
  mixinSets,
  PREVMODEL 
} from './mixins';

const pre = mixinSets[mixinType.pre];
const post = mixinSets[mixinType.post];

export default {
  onUpdate: (model, changes) => {
    changes[PREVMODEL] = model; // keep history

    const updates = model[pre]
      ? compose(...model[pre].values())(changes)
      : changes;

    const updated = { ...model, ...updates };

    return model[post]
      ? compose(...model[post].values())(updated)
      : updated;
  }
}


