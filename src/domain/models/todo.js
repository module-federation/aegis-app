'use strict'

export function makeToDoFactory (dependencies) {
  return function toDoFactory ({ text, isComplete }) {
    return Object.freeze({
      id: dependencies.uuid(),
      text,
      isComplete: isComplete || false
    })
  }
}                                                                                                                                                                                                                              
