"use strict";

import axios from "axios";
const square_token = process.env.SQUARE_TOKEN;
const url = "http://host.domain.com";

async function send(payload) {
  return axios
    .post(url, payload)
    .then(
      (response) => {
        const modelId = response.data.modelId;
        return this;
      },
      (error) => {
        console.error(error.response.data);
      }
    )
    .catch((e) => console.log(e));
}

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
    await send(payload);
    return { authorization: "1234" };
  },

  /*
  const response ={
  "payment": {
    "id": "GQTFp1ZlXdpoW4o6eGiZhbjosiDFf",
    "created_at": "2019-07-10T13:23:49.154Z",
    "updated_at": "2019-07-10T13:23:49.446Z",
    "amount_money": {
      "amount": 200,
      "currency": "USD"
    },
    "app_fee_money": {
      "amount": 10,
      "currency": "USD"
    },
    "total_money": {
      "amount": 200,
      "currency": "USD"
    },
    "status": "COMPLETED",
    "source_type": "CARD",
    "card_details": {
      "status": "CAPTURED",
      "card": {
        "card_brand": "VISA",
        "last_4": "1111",
        "exp_month": 7,
        "exp_year": 2026,
        "fingerprint": "sq-1-TpmjbNBMFdibiIjpQI5LiRgNUBC7u1689i0TgHjnlyHEWYB7tnn-K4QbW4ttvtaqXw",
        "card_type": "DEBIT",
        "prepaid_type": "PREPAID",
        "bin": "411111"
      },
      "entry_method": "ON_FILE",
      "cvv_status": "CVV_ACCEPTED",
      "avs_status": "AVS_ACCEPTED",
      "auth_result_code": "nsAyY2",
      "statement_description": "SQ *MY MERCHANT"
    },
    "location_id": "XTI0H92143A39",
    "order_id": "m2Hr8Hk8A3CTyQQ1k4ynExg92tO3",
    "reference_id": "123456",
    "note": "Brief description",
    "customer_id": "RDX9Z4XTIZR7MRZJUXNY9HUK6I",
    "receipt_number": "GQTF",
    "receipt_url": "https://squareup.com/receipt/preview/GQTFp1ZlXdpoW4o6eGiZhbjosiDFf"
  }
}
  /*
{
  "errors": [
    {
      "code": "VALUE_EMPTY",
      "detail": "Field must not be blank",
      "field": "source_id",
      "category": "INVALID_REQUEST_ERROR"
    },
    {
      "code": "VALUE_EMPTY",
      "detail": "Field must not be blank",
      "field": "idempotency_key",
      "category": "INVALID_REQUEST_ERROR"
    },
    {
      "code": "MISSING_REQUIRED_PARAMETER",
      "detail": "Field must be set",
      "field": "amount_money",
      "category": "INVALID_REQUEST_ERROR"
    }
  ]
}



  */

  async completePayment(model) {
    console.log("REAL completing payment: %s", model.orderNo);
  },

  async refundPayment(model) {
    console.log("REAL refunding payment: %s", model.orderNo);
  },
};
