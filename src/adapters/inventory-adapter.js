'use strict'

export function fillOrder(service) {
  return async function ({ model: order, parms: [callback] }) {
    callback({ order, pickupAddress: 'address' });
  }
}