'use strict'

/**
 * Generates functions to handle I/O between
 * the domain and application layers
 * @param {*} ports - the domain interfaces 
 * @param {*} adapters - the application adapters 
 */
export function makePorts(ports, adapters) {
  if (!ports || !adapters) {
    return;
  }
  return Object.keys(ports).map(function (port) {
    if (port.disabled) {
      return;
    }
    return {
      async [port](...args) {
        return adapters[port]({
          model: this,
          parms: args
        });
      }
    }
  }).reduce((p, c) => ({ ...c, ...p }));
}