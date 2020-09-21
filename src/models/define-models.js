import GlobalMixins from './mixins';

/**
 * @callback modelFactory
 * @param {*} args 
 */

/**
 * @typedef {{
 *  modelName: string, 
 *  factory: modelFactory, 
 *  onUpdate: function({model: Object, changes: any[]}), 
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
export class DefineModels extends Set {
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
  add({ modelName, factory, onUpdate, handler, mixins }) {
    super.add({
      modelName,
      factory,
      onUpdate,
      handler,
      mixins: GlobalMixins.concat(mixins) // add global mixins
    });
  }
}

// export class ModelDefinition extends Set {

//   add({ modelName, factoryFn, eventHandlers, mixins = [] }) {
//     this._modelName = modelName;
//     this._factoryFn = factoryFn;
//     this._eventHandlers = eventHandlers;
//     this._mixins = mixins.concat(GlobalMixins);
//     super.add(this);
//   }
// }

