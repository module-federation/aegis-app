'use strict'

/**
 * @typedef {import('../models/order').Order} Order
 * @typedef {string} address
 * @typedef {{
 * validateAddress:function(address):address
 * }} service 
 * @callback adapterFactory
 * @param {service} service
 * @returns {function(address)} 
 */

/**
 * 
 * @type {adapterFactory} 
 */
export function validateAddress(service) {
  return async function (address) {
    console.log(address);
    return service.validateAddress(address);
  }
}