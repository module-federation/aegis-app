"use strict";

import { customerFactory, customerMixins } from "../models/customer";
import { processUpdate } from "../models/mixins";
import { uuid } from "../lib/utils";

/**
 * @type {import('../models/index').ModelSpecification}
 */
export const Customer = {
  modelName: "customer",
  endpoint: "customers",
  dependencies: { uuid },
  factory: customerFactory,
  onUpdate: processUpdate,
  mixins: customerMixins,
};
