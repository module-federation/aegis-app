"use strict";

/**@typedef {string} eventName*/

/**
 * @typedef {Object} Model
 * @property {string} Symbol_id - immutable/private uuid
 * @property {string} Symbol_modelName - immutable/private name
 * @property {string} Symbol_createTime - immutable/private createTime
 * @property {onUpdate} Symbol_onUpdate - immutable/private update function
 * @property {onDelete} Symbol_onDelete
 * @property {function(Object)} update - use this function to update model
 * specify changes in an object
 * @property {function()} toJSON - de/serialization logic
 * @property {function(eventName,function(eventName,Model):void)} addListener listen for domain events
 * @property {function(eventName,Model):Promise<void>} emit emit domain event
 * @property {function(function():Promise<Model>):Promise<Model>} [port] - when a
 * port is configured, the framework generates a function to invoke it. When data
 * arrives on the port, depending on the implementation, the port's adapter invokes
 * the callback specified in the port configuration, or as an argument to the port
 * function. The callback returns an updated Model, and control is returned to the
 * caller. Optionally, an event is fired to trigger the next port function to run
 * @property {function():Promise<any>} [relation] - when you configure a relation,
 * the framework generates a function that your code can call to run the query
 * @property {function(*):*} [command] - the framework will call any model method
 * you specify when passed as a parameter or query in an API call.
 */

/**
 * @callback onUpdate called to handle model updates
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback onDelete
 * @param {Model} model
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback validate called to handle model updates
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model | Error} updated model or throw
 */

/**
 * @callback onLoad
 * @param {Model} savedModel rehydrated model
 * @returns {Model | Error} updated model or throw
 */

/** @typedef {string} service - name of the service object to inject in adapter*/
/** @typedef {number} timeout - call to adapter will timeout after `timeout` milliseconds*/

/**
 * @typedef threshold threshold at which breaker will trip
 * @property {number} errorRate - percentage of calls that threw an exception within last `intervalms` milliseconds
 * @property {number} callVolume - total number of calls within last `intervalms` milliseconds
 * @property {number} intervalms - period of time in which `callVolume` and `errorRate` took place
 * @property {number} retryDelay - milliseconds to wait before retrying the call
 * @property {function} fallbackFn - function to execute a workaround
 */

/**
 * @typedef {{
 *  [x: string]: threshold
 * }} circuitBreaker temporarily disable "short-circuit" calls to a unavailable service
 */

/**
 * @typedef port a port is an interface that controls input to, and output from, the domain
 * @property {string} service name of the service this port connects to
 * @property {"inbound"|"outbound"} type inbound port requires primary/driving adapter,
 * outbound port secondary/driven
 * @property {string} [timeout] milliseconds to wait for a response before retrying or failing.
 * specify 0 to disable, otherwise default value is used.
 * @property {function({Model},{})} [callback] called once data arrives on port
 * @property {function({model: Model, port: string, error:Error})} errorCallback
 * @property {function({model: Model, port: string})} timeoutCallback
 * @property {string} consumesEvent name of event that will cause this port to run
 * @property {string} producesEvent name of event emitted after this port runs
 * @property {boolean} [disabled] set to true to prevent this port from being used, default is false
 * @property {string} [adapter] name of the adapter to bind to this port. By default binds adapter
 * with same name as port
 * @property {function()} [undo] function to run to reverse the effects of calling this port
 * @property {circuitBreaker} circuitBreaker
 */

/**
 * @typedef {{
 *  [x: string]: port
 * }} ports - input/output ports for the domain
 */

/**
 * @typedef {{
 *  [x: string]: {
 *    modelName:string,
 *    type:"oneToMany"|"manyToOne",
 *    foreignKey:any,
 *  }
 * }} relations - define related domain entities
 */

/**
 * @typedef {Array<function({
 *  eventName:string,
 *  eventType:string,
 *  eventTime:string,
 *  modelName:string,
 *  model:Model
 * }):Promise<void>>} eventHandler - callbacks invoked to handle domain and
 * application events
 */

