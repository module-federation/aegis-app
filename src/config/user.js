"use strict";

import { validateModel } from "../models/mixins";
import { userFactory, userMixins } from "../models/user";
import { uuid } from "../lib/utils";
import { DataSourceDynamoDb } from "../datasources/datasource-dynamodb";

/**
 * @type {import('../models').ModelSpecification}
 */
export const User = {
  modelName: "user",
  endpoint: "users",
  dependencies: { uuid },
  datasource: DataSourceDynamoDb,
  factory: userFactory,
  mixins: userMixins,
  validate: validateModel,
};
