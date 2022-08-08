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
import { AsyncResource } from 'async_hooks'

const HOSTNAME = 'webswitch.local'
const SERVICENAME = 'webswitch'
const TIMEOUTEVENT = 'webswitchTimeout'
const CONNECTERROR = 'webswitchConnect'
const WSOCKETERROR = 'webswitchWsocket'

const isPrimary = /true/i.test(process.env.SWITCH)
const isBackup = /true/i.test(process.env.BACKUP)
const debug = /true/i.test(process.env.DEBUG)
const heartbeatMs = 10000
const sslEnabled = /true/i.test(process.env.SSL_ENABLED)
const clearPort = process.env.PORT || 80
const cipherPort = process.env.SSL_PORT || 443
const activePort = sslEnabled ? cipherPort : clearPort
const activeProto = sslEnabled ? 'wss' : 'ws'
const activeHost = process.env.DOMAIN || os.hostname()
const proto = isPrimary ? activeProto : process.env.SWITCH_PROTO
const port = isPrimary ? activePort : process.env.SWITCH_PORT
const host = isPrimary ? activeHost : process.env.SWITCH_HOST
const apiProto = sslEnabled ? 'https' : 'http'
const apiUrl = `${apiProto}://${activeHost}:${activePort}`

function localUrl () {
  const url = `${proto}://${host}:${port}`
  if (proto && host && port) {
    return url
  }
  if (isPrimary) throw new Error(`invalid url ${url}`)
  return null
}

const States = {
  STARTING: Symbol('starting'),
  CONNECTED: Symbol('connected'),
  DISCONNECTED: Symbol('disconnected'),
  DISPOSED: Symbol('disposed')
}

/**
 * Service mesh client impl. Uses websocket and service-locator
 * adapters through ports injected into the {@link mesh} model.
 * Cf. modelSpec by the same name, i.e. `webswitch`. Extends
 * {@link AsyncResource} to handle system reload on the main
 * thread, in which two instances are active for a short time.
 */
export class ServiceMeshClient extends AsyncResource {
  constructor (mesh) {
    super('webswitch')
    this.url = localUrl()
    this.mesh = mesh
    this.name = SERVICENAME
    this.isPrimary = isPrimary
    this.isBackup = isBackup
    this.pong = new Map()
    this.heartbeatTimer = new Map()
    this.state = new Map()
    this.broker = new EventEmitter()
    this.headers = {
      'x-webswitch-host': os.hostname(),
      'x-webswitch-role': 'node',
      'x-webswitch-pid': process.pid
    }
  }

