import http from 'http'

export function qeGetPublicIpAddressOut () {
  return async function () {
    const bytes = []
    return new Promise(resolve => {
      http.get(
        {
          hostname: 'checkip.amazonaws.com',
          method: 'get'
        },
        response => {
          response.on('data', chunk => bytes.push(chunk))
          response.on('end', function () {
            resolve({ address: bytes.join('').trim() })
          })
        }
      )
    })
  }
}
