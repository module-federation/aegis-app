'use strict'

export default function createUserFactory(hash, uuid, chkparm) {
  return async function createUser({
    userName,
    password,
    firstName,
    lastName,
    address,
    country,
    phone
  } = {}) {
    //chkparm({ userName, password, firstName });
    return Object.freeze({
      userId: uuid(),
      password: hash(password),
      userName,
      firstName,
      lastName,
      country,
      address,
      phone
    });
  }
}

export function validateUser() {
  this.requireProperties();
}


export async function handleUserEvent(event) {

  console.log(`USER event handler: ${{ ...event }}`);
}
