'use strict'

export function test (data) {
  console.log(data)
  this.save(data.id, JSON.stringify(data.args))
  return this.find(data.id)
} 
