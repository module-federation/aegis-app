"use strict";
import EventDispatcher from "../event-dispatcher";
import ServiceRegistry from "../service-registry";



export const Address = {
  /**
   *
   * @param {string} address US street address
   */
  async validateAddress(address) {
    console.log("test validating address...");

    if (!address) {
      throw new Error("no address provided");
    }

    return address;
  },

};
