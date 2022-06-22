'use strict'

/**
 * @typedef {import("../remote-entries-type").remoteEntry} entry
 */

/** @type {entry[]} */
exports.order = [
  {
    name: 'order',
    url: 'https://api.github.com',
    repo: 'aegis-application',
    owner: 'module-federation',
    filedir: 'dist',
    branch: 'master',
    path: __dirname,
    type: 'model',
    importRemote: () => require('../../../src/config/order.js')
  },
  {
    name: 'adapters',
    url: 'https://api.github.com',
    repo: 'aegis-application',
    owner: 'module-federation',
    filedir: 'dist',
    branch: 'order',
    path: __dirname,
    type: 'adapter',
    importRemote: () => require('../../../src/adapters')
  },
  {
    name: 'services',
    url: 'https://api.github.com',
    repo: 'aegis-application',
    owner: 'module-federation',
    filedir: 'dist',
    branch: 'order',
    path: __dirname,
    type: 'service',
    importRemote: () => require('../../../src/services')
  }
]
