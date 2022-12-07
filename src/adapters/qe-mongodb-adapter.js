export function qeFind (service) {
  return async function (query) {
    const { MongoClient } = require('mongodb')

    async function connect () {
      /**
       * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
       * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
       */
      // const uri =
      //   'mongodb+srv://<username>:<password>@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority'

      //const uri = 'mongodb://localhost:27017'
      /**
       * The Mongo Client you will use to interact with your database
       * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
       * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
       * pass option { useUnifiedTopology: true } to the MongoClient constructor.
       * const client =  new MongoClient(uri, {useUnifiedTopology: true})
       */

      try {
        const client = new MongoClient('mongodb://127.0.0.1:27017', {
          useUnifiedTopology: true,
          useNewUrlParser: true
        })

        // Connect to the MongoDB cluster
        return await client.connect()
      } catch (e) {
        console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>', e)
      }
    }

    const conn = await connect()
    return conn
      .db('THIRDPARTY')
      .collection('THIRDPARTY')
      .findOne()
  }
}
