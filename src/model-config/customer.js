"use strict";

import { customerFactory, okToDelete } from "../models/customer";
import {
  validateModel,
  freezeProperties,
  validateProperties,
  requireProperties,
} from "../models/mixins";
import { uuid } from "../lib/utils";

/**
 * @type {import('../models/index').ModelSpecification}
 */
export const Customer = {
  modelName: "customer",
  endpoint: "customers",
  dependencies: { uuid },
  factory: customerFactory,
  validate: validateModel,
  onDelete: okToDelete,
  mixins: [
    freezeProperties("customerId"),
    requireProperties(
      "firstName",
      "lastName",
      "email",
      "shippingAddress",
      "billingAddress",
      "creditCardNumber"
    ),
    validateProperties([
      {
        propKey: "email",
        unique: { encrypted: true },
        regex: "email",
      },
      {
        propKey: "creditCardNumber",
        regex: "creditCard",
      },
    ]),
  ],
  relations: {
    orders: {
      modelName: "order",
      type: "oneToMany",
      foreignKey: "customerId",
    },
  },
  accessControlList: {
    customer: {
      allow: "read",
      type: "relation",
      desc: "Allow orders to see customers.",
    },
  },
};
