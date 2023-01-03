import http from 'http'

export function wasmGetPublicIpAddress () {
  return async function () {
    const chunks = []
    return new Promise(resolve => {
      http.get(
        {
          hostname: 'checkip.amazonaws.com',
          method: 'get'
        },
        res => {
          res.on('data', chunk => chunks.push(chunk))
          res.on('end', function () {
            resolve({ address: chunks.join('').trim() })
          })
        }
      )
    })
  }
}
