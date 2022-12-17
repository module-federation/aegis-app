export function tmListEventsOut (service) {
  return async function (data) {
    try {
      const key = data.args[0].apiKey
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`
      return await (await fetch(url)).json()
    } catch (error) {
      console.error({ fn: tmListEventsOut.name, error })
      throw error
    }
  }
}
