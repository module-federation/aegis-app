'use strict'

/**
 *
 * @param {{someFunction:function({})}} service
 * @returns {import('../domain').Model} updated model
 */
export function someFunction (service) {
  return async function (options) {
    const {
      model, args: [callback]
    } = options

    const output = service.someFunction({
      ...model.decrypt(),
      thisName: model.thatName
    })

    return callback(output, options)
  }
}
