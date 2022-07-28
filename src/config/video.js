/**
 * @type {import('../domain').ModelSpecification}
 */
export const Video = {
  modelName: 'video',
  endpoint: 'videos',
  factory: dependencies => () => {
    const { port1, port2 } = MessageChannel()

    function publish (message) {
      if (isMainThread) {
        port1.postMessage(message)
      } else {
        port2.postMessage(message)
      }
    }

    function subscribe (cb) {
      if (isMainThread) {
        port1.on('message', message => cb(message))
      } else {
        port2.on('message', message => cb(message))
      }
    }
  }
}
