import { uuid } from './utils';
import GlobalMixins from './mixins';
import { default as userConfig } from './user';
import { default as model2Config } from './model2';

/**
 * @callback onUpdate
 * @param {model: Model, changes: Object} changes
 */

/**
 * @typedef {Object} ModelConfig
 * @property {string} modelName
 * @property {function(...args): any} factory
 * @property {Array<import("./mixins").mixinFunction>} [mixins]
 * @property {onUpdate} [onUpdate]
 * @property {onDelete} [onDelete]
 */

/**
 * @param {ModelConfig} module 
 * @param {*} dependencies 
 */
function make(module, dependencies) {
  module.factory = module.factory(dependencies);
  module.mixins = module.mixins.concat(GlobalMixins);
}

make(userConfig, { uuid });
make(model2Config, {});

export {
  userConfig,
  model2Config
}





