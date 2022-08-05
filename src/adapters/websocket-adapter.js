'use strict'

import { WebSocket } from 'ws'

let ws

export function websocketConnect () {
  return async function ({ args: [url, options] }) {
    if (ws) return ws
    if (url) {
      ws = new WebSocket(url, options)
      if (options?.binary) ws.binaryType = 'arraybuffer'
      return ws
    }
    throw new Error('missing url', url)
  }
}

export function websocketSend () {
  return async function ({ model, args: [data = null, options = {}] }) {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(data || model, options)
      return true
    }
    return false
  }
}

export function websocketClose () {
  return async function ({ args: [code, reason] }) {
    if (ws) return ws.close(code, reason)
  }
}

export function websocketPing () {
  return async function ({ args: [options] }) {
    if (ws) return ws.ping(options)
  }
}

export function websocketOnMessage () {
  return async function ({ args: [callback] }) {
    if (ws) return ws.on('message', callback)
  }
}

export function websocketOnClose () {
  return async function ({ args: [callback] }) {
    if (ws) ws.onclose = callback
  }
}

export function websocketOnOpen () {
  return async function ({ args: [callback] }) {
    if (ws) ws.onopen = callback
  }
}

export function websocketOnPong () {
  return async function ({ args: [callback] }) {
    if (ws) ws.on('pong', callback)
  }
}
