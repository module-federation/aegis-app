'use strict'


export const Payment = {

  async authorizePayment(model) {
    console.log(`REAL authorizing payment: ${model}`);
    return '12345';
  },

  async completePayment(model) {
    console.log(`REAL completing payment...${model}`);
  },

  async refundPayment({ model, resolve }) {
    console.log(`REAL refunding payment...${model}`);
  }

}