  /**
   *
   * @param {number} asyncId id's instance to kill
   * @returns {{telemetry:{mem:number,cpu:number}}}
   */
  telemetry (asyncId) {
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
      clientState: this.state.toString(),
      asyncId
    }
  }

  /**
   * Zero-config, self-forming mesh network:
   * Discover URL of service to connect to or, if
   * this is the service, multicast this url
   * @returns {Promise<string>} url
   */
  async resolveUrl () {
    console.debug('resolveUrl called')
    await this.mesh.serviceLocatorInit({
      serviceUrl: localUrl(),
      name: this.name,
      primary: this.isPrimary,
      backup: this.isBackup
    })
    if (this.isPrimary) {
      await this.mesh.serviceLocatorAnswer()
      return localUrl()
    }
    return this.mesh.serviceLocatorListen()
  }

  /**
   * Connect to service mesh broker and run stateful
   * callbacks in async context to distinguish the old
   * client instance from the new one created when the
   * system hot-reloads. Allow listeners to subscribe
   * to indivdual or all events. Use multicast dns to
   * resolve broker url. Send binary messages with
   * protocol and idempotentency headers. Send telemetry
   * data, including asyncId for identifying context
   * on socket close.
   *
   * @param {*} options
   * @returns
   */
  async connect (options = { binary: true }) {
    if (
      options.asyncId &&
      this.state.get(options.asyncId) === States.DISPOSED
    ) {
      console.info('client is disposed')
      return
    }
    this.options = options
    this.url = await this.resolveUrl()
    await this.mesh.websocketConnect(this.url, {
      agent: false,
      headers: this.headers,
      protocol: SERVICENAME
    })

    this.mesh.websocketOnOpen(() => {
      this.runInAsyncScope(() => {
        this.state.set(this.asyncId(), States.CONNECTED)
        console.log('connection open')
        this.send(this.encode(this.telemetry(this.asyncId())))
        this.broker.once('timeout', () => this.timeout(this.asyncId()))
        this.heartbeat(this.asyncId())
        setTimeout(() => this.sendQueuedMsgs(), 3000).unref()
      }, this)
    })

    this.mesh.websocketOnMessage(message => {
      try {
        const event = this.decode(message)
        if (!event.eventName) {
          debug && console.debug({ missingEventName: event })
          this.broker.emit('missingEventName', event)
          return
        }
        this.broker.emit(event.eventName, event)
        this.broker.listeners('*').forEach(listener => listener(event))
      } catch (error) {
        console.error({ fn: this.connect.name, error })
      }
    })

    this.mesh.websocketOnError(error => {
      this.emit(WSOCKETERROR, error)
      console.error({ fn: this.connect.name, error })
    })

    this.mesh.websocketOnPong(() =>
      this.runInAsyncScope(() => (this.pong.set(this.asyncId(), true), this))
    )

    this.mesh.websocketOnClose((code, reason) => {
      this.runInAsyncScope(() => {
        this.state.set(this.asyncId(), States.DISCONNECTED)
        console.log({
          msg: 'received close frame',
          asyncId: this.asyncId(),
          code,
          reason: reason?.toString()
        })
        clearTimeout(this.heartbeatTimer.get(this.asyncId()))
        if (code === 4040 && reason === this.asyncId()) {
          console.log('got dup code for this ctx (ie obj inst): die.')
          return
        }
        setTimeout(() => {
          console.debug('reconnect due to socket close')
          this.connect({ asyncId: this.asyncId() })
        }, 10000).unref()
      }, this)
    })
  }

  timeout (asyncId) {
    console.warn('timeout')
    this.emit(TIMEOUTEVENT, this.telemetry(asyncId))
    this.mesh.websocketTerminate()
    this.state.set(asyncId, States.DISCONNECTED)
    setTimeout(() => {
      console.debug('reconnect due to timeout', asyncId)
      this.connect({ asyncId })
    }, 5000).unref()
  }

  heartbeat (asyncId) {
    if (this.pong) {
      this.pong.set(this.asyncId(), false)
      this.mesh.websocketPing()
      this.heartbeatTimer.set(
        asyncId,
        setTimeout(() => this.heartbeat(asyncId), heartbeatMs)
      )
      this.heartbeatTimer.get(asyncId).unref()
    } else {
      clearTimeout(this.heartbeatTimer.get(asyncId))
      this.broker.emit('timeout', asyncId)
    }
  }

  /**
   * use binary messages
   */
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

  /**
   * Convert message to binary and send with protocol and idempotency headers.
   * If message cannot be sent because of connection state or buffering queue
   * message in domain object for retry later. Using a domain object ensures
   * persistence of the queue.
   *
   * @param {object} msg
   * @returns {Promise<boolean>} true if sent, false if not
   */
  async send (msg) {
    const sent = await this.mesh.websocketSend(this.encode(msg), {
      binary: true,
      headers: {
        ...this.headers,
        'idempotency-key': nanoid()
      }
    })
    if (sent) return true
    this.mesh.pushSendQueue(msg)
    return false
  }

  /**
   * Send any messages buffered in `sendQueue`.
   */
  async sendQueuedMsgs () {
    try {
      let sent = true
      while (this.mesh.sendQueueLength() > 0 && sent) {
        console.debug('sending queued message')
        sent = await this.send(this.mesh.popSendQueue())
      }
    } catch (error) {
      console.error({ fn: this.sendQueuedMsgs.name, error })
    }
  }

  /**
   * Connects if needed then sends message to mesh broker service.
   * @param {*} msg
   */
  async publish (msg) {
    if (this.mesh.websocketDisconnected()) await this.connect()
    return this.send(msg)
  }

  /**
   * Register handler to fire on event.
   * @param {string} eventName
   * @param {function()} callback
   */
  subscribe (eventName, callback) {
    this.broker.on(eventName, callback)
  }

  /**
   * A new object will be created on system reload.
   * Dispose of the old one. Run in context to
   * distinguish between the new and old instance.
   *
   * @param {*} code
   * @param {*} reason
   */
  async close (code, reason) {
    this.runInAsyncScope(async () => {
      console.debug('closing socket, asyncId:', this.asyncId())
      this.mesh.websocketClose(code, reason)
      this.state.set(this.asyncId(), States.DISPOSED)
      await this.mesh.save() // save queued messages
      this.broker.removeAllListeners()
      this.emitDestroy()
    }, this)
  }
}

/**
 * Domain model factory function. This model is
 * used internally by the Aegis framework as a
 * pluggable service mesh client. Implement the
 * the methods below to create a new plugin.
 *
 * @param {*} dependencies injected depedencies
 * @returns
 */
export function makeClient (dependencies) {
  let client
  return async function ({ listServices }) {
    return {
      listServices,
      sendQueue: [],
      sendQueueMax: 1000,
      sendQueueLength () {
        return this.sendQueue.length
      },
      pushSendQueue (msg) {
        this.sendQueue.push(msg)
      },
      popSendQueue () {
        return this.sendQueue.pop()
      },
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
