"use strict";

import {
  requireProperties,
  freezeProperties,
  hashPasswords,
  validateProperties,
} from "./mixins";

export function userFactory({ uuid }) {
  return async ({
    userName,
    password,
    customerId,
    firstName,
    lastName,
    phone,
    email,
  } = {}) =>
    Object.freeze({
      userId: uuid(),
      password,
      userName,
      customerId,
      firstName,
      lastName,
      phone,
      email,
    });
}

export const userMixins = [
  requireProperties("userName", "password", "firstName"),
  freezeProperties("userId", "userName"),
  hashPasswords("password"),
  validateProperties([
    {
      propKey: "email",
      regex: "email",
      unique: { encrypted: true },
    },
    {
      propKey: "userName",
      unique: { encrypted: false },
    },
  ]),
];
