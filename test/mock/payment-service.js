"use strict";

/**
 * @callback authorizePaymentType
 * @param {string} id
 * @param {number} amount
 * @param {string} source_id
 * @param {string} customer_id
 * @param {boolean} [autocomplete]
 * @returns {Promise<string>}
 */

/**
 * @typedef PaymentService
 * @property {authorizePaymentType} authorizePayment
 * @property {function()} completePayment
 * @property {function()} refundPayment
 */

// import { Client, Environment, ApiError } from "square";

// const client = new Client({
//   environment: Environment.Sandbox,
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
// });

export const Payment = {
  /**
   * @type {authorizePaymentType}
   * @param {*} id
   * @param {*} amount
   * @param {*} source_id
   * @param {*} customer_id
   * @param {*} autocomplete
   * @param {*} currency
   */
  async authorizePayment(
    id,
    amount,
    source_id,
    customer_id,
    autocomplete = false,
    currency = "USD"
  ) {
    console.log("mock payment service called");
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
    /*
    const bodyAmountMoney = {};
    bodyAmountMoney.amount = 200;
    bodyAmountMoney.currency = "USD";

    const bodyTipMoney = {};
    bodyTipMoney.amount = 198;
    bodyTipMoney.currency = "CHF";

    const bodyAppFeeMoney = {};
    bodyAppFeeMoney.amount = 10;
    bodyAppFeeMoney.currency = "USD";

    const body = {
      sourceId: "ccof:uIbfJXhXETSP197M3GB",
      idempotencyKey: "4935a656-a929-4792-b97c-8848be85c27c",
      amountMoney: bodyAmountMoney,
    };

    body.tipMoney = bodyTipMoney;
    body.appFeeMoney = bodyAppFeeMoney;
    body.delayDuration = "delay_duration6";
    body.autocomplete = true;
    body.orderId = "order_id0";
    body.customerId = "VDKXEEKPJN48QDG3BGGFAK05P8";
    body.locationId = "XK3DBG77NJBFX";
    body.referenceId = "123456";
    body.note = "Brief description";

    // try {
    //   const {
    //     result,
    //     ...httpResponse
    //   } = await client.paymentsApi.createPayment(body);
    //   // Get more response info...
    //   // const { statusCode, headers } = httpResponse;
    // } catch (error) {
    //   if (error instanceof ApiError) {
    //     const errors = error.result;
    //     // const { statusCode, headers } = error;
    //   }
    // }
    */
    return "1234";
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
    return "1234";
  },

  async refundPayment(model) {
    console.log("REAL refunding payment: %s", model.orderNo);
  },
};