/**
 *
 * @typedef {string} key
 * @typedef {*} value
 */

/**
 * @typedef {{
 *  on: "serialize" | "deserialize",
 *  key: string | RegExp | "*" | (function(key,value):boolean)
 *  type: "string" | "object" | "number" | "function" | "any" | (function(key,value):boolean)
 *  value(key, value):value
 * }} serializer
 */

/**
 * @typedef {{
 *  [x:string]: {
 *    allow:string|function(*):boolean|Array<string|function(*):boolean>
 *    deny:string|function(*):boolean|Array<string|function(*):boolean>
 *    type:"role"|"relation"|"command"
 *    desc?:string
 *  }
 * }} accessControlList
 */

/**
 * @typedef {{
 *  [x: string]: {
 *    command:string|function(Model):Promise<any>,
 *    acl:accessControlList[]
 *  }
 * }} commands - configure functions to execute when specified in a
 * URL parameter or query of the auto-generate REST API
 */

/**
 * @typedef {{
 *  [x: string]: {
 *    endpointUri: string,
 *    port:ports[p],
 *    callback: ({
 *      body:string,
 *      headers:{},
 *      params:{}}) => Promise<{
 *        body,status,headers
 *      }>
 *    })
 * }} endpoints
 */

/**
 * @typedef {{
 *  factory:function(),
 *  baseClass:"DataSourceMemory"|"DataSourceFile"|"DataSourceMongoDb",
 *  url:string,
 *  credentials?:string
 * }} datasource
 */

/**
 * @typedef {Object} ModelSpecification Specify model data and behavior
 * @property {string} modelName name of model (case-insenstive)
 * @property {string} endpoint URI reference (e.g. plural of `modelName`)
 * @property {function(...args): any} factory factory function that creates the model
 * @property {object} [dependencies] injected into the model for inverted control
 * @property {Array<import("./mixins").functionalMixin>} [mixins] - use mixins
 * to implement domain logic, like input validation.
 * @property {onUpdate} [onUpdate] - Function called to handle update requests. Called
 * before save.
 * @property {onDelete} [onDelete] - Function called before deletion.
 * @property {validate} [validate] - Function called on load, create, update to validate input, etc
 * @property {ports} [ports] - input/output ports for the domain
 * @property {eventHandler[]} [eventHandlers] - callbacks invoked to handle application
 * events, e.g. CRUD events
 * @property {serializer[]} [serializers] - use for custom de/serialization of the model
 * when reading or writing to storage or network
 * @property {relations} [relations] - link related domain models
 * @property {commands} [commands] - define functions to execute when specified in a
 * URL parameter or query of the auto-generated REST API
 * @property {accessControlList} [accessControlList] - configure authorization
 * @property {endpoints} [endpoints] - additional custom API endpoints - specify inbound port
 * @property {datasource} [datasource] - custom datasource for this model. If not set, the default set by the server is used.
 */

import GlobalMixins from "./mixins";
import makeAdapters from "./make-adapters";

// Service dependencies
import * as services from "../services-mock";
import * as adapters from "../adapters";

// Models
import * as modelSpecs from "../config";

const requiredProps = ["modelName", "endpoint", "factory"];

function validateSpec(spec) {
  const missing = requiredProps.filter(key => !spec[key]);
  if (missing?.length > 0) {
    throw new Error(`missing properties: ${missing} > ${Object.entries(spec)}`);
  }
}

/**
 * @param {ModelSpecification} spec
 * @param {*} dependencies - services injected
 */
function makeModel(spec) {
  validateSpec(spec);

  const mixins = spec.mixins || [];
  const dependencies = spec.dependencies || {};

  return {
    ...spec,
    mixins: mixins.concat(GlobalMixins),
    dependencies: {
      ...dependencies,
      ...makeAdapters(spec.ports, adapters, services),
    },
  };
}

const models = Object.values(modelSpecs).map(spec => makeModel(spec));

export { models };
