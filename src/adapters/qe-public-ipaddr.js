import http from 'http'

/**
 *
 * @returns
 */
export function qeGetPublicIpAddressOut () {
  return async function () {
    const buffer = []
    return new Promise(resolve => {
      http.get(
        {
          hostname: 'checkip.amazonaws.com',
          method: 'get'
        },
        response => {
          response.on('data', chunk => buffer.push(chunk))
          response.on('end', () => {
            resolve({ address: buffer.join('') })
          })
        }
      )
    })
  }
}
