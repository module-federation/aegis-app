'use strict'

/**
   * Generate functions to handle I/O between
   * the domain and application layers. Each port
   * is assigned an adapter, which either invokes
   * the port (inbound) or is invoked by it (outbound).
   * @param {Module} ports - the domain interfaces 
   * @param {Module} adapters - the application adapters 
   */
function makePorts(ports, adapters) {
  if (!ports || !adapters) {
    return;
  }
  return Object.keys(ports).map(function (port) {
    return {
      async [port](...args) {
        const self = this;
        return new Promise(async function (resolve, reject) {
          if (port.disabled || !adapters[port]) {
            console.warn(
              'warning: port disabled or adapter missing: %s',
              port
            );
            resolve(self);
            return;
          }
          try {
            return await adapters[port]({
              model: self, resolve, args
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    }
  }).reduce((p, c) => ({ ...c, ...p }));
}
