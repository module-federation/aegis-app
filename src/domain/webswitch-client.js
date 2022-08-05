/**
 * webswitch (c)
 *
 * Websocket clients connect to a common ws server,
 * called a webswitch. When a client sends a message,
 * webswitch broadcasts the message to all other
 * connected clients, including a special webswitch
 * server that acts as an uplink to another network,
 * if one is defined. A Webswitch server can also
 * receive messgages from an uplink and will broadcast
 * those messages to its clients as well.
 */

'use strict'

import os from 'os'
import EventEmitter from 'events'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'

const HOSTNAME = 'webswitch.local'
const SERVICENAME = 'webswitch'
const TIMEOUTEVENT = 'webswitchTimeout'
const CONNECTERROR = 'webswitchConnect'
const WSOCKETERROR = 'webswitchWsocket'

const isPrimary = /true/i.test(process.env.SWITCH)
const debug = /true/i.test(process.env.DEBUG)
const heartbeatMs = 10000
const sslEnabled = /true/i.test(process.env.SSL_ENABLED)
const clearPort = process.env.PORT || 80
const cipherPort = process.env.SSL_PORT || 443
const activePort = sslEnabled ? cipherPort : clearPort
const activeProto = sslEnabled ? 'wss' : 'ws'
const activeHost = process.env.DOMAIN || os.hostname()
const protocol = isPrimary ? activeProto : process.env.PROTO
const port = isPrimary ? activePort : process.env.PORT
const host = isPrimary ? activeHost : process.env.HOST
const isBackup = /true/i.test(process.env.BACKUP)
const apiProto = sslEnabled ? 'https' : 'http'
const apiUrl = `${apiProto}://${activeHost}:${activePort}`
const broker = new EventEmitter()

const constructUrl = () =>
  protocol && host && port ? `${protocol}://${host}:${port}` : null

let url = constructUrl()
let handle
const serviceList = []
let pong = true
let timerId = 0
const sendQueueLimit = 20
const headers = {
  'x-webswitch-host': os.hostname(),
  'x-webswitch-role': 'node',
  'x-webswitch-pid': process.pid
}

function services () {
  return options.listServices
    ? (serviceList = options.listServices())
    : serviceList
}

function telemetry () {
  return {
    eventName: 'telemetry',
    proto: this.name,
    apiUrl,
    heartbeatMs,
    hostname: os.hostname(),
    role: 'node',
    pid: process.pid,
    telemetry: { ...process.memoryUsage(), ...process.cpuUsage() },
    services: services(),
    state: this.websocketState(handle)
  }
}

async function resolveUrl () {
  await this.serviceLocatorInit({
    name: SERVICENAME,
    serviceUrl: constructUrl(),
    primary: isPrimary,
    backup: isBackup
  })
  if (isPrimary) {
    await this.serviceLocatorAnswer()
    return constructUrl()
  }
  return this.serviceLocatorListen()
}

async function __connect (options = {}) {
  if (url) {
    console.info('conn already open')
    return
  }
  url = await resolveUrl.call(this)
  await this.websocketConnect(url, {
    agent: false,
    headers,
    protocol: SERVICENAME
  })

  this.websocketOnClose((code, reason) => {
    console.log('received close frame', code, reason.toString())
    //this.ws.removeAllListeners()
    clearTimeout(timerId)
    // this.ws = null
    setTimeout(__connect.bind(this), 3000)
  })

  this.websocketOnOpen(() => {
    console.log('connection open')
    this.websocketSend(telemetry.call(this))
    broker.once('timeout', timeout.bind(this))
    heartbeat.call(this)
    setTimeout(sendQueuedMsgs.bind(this), 3000).unref()
  })

  this.websocketOnMessage(message => {
    try {
      const event = decode(message)
      if (!event.eventName) {
        debug && console.debug({ missingEventName: event })
        broker.emit('missingEventName', event)
        return
      }
      broker.emit(event.eventName, event)
      broker.listeners('*').forEach(listener => listener(event))
    } catch (error) {
      console.error({ fn: __connect.name, error })
    }
  })

  this.websocketOnError(error => {
    broker.emit(WSOCKETERROR, error)
    console.error({ fn: __connect.name, error })
  })

  this.websocketOnPong(() => (pong = true))
}

function timeout () {
  console.warn('timeout')
  broker.emit(TIMEOUTEVENT, telemetry())
  __close.call(this, 4911, 'timeout')
}

function heartbeat () {
  if (pong) {
    pong = false
    this.websocketPing(handle)
    timerId = setTimeout(heartbeat.bind(this), heartbeatMs)
    timerId.unref()
  } else {
    clearTimeout(timerId)
    broker.emit('timeout')
  }
}

const primitives = {
  encode: {
    object: msg => Buffer.from(JSON.stringify(msg)),
    string: msg => Buffer.from(JSON.stringify(msg)),
    number: msg => Buffer.from(JSON.stringify(msg)),
    symbol: msg => console.log('unsupported', msg),
    undefined: msg => console.log('undefined', msg)
  },
  decode: {
    object: msg => JSON.parse(Buffer.from(msg).toString()),
    string: msg => JSON.parse(Buffer.from(msg).toString()),
    number: msg => JSON.parse(Buffer.from(msg).toString()),
    symbol: msg => console.log('unsupported', msg),
    undefined: msg => console.error('undefined', msg)
  }
}

function encode (msg) {
  const encoded = primitives.encode[typeof msg](msg)
  debug && console.debug({ encoded })
  return encoded
}

function decode (msg) {
  const decoded = primitives.decode[typeof msg](msg)
  debug && console.debug({ decoded })
  return decoded
}

async function send (msg) {
  const sent = await this.websocketSend(handle, encode(msg), {
    binary: true,
    headers: {
      ...headers,
      'idempotency-key': nanoid()
    }
  })

  // breaker.detectErrors([TIMEOUTEVENT, CONNECTERROR, WSOCKETERROR], this)
  // breaker.invoke(msg)

  if (sent) return true

  if (this.sendQueue.length < sendQueueLimit) {
    this.sendQueue.push(msg)
    return true
  }

  return false
}

async function sendQueuedMsgs () {
  try {
    let sent = true
    while (this.sendQueue.length > 0 && sent)
      sent = await send(this.sendQueue.pop())
  } catch (error) {
    console.error({ fn: sendQueuedMsgs.name, error })
  }
}

async function __publish (msg) {
  await __connect.call(this)
  send.call(this, msg)
}

function __subscribe (eventName, callback) {
  broker.on(eventName, callback)
}

async function __close (code, reason) {
  broker.off('timeout', timeout.bind(this))
  console.debug('closing socket')
  await this.save()
  this.websocketClose(handle, code, reason)
}

export function makeClient (dependencies) {
  return async function () {
    return {
      desc: 'service mesh client',
      startTime: Date.now(),
      sendQueue: [],
      async connect (options) {
        __connect.call(this, options)
      },
      async publish (event) {
        __publish.call(this, event)
      },
      subscribe (eventName, handler) {
        __subscribe.call(this, eventName, handler)
      },
      async close (code, reason) {
        __close.call(this, code, reason)
      }
    }
  }
}
