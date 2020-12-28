"use strict";

import { processUpdate } from "../models/mixins";
import { getUserSerializers, userFactory, userMixins } from "../models/user";
import { uuid, decrypt } from "../lib/utils";

/**
 * @type {import('../models/index').ModelSpecification}
 */
export const User = {
  modelName: "user",
  endpoint: "users",
  dependencies: { uuid },
  factory: userFactory,
  mixins: userMixins,
  onUpdate: processUpdate,
};
