"use strict";

const square_token = process.env.SQUARE_TOKEN;

export const Payment = {
  async authorizePayment(
    id,
    amount,
    source_id,
    customer_id,
    autocomplete = false,
    currency = "USD"
  ) {
    const payload = {
      idempotency_key: id,
      amount_money: {
        amount,
        currency,
      },
      source_id,
      autocomplete,
      customer_id,
      location_id: "XK3DBG77NJBFX",
      reference_id: "123456",
      note: "Brief description",
      app_fee_money: {
        amount: 10,
        currency: "USD",
      },
    };
    console.log("TEST authorizing payment...%s", data);
    return { authorization: "1234" };
  },

  async completePayment({ model }) {
    console.log(
      "TEST completing payment...%s",
      model.decrypt().creditCardNumber
    );
  },

  async refundPayment({ model }) {
    console.log(
      "test refunding payment...%s",
      model.decrypt().creditCardNumber
    );
  },
};
