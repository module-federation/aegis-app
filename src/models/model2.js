import {
  requireProperties,
  freezeProperties,
} from './mixins';

/**
 * @typedef {Object} Model
 * @property {String} id - unique id
 * @property {String} modelName - model name
 * @property {String} createTime - time created
 * @property {Function} [isValid] - check model is valid
 */

/**
 * @typedef {Object} Event
 * @property {EventType} eventType
 * @property {String} eventName
 * @property {String} eventTime
 * @property {String} modelName
 * @property {Object} modelData
 * @property {String} id
 */

/**
 * @callback eventHandler
 * @param Event
 */

/**
 * @callback onUpdate
 * @param {model: Model, changes: Object} changes
 */

/**
 * @callback onDelete
 * @param {Model} model
 */

/**
 * @typedef {Object} ModelConfig
 * @property {string} modelName
 * @property {function(...args): any} factory
 * @property {Object} [eventHandlers]
 * @property {eventHandler[]} [eventHandlers.onCreate]
 * @property {eventHandler[]} [eventHandlers.onUpdate]
 * @property {eventHandler[]} [eventHandlers.onDelete]
 * @property {Array<import("./mixins").mixinFunction>} [mixins]
 * @property {Object} [validate]
 * @property {onUpdate} [validate.onUpdate]
 * @property {onDelete} [validate.onDelete]
 * 
 */

/**
 * @type {ModelConfig}
 */
export default {
  modelName: 'model2',
  factory: () => {
    return ({ field1, field2 }) => {
      return Object.freeze({
        field1,
        field2
      });
    }
  },
  mixins: [
    requireProperties(
      'field1',
      'field2'
    ),
    freezeProperties(
      'field1'
    )
  ],
  onUpdate: ({model, changes}) => {
    model.requireProperties();
    model.freezeProperties(changes);
  },
  onDelete: (model) => {
    console.log(`deleting: ${model}`);
  }
}


