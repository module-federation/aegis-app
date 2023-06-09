'use strict'

import http from 'http'

export class ToDoServiceClient {
  createTodoList (data) {
    const req = http.request({
      method: 'POST',
      host: 'localhost',
      port: 8080,
      path: `/aegis/api/models/todo`,
      headers: {
        'Content-Type': 'appldication/json',
        'Content-Length': Buffer.byteLength(data)
      }
    })
    req.write(data)
    req.end()
  }

  getTodoListById (id) {
    let data
    return new Promise(resolve => {
      http.get(`http://localhost:8080/aegis/api/models/todo/${id}`, res => {
        res.on('data', msg => (data += msg))
        res.on('end', () => resolve(data))
      })
    })
  }

  getTodoList () {
    let data
    return new Promise(resolve => {
      http.get(`http://localhost:8080/aegis/api/models/todo`, res => {
        res.on('data', msg => (data += msg))
        res.on('end', () => resolve(data))
      })
    })
  }

  updateTodoList (id, data) {
    const req = http.request({
      method: 'PATCH',
      host: 'localhost',
      port: 8080,
      path: `/aegis/api/models/todo/${id}`,
      headers: {
        'Content-Type': 'appldication/json',
        'Content-Length': Buffer.byteLength(data)
      }
    })
    req.write(data)
    req.end()
  }

  deleteTodoList (id) {
    http.request({
      method: 'DELETE',
      host: 'localhost',
      port: 8080,
      path: `/aegis/api/models/todo/${id}`
    })
  }
}
