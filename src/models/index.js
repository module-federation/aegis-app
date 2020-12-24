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
 * @property {object} dependencies injected into the model for inverted control
 * @property {Array<import("./mixins").mixinFunction>} [mixins] functional mixins
 * @property {onUpdate} [onUpdate] function called to handle update requests
 * @property {onDelete} [onDelete] function called before deletion
 * @property {ports} [ports] input/output ports for the domain
 * @property {Array<function({
 *  eventName:string,
 *  eventType:string,
 *  eventTime:string,
 *  modelName:string,
 *  model:Model
 * }):Promise<void>>} [eventHandlers] callbacks invoked when CRUD events occur
 * @property callbacks to execute during de/serialization of the model
 * @property {serializer[]} serializers
 */

import GlobalMixins from "./mixins";
import makeAdapters from "./make-adapters";

// Dependencies
import { uuid } from "../lib/utils";
import * as services from "../services-mock";
import * as adapters from "../adapters";

// Models
import UserConfig from "./user";
import OrderConfig from "./order-config";

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
function makeModel(model, dependencies) {
  validateModel(model);
  const mixins = model.mixins || {};
  return {
    ...model,
    dependencies: {
      ...dependencies,
      ...makeAdapters(model.ports, adapters, services),
    },
    mixins: mixins.concat(GlobalMixins),
  };
}

const User = makeModel(UserConfig, { uuid });
const Order = makeModel(OrderConfig, { uuid });

export { User, Order };
