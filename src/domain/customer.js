'use strict'

export function makeCustomerFactory (dependencies) {
  return function createCustomer ({
    firstName,
    lastName,
    shippingAddress,
    creditCardNumber,
    billingAddress = shippingAddress,
    twitter = null,
    phone,
    email,
    userId
  } = {}) {
    return Object.freeze({
      customerId: dependencies.uuid(),
      firstName,
      lastName,
      twitter,
      creditCardNumber,
      shippingAddress,
      billingAddress,
      phone,
      email,
      userId
    })
  }
}

export async function okToDelete (customer) {
  try {
    const orders = await customer.orders()
    return orders.length > 0
  } catch (error) {
    console.error({ func: okToDelete.name, error })
    return true
  }
}
