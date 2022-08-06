'use strict'

import { makeClient } from '../domain/webswitch'

/**
 * @type {import('../domain').ModelSpecification}
 */
export const WebSwitch = {
  modelName: 'webswitch',
  endpoint: 'service-mesh',
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
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnOpen: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnMessage: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnError: {
      service: 'websocket',
      type: 'outbound',
      timeout: 0
    },
    websocketOnPong: {
      service: 'websocket',
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
