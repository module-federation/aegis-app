'use strict'

import axios from 'axios';

const URL = 'https://connect.squareup.com/v2/customers/';
const ACCESS_TOKEN = process.env.SQUARE_TOKEN;
const headers = {
  'Square-Version': '2020-09-23',
  'Authorization': 'Bearer ' + ACCESS_TOKEN,
}

/**
 * 
 * @typedef {{
 *  given_name,
 *  family_name,
 *  email_address,
 *  address: {
 *    address_line_1,
 *    address_line_2
 *  },
 *  phone_number,
 * }} customerInfo 
 */

/**
 * 
 * @param {customerInfo} customerInfo 
 */
function validateCustomerInfo(customerInfo) {

}

// Overridden by host once imported
// export const consumeEvents = async () => { console.log('original consumeEvents') };

/**
 * Based on Square API
 * cf. https://developer.squareup.com/reference/square/customers/create-customer
 */
export class CustomerService {

  /**
   * Based on Square API
   * @param {customerInfo} customerInfo 
   */
  async createCustomer(customerInfo) {
    validateCustomerInfo(customerInfo);
    return axios.post(
      URL, customerInfo, headers
    ).then((response) => {
      this.customer_id = response.data.customer_id;
      return this;
    }, (error) => {
      console.error(error.response.data);
      throw new Error(error);
    });
  }

  async findCustomer(id) {
    console.log('calling findCustomer...')
    return id;
  }

  async searchCustomers(filter) {
  }

  async subscribe(handler) {
  }

}

/*
 * Based on Square API
 * @param {customerInfo} customerInfo
 *
export async function createCustomer(customerInfo) {
  validateCustomerInfo(customerInfo);
  return axios.post(
    URL, customerInfo, headers
  ).then((response) => {
    console.log(response.data);
    return this;
  }, (error) => {
    console.error(error.response.data);
    throw new Error(error);
  });
}
*/
