'use strict'

export async function validateAddress(address) {
  console.log('validating address...');

  if (!address) {
    throw new Error('no address provided');
  }

  return address;
}