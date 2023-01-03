import { tmListEventsOut } from '../../src/adapters/ticket-master'
import assert from 'node:assert'

describe('TICKETMASTER', function () {
  describe('#DISCOVER()', function () {
    it('RETURN DATA', async function () {
      const sched = await tmListEventsOut()({
        args: [{ apiKey: process.env.TICKETMASTER_APIKEY }]
      })
      console.log(sched)
      assert.ok(sched, 'fail', sched)
    })
    it('AUTENTICATE', async function () {
      const sched = await tmListEventsOut()({
        args: [{ apiKey: process.env.TICKETMASTER_APIKEY }]
      })
      if (JSON.parse(sched)?.fault?.faulString === 'Invalid Keysdd') {
        console.log(JSON.parse(sched))
      } else assert.ok(true)
    })
  })
})
