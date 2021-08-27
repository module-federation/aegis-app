"use strict";

import { EventDispatcher } from "../../src/event-dispatcher";
import { Registry } from "../../src/service-registry";

const shippingChannel = "shippingChannel";
const inventoryChannel = "inventoryChannel";

const callbacks = [];
const responses = [];
const topics = {
  [shippingChannel]: /shipping/,
  [inventoryChannel]: /inventory/,
};

export function handleEvents(req, res) {
  const message = JSON.stringify(req.body);
  const topicName = Object.keys(topics).find(k => topics[k].test(message));
  if (topicName) {
    console.log({
      func: handleEvents.name,
      msg: "found topic",
      topicName,
      message,
      cb: callbacks,
    });

    callbacks.forEach(callback => {
      console.log({ name: callback.name, code: callback.toString() });
      callback({ topicName, message });
    });
    console.log(responses);
    responses.reduceRight(response => res.send(response), "response");
  }
}

const Event = {
  topics: /Channel/,
  listening: false,

  listen(topic, callback) {
    callbacks.push(callback);
  },

  notify(topic, message) {
    responses.push(message);
  },
};

const dispatcher = new EventDispatcher(Event);

dispatcher.registerCallback(
  inventoryChannel,
  Registry.inventoryCallbackFactory()
);

dispatcher.registerCallback(
  shippingChannel,
  Registry.shippingCallbackFactory()
);

dispatcher.init();
