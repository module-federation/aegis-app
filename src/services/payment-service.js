'use strict'


export const Payment = {

  async authorizePayment(model) {
    console.log('REAL authorizing payment: %s', model.orderNo);
    return '12345';
  },

  async completePayment(model) {
    console.log('REAL completing payment: %s', model.orderNo);
  },

  async refundPayment(model) {
    console.log('REAL refunding payment: %s', model.orderNo);
  }

}