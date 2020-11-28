'use strict'

import { Event } from '../services/event-service';

/**
 * @typedef {{
 *  getModel:import('../models').Model,
 * }} Subscription
 * @typedef {string|RegExp} topic
 * @callback eventHandler
 * @param {string} eventData
 * @typedef {eventHandler} notifyType 
 * @typedef {{
 * listen:function(topic, eventHandler),
 * notify:notifyType
 * }} EventService 
 * @callback adapterFactory
 * @param {EventService} service
 * @returns {function(topic, eventHandler)} 
 */

/**
 * @type {Map<any,Map<string,*>>}
 */
const subscriptions = new Map();

/**
 * @typedef {string} message
 * @typedef {string|RegExp} topic 
 * @param {{
 *  id:string,
 *  callback:function(message,Subscription),
 *  topic:topic,
 *  filter:string|RegExp,
 *  once:boolean,
 *  model:object
 * }} options
 */
const Subscription = function ({
  id, callback, topic, filter, once, model
}) {
  return {
    /**
     * unsubscribe from topic
     */
    unsubscribe() {
      subscriptions.get(topic).delete(id);
    },

    getId() {
      return id;
    },

    getModel() {
      return model;
    },

    getSubscriptions() {
      return [...subscriptions.entries()];
    },

    /**
     * Filter message and invoke callback
     * @param {string} message 
     */
    async filter(message) {
      if (filter) {
        const regex = new RegExp(filter);

        if (regex.test(message)) {
          if (once) {
            this.unsubscribe();
          }
          await callback({ message, subscription: this });
        }
        return;
      }
      await callback({ message, subscription: this });
    }
  }
}

/**
 *
 * @type {adapterFactory}
 */
export function listen(service = Event) {
  return async function ({
    model, args: [{ topic, callback, filter, once, id }]
  }) {
    const subscription = Subscription({
      id, topic, callback, filter, once, model
    });

    if (subscriptions.has(topic)) {
      subscriptions.get(topic).set(id, subscription);
      return subscription;
    }

    subscriptions.set(topic, new Map().set(id, subscription));

    if (!service.listening) {
      service.listen(/Channel/, async function ({ topic, message }) {
        if (subscriptions.has(topic)) {
          subscriptions.get(topic).forEach(async subscription => {
            subscription.filter(message);
          });
        }
      });
    }
    return subscription;
  }
}

/**
 * @type {adapterFactory}
 * @returns {function(topic, eventData)}
 */
export function notify(service = Event) {
  return async function ({ model, resolve, args: [topic, message] }) {
    console.log('sending...', { topic, message });
    await service.notify(topic, message);
    return model;
  }
}
