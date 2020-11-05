'use strict'

export const Payment = {

  async authorizePayment(args) {
    console.log(`REAL authorizing payment: ${args}`);
  },

  async completePayment({ model }) {
    console.log(`REAL completing payment...${model}`);
  },

  async refundPayment({ model }) {
    console.log(`REAL refunding payment...${model}`);
  }

}