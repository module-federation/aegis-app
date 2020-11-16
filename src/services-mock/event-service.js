'use strict'
const observers = new Map();

export const Event = {

  listen(topic, callback) {
    console.log({ desc: 'test', topic, callback });

    if (observers.has(topic)) {
      observers.get(topic).push(callback);
      return;
    }
    observers.set(topic, [callback]);
    setTimeout(() => Event.notify({ topic: 'test', event: 'test' }), 5000);
  },

  async notify({ topic, event }) {
    observers.get(topic).forEach(
      async callback => callback(topic, event)
    );
  },
}