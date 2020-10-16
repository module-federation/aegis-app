'use strict'

//let paymentService;

// export async function importRemote(remoteEntries) {
//   for (const entry of remoteEntries) {
//     if (entry.name === 'paymentService') {
//       paymentService = await entry.importRemote();
//     }
//   }
// }

export async function authorizePayment(model) {
  console.log('mock authorizing credit card....');
  //model.services[authorizePayment.name](model.creditCardNumber);
}

export async function completePayment(paymentAuthorization) {
  console.log('completing payment...');
}

export async function refundPayment(paymentInfo) {
  console.log('refunding payment...');
}