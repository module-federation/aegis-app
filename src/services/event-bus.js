"use strict";

// Build EventBus client for host
import { listen, notify } from "../adapters";
import { Event } from "./event-service";

const _notify = notify(Event);
const _listen = listen(Event);
const model = { listen: _listen };

export const EventBus = {
  notify(topic, message) {
    return _notify({ model, args: [topic, message] });
  },
  listen(options) {
    return _listen({ model, args: [options] });
  },
};
