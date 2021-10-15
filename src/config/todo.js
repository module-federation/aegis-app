'use strict'

import { getToDoFactory } from '../domain/todo'

/**
 * @type {import("../domain").ModelSpecification}
 */
const ToDo = {
  modelName: 'todo',
  endpoint: todos,
  factory: getToDoFactory
}
