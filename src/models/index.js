"use strict";

/**
 * @typedef {Object} Model
 * @property {string} id
 * @property {string} modelName
 * @property {string} createTime
 * @property {onUpdate} onUpdate
 * @property {onDelete} onDelete
 *
 * @callback onUpdate called to handle model updates
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model | Error} updated model or throw
 *
 * @callback onDelete
 * @param {Model} model
 * @returns {Model | Error} updated model or throw
 *
 * @callback onLoad
 * @param {Model} savedModel rehydrated model
 * @returns {Model | Error} updated model or throw
 *
 * @typedef {string} service - name of the service object to inject in adapter
 * @typedef {number} timeout - call to adapter will timeout after `timeout` milliseconds
 *
 * @typedef {{
 *  [x: string]: {
 *    service: service,
 *    timeout?: timeout,
 *    callback?: function({model: Model, port: string})
 *    errorCallback?: function({model: Model, port: string, error:Error}),
 *    timeoutCallback?: function({model: Model, port: string}),
 *    consumesEvent?:string,
 *    producesEvent?:string,
 *    type?:'inbound'|'outbound',
 *    disabled?: boolean
 *    adapter?: string
 *  }
 * }} ports - input/output ports for the domain
 *
 * @typedef {Array<function({
 *  eventName:string,
 *  eventType:string,
 *  eventTime:string,
 *  modelName:string,
 *  model:Model
 * }):Promise<void>>} eventHandler - callbacks invoked to handle domain and application events
 *
 * @typedef {string} key
 * @typedef {*} value
 * @typedef {{
 *  on: "serialize" | "deserialize",
 *  key: string | RegExp | "*" | (function(key,value):boolean)
 *  type: "string" | "object" | "number" | "function" | "any" | (function(key,value):boolean)
 *  value(key, value):value
 * }} serializer
 *
 * @typedef {Object} ModelSpecification Specify model data and behavior
 * @property {string} modelName name of model (case-insenstive)
 * @property {string} endpoint URI reference (e.g. plural of `modelName`)
 * @property {function(...args): any} factory factory function that creates model
 * @property {object} [dependencies] injected into the model for inverted control
 * @property {Array<import("./mixins").mixinFunction>} [mixins] - functional mixins are mixed into the model to implement domain logic, like input validation
 * @property {onUpdate} [onUpdate] - function called to handle update requests
 * @property {onDelete} [onDelete] - function called before deletion
 * @property {onLoad} [onLoad] - function called after deserialization - used to perform any custom unmarshalling of the model.
 * @property {ports} [ports] - input/output ports for the domain
 * @property {eventHandler[]} [eventHandlers] - callbacks invoked to handle application events, e.g. CRUD events
 * @property {serializer[]} [serializers] - when a model is deserialzed, the model's saved properties are used in the new model. Because mixins are run, serializer callbacks may be needed to format the deserialized properties, e.g. if the information was stored in encrypted format we don't want to encrypt it again.
 */

import GlobalMixins from "./mixins";
import makeAdapters from "./make-adapters";

// Service dependencies
import * as services from "../services-mock";
import * as adapters from "../adapters";

// Models
import * as modelConfigs from "../model-config";

const requiredProps = ["modelName", "endpoint", "factory"];

function validateModel(model) {
  const missing = requiredProps.filter((p) => !model[p]);
  if (missing?.length > 0) {
    throw new Error(
      `missing properties: ${missing} > ${Object.entries(model)}`
    );
  }
}

/**
 * @param {ModelSpecification} model
 * @param {*} dependencies - services injected
 */
function makeModel(model) {
  validateModel(model);
  const mixins = model.mixins || {};
  const dependencies = model.dependencies || {};
  return {
    ...model,
    mixins: mixins.concat(GlobalMixins),
    dependencies: {
      ...dependencies,
      ...makeAdapters(model.ports, adapters, services),
    },
  };
}

const models = Object.values(modelConfigs).map((model) => makeModel(model));

export { models };
