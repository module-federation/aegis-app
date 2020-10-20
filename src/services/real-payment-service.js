'use strict'

export async function authorizePayment(args) {
  console.log(`REAL authorizing payment: ${args}`);
}

export async function completePayment(args) {
  console.log(`REAL completing payment...${args}`);
}

export async function refundPayment(args) {
  console.log(`REAL refunding payment...${args}`);
}