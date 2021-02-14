"use strict";

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
