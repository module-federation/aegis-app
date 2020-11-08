'use strict'

export const Payment = {

  async authorizePayment(data) {
    console.log('TEST authorizing payment...%s', data);
    return { authorization: '1234' }
  },

  async completePayment({ model }) {
    console.log(
      'TEST completing payment...%s',
      model.decrypt().creditCardNumber
    );
  },

  async refundPayment({ model }) {
    console.log(
      'test refunding payment...%s',
      model.decrypt().creditCardNumber
    );
  },
}

