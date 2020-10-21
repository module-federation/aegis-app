'use strict'

export async function authorizePayment(creditCardNumber) {
  console.log('authorizing payment...%s', creditCardNumber);
}

export async function completePayment(creditCardNumber) {
  console.log('completing payment...%s', creditCardNumber);
}

export async function refundPayment(creditCardNumber) {
  console.log('refunding payment...%s', creditCardNumber);
}

export async function subscribe(filter) {

}

