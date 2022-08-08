'use strict'

import WebSocket from 'ws'
/** @type {WebSocket} */
let socket

export function websocketConnect () {
  return async function ({ args: [url, options] }) {
    if (socket) return socket
    if (url) {
      socket = new WebSocket(url, options)
      console.debug('connected')
      if (options?.binary) socket.binaryType = 'arraybuffer'
      return socket
    }
    throw new Error('missing url', url)
  }
}

export function websocketSend () {
  return async function ({ args: [data, options = {}] }) {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(data, options)
      return true
    }
    return false
  }
}

export function websocketClose () {
  return async function ({ args: [code, reason] }) {
    if (socket) return socket.close(code, reason)
  }
}

export function websocketPing () {
  return async function ({ args: [options] }) {
    if (socket) return socket.ping(options)
  }
}

export function websocketOnMessage () {
  return async function ({ args: [callback] }) {
    if (socket) return socket.on('message', callback)
  }
}

export function websocketOnClose () {
  return async function ({ args: [callback] }) {
    if (socket) socket.onclose = callback
  }
}

export function websocketOnOpen () {
  return async function ({ args: [callback] }) {
    if (socket) socket.onopen = callback
  }
}

export function websocketOnPong () {
  return async function ({ args: [callback] }) {
    if (socket) socket.on('pong', callback)
  }
}

export function websocketStatus () {
  return async function ({ args: [callback] }) {
    if (socket) return socket.readyState
  }
}

export function websockeTerminate () {
  return async function () {
    if (socket) return socket.terminate()
  }
}

export function websocketDisconnected () {
  return async function () {
    return socket.readyState !== socket.OPEN
  }
}
