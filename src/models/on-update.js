
'use strict'
import { compose } from './utils';
import {
  mixinType,
  mixinSets,
  PREVMODEL
} from './mixins';

const PREMIXINS = mixinSets[mixinType.pre];
const POSTMIXINS = mixinSets[mixinType.post];

export default {
  onUpdate: (model, changes) => {
    changes[PREVMODEL] = model; // keep history

    const updates = model[PREMIXINS]
      ? compose(...model[PREMIXINS].values())(changes)
      : changes;

    const updated = { ...model, ...updates };

    return model[POSTMIXINS]
      ? compose(...model[POSTMIXINS].values())(updated)
      : updated;
  }
}


