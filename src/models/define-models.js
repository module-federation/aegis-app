import Mixins from './mixins';

/**
 * @callback modelFactory
 * @param {*} args 
 */

/**
 * @typedef {{
 *  modelName: string, 
 *  factory: modelFactory, 
 *  isValid: function(pq4): boolean, 
 *  handler: function(): Promise<void>,
 *  mixins: Array<import("./mixins").mixinFunction>
 * }} ModelDef
 */

/**
 * @typedef {Set<ModelDef>} DefineModels 
 */

/**
 * @type {DefineModels}
 * @extends Set
 */
export default class DefineModels extends Set {
  /**
   *
   * @param {Iterable<ModelDef>} models
   */
  constructor(models) {
    super(models);
  }

  /**
   * @override
   * @param {ModelDef} param0
   */
  add({
    modelName,
    factory,
    isValid,
    handler,
    mixins = []
  }) {
    super.add({
      modelName,
      factory,
      isValid,
      handler,
      mixins: Mixins.concat(mixins) // global
    });
  }


}
