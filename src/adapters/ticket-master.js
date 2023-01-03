import https from 'https'

export function tmListEventsOut (service) {
  return async function ({ args }) {
    const apiKey = args[0].apiKey
    const chunks = []
    return new Promise((resolve, reject) => {
      https.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`,
        res => {
          res.on('error', reject)
          res.on('data', chunk => chunks.push(chunk))
          res.on('end', () => resolve(chunks.join('')))
        }
      )
    })
  }

  // return async function (data) {
  //   try {
  //     const key = data.args[0].apiKey
  //     const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`
  //     return await (await fetch(url)).json()
  //   } catch (error) {
  //     console.error({ fn: tmListEventsOut.name, error })
  //     throw error
  //   }
  // }
}
