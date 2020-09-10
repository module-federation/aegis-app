/**
 * @typedef {{modelName: string, factory: function(): any, isValid?: function(): boolean, handler?: function(): Promise<void> }} ModelDef
 */

/**
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
  add({ modelName, factory, isValid, handler }) {
    super.add({ modelName, factory, isValid, handler });
  }

}
