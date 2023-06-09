'use strict'

import http from 'http'

export function configureFederatedClient (modelName, host, port) {
  return function createFederatedClient () {
    return new FederatedClient(modelName, host, port)
  }
}

export class FederatedClient {
  constructor (modelName, host, port) {
    this.host = host || process.env.FCHOST
    this.port = port || process.env.FCPORT
    this.modelName = modelName
  }

  createModel (data) {
    const req = http.request({
      method: 'POST',
      host: this.host,
      port: this.port,
      path: `/aegis/api/models/${this.modelName}`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    })
    req.write(data)
    req.end()
  }

  findModelById (id) {
    let msg
    return new Promise((resolve, reject) => {
      http.get(
        `http://${this.host}:${this.port}/aegis/api/models/${this.modelName}/${id}`,
        res => {
          res.on('data', data => (msg += data))
          res.on('end', () => resolve(msg))
          res.on('error', reject)
        }
      )
    })
  }

  listModels (filter = null) {
    let msg
    return new Promise((resolve, reject) => {
      const url = new URL(
        `http://${this.host}:${this.port}/aegis/api/models/${this.modelName}`
      )
      if (filter) url.searchParams = filter
      http.get(url, res => {
        res.on('data', data => (msg += data))
        res.on('end', () => resolve(msg))
        res.on('error', reject)
      }) 
    })
  }

  patchModel (id, data) {
    const req = http.request({
      method: 'PATCH',
      host: this.host,
      port: this.port,
      path: `/aegis/api/models/${this.modelName}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    })
    req.write(data)
    req.end()
  }

  destroyModel (id) {
    http.request({
      method: 'DELETE',
      host: this.host,
      port: this.port,
      path: `/aegis/api/models/${this.modelName}/${id}`
    })
  }

  invokePort (portName, data = null, id = null) {
    let options = {
      host: this.host,
      port: this.port
    }
    if (id) {
      options.method = 'PATCH'
      options.path = `/aegis/api/models/${this.modelName}/${id}/services/port/${portName}`
    } else {
      options.method = 'POST'
      options.path = `/aegis/api/models/${this.modelName}/services/port/${portName}`
    }
    if (data) {
      options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }
    const req = http.request(options)
    if (data) {
      req.write(data)
    }
    req.end()
  }
}
