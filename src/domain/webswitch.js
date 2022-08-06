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
import { nanoid } from 'nanoid'

const HOSTNAME = 'webswitch.local'
const SERVICENAME = 'webswitch'
const TIMEOUTEVENT = 'webswitchTimeout'
const CONNECTERROR = 'webswitchConnect'
const WSOCKETERROR = 'webswitchWsocket'

// const configRoot = require('../../config').hostConfig
// const config = configRoot.services.serviceMesh.WebSwitch
// const isPrimary =
//   /true/i.test(process.env.SWITCH) ||
//   (typeof process.env.SWITCH === 'undefined' && config.isSwitch)
// const debug = config.debug || /true/i.test(process.env.DEBUG)

const isPrimary = /true/i.test(process.env.SWITCH)
const debug = /true/i.test(process.env.DEBUG)
const heartbeatMs = 10000
const sslEnabled = /true/i.test(process.env.SSL_ENABLED)
const clearPort = process.env.PORT || 80
const cipherPort = process.env.SSL_PORT || 443
const activePort = sslEnabled ? cipherPort : clearPort
const activeProto = sslEnabled ? 'wss' : 'ws'
const activeHost = process.env.DOMAIN

const protocol = isPrimary ? activeProto : process.env.PROTO
const port = isPrimary ? activePort : process.env.PORT
const host = isPrimary ? activeHost : process.env.HOST
const isBackup = /true/i.test(process.env.BACKUP)
const apiProto = sslEnabled ? 'https' : 'http'
const apiUrl = `${apiProto}://${activeHost}:${activePort}`

const constructUrl = () =>
  protocol && host && port ? `${protocol}://${host}:${port}` : null

let uplinkCallback

const States = {
  STARTING: Symbol('starting'),
  CONNECTED: Symbol('connected'),
  DISCONNECTED: Symbol('disconnected'),
  DISPOSED: Symbol('disposed')
}
export class ServiceMeshClient extends EventEmitter {
  constructor (mesh) {
    super()
    this.ws = null
    this.url = constructUrl()
    this.mesh = mesh
    this.name = SERVICENAME
    this.isPrimary = isPrimary
    this.isBackup = isBackup
    this.pong = true
    this.timerId = 0
    this.state = States.STARTING
    this.headers = {
      'x-webswitch-host': os.hostname(),
      'x-webswitch-role': 'node',
      'x-webswitch-pid': process.pid
    }
  }

  telemetry () {
    return {
      eventName: 'telemetry',
      proto: this.name,
      apiUrl,
      heartbeatMs,
      hostname: os.hostname(),
      role: 'node',
      pid: process.pid,
      telemetry: { ...process.memoryUsage(), ...process.cpuUsage() },
      services: this.mesh.listServices(),
      socketState: this.mesh.websocketStatus() || 'undefined',
      clientState: this.state.toString()
    }
  }

  async resolveUrl () {
    await this.mesh.serviceLocatorInit({
      name: this.name,
      serviceUrl: constructUrl(),
      primary: this.isPrimary,
      backup: this.isBackup
    })
    if (this.isPrimary) {
      await this.mesh.serviceLocatorAnswer()
      return constructUrl()
    }
    return this.mesh.serviceLocatorListen()
  }

  async connect (options) {
    if ([States.CONNECTED, States.DISPOSED].includes(this.state)) {
      console.info('conn already open or client is disposed')
      return
    }
    this.state = this.CONNECTED
    this.options = options
    this.url = await this.resolveUrl()
    await this.mesh.websocketConnect('ws://localhost:8080', {
      agent: false,
      headers: this.headers,
      protocol: SERVICENAME
    })

    this.mesh.websocketOnClose((code, reason) => {
      this.state = States.DISCONNECTED
      console.log('received close frame', code, reason.toString())
      //this.ws.removeAllListeners()
      clearTimeout(this.timerId)
      // this.ws = null
      setTimeout(() => this.connect(), 3000)
    })

    this.mesh.websocketOnOpen(() => {
      this.state = States.CONNECTED
      console.log('connection open')
      this.mesh.websocketSend(this.telemetry())
      this.once('timeout', this.timeout)
      this.heartbeat()
      setTimeout(() => this.sendQueuedMsgs(), 3000).unref()
    })

    this.mesh.websocketOnMessage(message => {
      try {
        const event = this.decode(message)
        if (!event.eventName) {
          debug && console.debug({ missingEventName: event })
          this.emit('missingEventName', event)
          return
        }
        this.emit(event.eventName, event)
        this.listeners('*').forEach(listener => listener(event))
      } catch (error) {
        console.error({ fn: this.connect.name, error })
      }
    })

    this.mesh.websocketOnError(error => {
      this.emit(WSOCKETERROR, error)
      console.error({ fn: this.connect.name, error })
    })

    this.mesh.websocketOnPong(() => (this.pong = true))
  }

  timeout () {
    console.warn('timeout')
    this.emit(TIMEOUTEVENT, this.telemetry())
    this.close(4911, 'timeout')
  }

  heartbeat () {
    if (this.pong) {
      this.pong = false
      this.mesh.websocketPing()
      this.timerId = setTimeout(() => this.heartbeat(), heartbeatMs)
      this.timerId.unref()
    } else {
      clearTimeout(this.timerId)
      this.emit('timeout')
    }
  }

  primitives = {
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

  encode (msg) {
    const encoded = this.primitives.encode[typeof msg](msg)
    debug && console.debug({ encoded })
    return encoded
  }

  decode (msg) {
    const decoded = this.primitives.decode[typeof msg](msg)
    debug && console.debug({ decoded })
    return decoded
  }

  async send (msg) {
    const sent = await this.mesh.websocketSend(this.encode(msg), {
      binary: true,
      headers: {
        ...this.headers,
        'idempotency-key': nanoid()
      }
    })
    // breaker.detectErrors([TIMEOUTEVENT, CONNECTERROR, WSOCKETERROR], this)
    // breaker.invoke(msg)
    if (sent) return true
    this.mesh.sendQueue.push(msg)
    return false
  }

  async sendQueuedMsgs () {
    try {
      let sent = true
      while (this.mesh.sendQueue.length > 0 && sent)
        sent = await this.send(this.mesh.sendQueue.pop())
    } catch (error) {
      console.error({ fn: this.sendQueuedMsgs.name, error })
    }
  }

  async publish (msg) {
    await this.connect()
    this.send(msg)
  }

  subscribe (eventName, callback) {
    this.on(eventName, callback)
  }

  async close (code, reason) {
    if (code === 4991) return
    this.state = States.DISPOSED
    console.debug('closing socket')
    this.mesh.websocketClose(code, reason)
    await this.mesh.save() // save queued messages
    this.removeAllListeners()
    this.mesh = null
  }
}

export function makeClient (depedencies) {
  let client
  return async function ({ listServices }) {
    return {
      listServices,
      sendQueue: [],
      sendQueueMax: 1000,
      getClient () {
        if (client) return client
        client = new ServiceMeshClient(this)
        return client
      },
      async connect (options) {
        this.getClient().connect(options)
      },
      async publish (event) {
        this.getClient().publish(event)
      },
      subscribe (eventName, handler) {
        this.getClient().subscribe(eventName, handler)
      },
      async close (code, reason) {
        this.getClient().close(code, reason)
      }
    }
  }
}
