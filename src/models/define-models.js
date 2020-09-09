/**
 * @typedef {{modelName: string, factory: function(): any, isValid?: function(): boolean}} ModelDef
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
  add({ modelName, factory, isValid = () => true }) {
    super.add({ modelName, factory, isValid });
  }

}
