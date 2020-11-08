'use strict'

export const Payment = {

  async authorizePayment(args) {
    console.log(`REAL authorizing payment: ${args}`);
    return { authorization: '1234' }
  },

  async completePayment({ model }) {
    console.log(`REAL completing payment...${model}`);
  },

  async refundPayment({ model }) {
    console.log(`REAL refunding payment...${model}`);
  }

}