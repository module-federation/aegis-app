'use strict'

export function getToDoFactory (dependencies) {
  return async function createToDo ({ text }) {
    return Object.freeze({
      id: dependencies.uuid(),
      text
    })
  }
}
