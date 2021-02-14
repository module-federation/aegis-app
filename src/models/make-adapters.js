"use strict";

export default function makeAdapters(ports, adapters, services) {
  if (!ports || !adapters) {
    return;
  }
  return Object.keys(ports)
    .map(port => {
      if (!adapters[port]) {
        return;
      }

      try {
        return {
          [port]: adapters[port](services[ports[port].service]),
        };
      } catch (e) {
        console.warn(e.message);
      }
    })
    .reduce((p, c) => ({ ...p, ...c }));
}
