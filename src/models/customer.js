"use strict";

import { decrypt } from "../lib/utils";
import { freezeProperties, requireProperties } from "./mixins";

export function customerFactory({ uuid }) {
  return function createCustomer({
    firstName,
    lastName,
    shippingAddress,
    creditCardNumber,
    billingAddress = shippingAddress,
    phone,
    email,
    userId,
  } = {}) {
    return Object.freeze({
      customerId: uuid(),
      firstName,
      lastName,
      creditCardNumber,
      shippingAddress,
      billingAddress,
      phone,
      email,
      userId,
    });
  };
}

export async function okToDelete(customer) {
  const orders = await customer.orders();
  return orders.length > 0;
}

/**
 * @type {import('./mixins').mixinFunction[]}
 */
export const customerMixins = [
  freezeProperties("customerId"),
  requireProperties(
    "firstName",
    "lastName",
    "email",
    "shippingAddress",
    "billingAddress",
    "creditCardNumber"
  ),
];

/**
 * @type {import('./index').serializer[]}
 */
export const customerSerializers = [
  {
    on: "deserialize",
    key: "lastName",
    type: "string",
    value: (key, value) => decrypt(value),
  },
  {
    on: "deserialize",
    key: "email",
    type: "string",
    value: (key, value) => decrypt(value),
  },
];
