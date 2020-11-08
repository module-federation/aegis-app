'use strict'

const uuid = require('../lib/utils').uuid;
const SmartyStreetsSDK = require("smartystreets-javascript-sdk");

const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
let enabled = process.env.SMARTY_ENABLED || false;
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

let client = SmartyStreetsCore.buildClient.usStreet(credentials);

export const Address = {
  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields

  async validateAddress(address) {
    console.log(`REAL validating address...${address}`);

    if (!address) {
      console.log('no address');
      return;
    }

    if (!enabled) {
      console.log('address service disabled');
      return address;
    }

    let lookup = new Lookup();
    lookup.inputId = uuid();
    lookup.street = address;
    lookup.maxCandidates = 1;

    let response;
    try {
      response = await client.send(lookup);
    } catch (error) {
      throw new Error(error);
    }

    const candidate = response.lookups[0].result[0];
    if (!candidate) {
      throw new Error('invalid address');
    }

    const validatedAddress = [
      candidate.deliveryLine1,
      candidate.deliveryLine2,
      candidate.lastLine
    ].join(' ');

    console.log(`address: ${validatedAddress}`);

    if (!validatedAddress) {
      throw new Error('invalid address');
    }
    return {
      address: validatedAddress,
      isSingleFamily: false
    }
  }
}