'use strict'

import { DataSourceAdapterCustomFile } from '../../adapters/datasources/datasource-adapter-file'
import { makeToDoFactory } from '../models/todo'
import { nanoid } from 'nanoid'

/**
 * @type {import('../index').ModelSpecification}
 */
export const ToDo = {
  modelName: 'todo',
  endpoint: 'todo',
  dependencies: { uuid: nanoid },
  factory: makeToDoFactory,
  datasource: {
    factory: DataSourceAdapterCustomFile,
    cacheSize: 4000,
    baseClass: 'DataSourceFile'
  }
}
