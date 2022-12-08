import http from 'http'

/**
 *
 * @returns
 */
export function qeGetPublicIpAddressOut () {
  return async function () {
    const buf = []
    return new Promise(resolve => {
      http.get(
        {
          hostname: 'checkip.amazonaws.com',
          method: 'get'
        },
        response => {
          response.on('data', chunk => buf.push(chunk))
          response.on('end', function () {
            resolve({ address: buf.join('') })
          })
        }
      )
    })
  }
}
