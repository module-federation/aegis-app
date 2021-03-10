"use strict";

import { Event } from "./services/event-service";

export class EventDispatcher {
  constructor(adapter = Event) {
    this.adapter = adapter;
    this.subscriptions = new Map();
  }

  registerCallback(topic, callback) {
    if (this.subscriptions.has(topic)) {
      this.subscriptions.get(topic).push(callback);
      return;
    }
    this.subscriptions.set(topic, [callback]);
  }

  async emitEvent(topic, message, method = "notify") {
    await this.adapter[method](topic, message);
  }

  async init(method = "listen") {
    function emitEvent(topic, message) {
      this.emitEvent(topic, message);
    }

    // this.emitEvent(/Channel/, "remoteRestart");
    await this.adapter[method](
      /Channel/,
      function ({ topic, message }) {
        if (this.subscriptions.has(topic)) {
          this.subscriptions
            .get(topic)
            .forEach(callback =>
              callback({ message, emitEvent: emitEvent.bind(this) })
            );
        }
      }.bind(this)
    );
  }
}
