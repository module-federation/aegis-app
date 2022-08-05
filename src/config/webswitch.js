'use strict'

import { makeClient } from '../domain/webswitch-client'

/**
 * @type {import('../domain').ModelSpecification}
 */
export const AppFabricClient = {
  modelName: 'appFabricClient',
  endpoint: 'app-fabric',
  factory: makeClient,
  ports: {
    serviceLocatorInit: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    serviceLocatorAsk: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    serviceLocatorListen: {
      service: 'serviceLocęator',
      type: 'outbound',
      timeout: 0
    },
    serviceLocatorAnswer: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketConnect: {
      service: 'websocket',
      stype: 'outbound',
      timeout: 3000
    },
    websocketOnClose: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketOnOpen: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketOnMessage: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketOnError: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketOnPong: {
      service: 'serviceLocator',
      type: 'outbound',
      timeout: 0
    },
    websocketSend: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketClose: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    }
  }
}
