'use strict'

export function makeCustomerFactory (dependencies) {
  return function createCustomer ({
    firstName,
    lastName,
    shippingAddress,
    creditCardNumber,
    billingAddress = shippingAddress,
    phone,
    email,
    userId
  } = {}) {
    return Object.freeze({
      customerId: dependencies.uuid(),
      firstName,
      lastName,
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
  const orders = await customer.orders()
  if (orders?.length > 0)
    throw new Error('cant delete customer with open orders')
  return customer
}

function fibonacci (x) {
  if (x === 0) {
    return 0
  }
  if (x === 1) {
    return 1
  }
  return fibonacci(x - 1) + fibonacci(x - 2)
}

export async function runFibonacciCust (data) {
  console.log({ data })
  const param = parseInt(data.args.fibonacci || 20)
  const start = Date.now()
  return {
    fibonacci: param,
    result: fibonacci(param),
    time: Date.now() - start
  }
}

export async function doesFieldExist (data) {
  console.log({ name: data.args?.name })
  return {
    field: data.args?.name,
    exists: (
      await (await this.fetchRelatedService('ORDER')).getFieldList()
    ).includes(data.args?.name)
  }
}
