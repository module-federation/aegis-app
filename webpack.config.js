var path = require('path')
const StreamingRuntime = require('./node/streaming/')
const NodeFederation = require('./node/streaming/NodeRuntime')
const { ModuleFederationPlugin } = require('webpack').container

var serverConfig = {
  target: 'async-node',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'https://localhost',
    libraryTarget: 'commonjs'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.py$/,
        use: [{ loader: 'python-webpack-loader' }]
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async'
      }
    ]
  },
  experiments: {
    asyncWebAssembly: true
  },
  optimization: {
    chunkIds: 'deterministic' // To keep filename consistent between different modes (for example building only)
  },
  module: {
    rules: [
      {
        test: /\.py$/,
        loader: 'py-loader',
        options: {
          compiler: 'transcrypt'
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // new ModuleFederationPlugin({
    //   name: 'apps',
    //   filename: 'remoteEntry.js',
    //   library: { type: 'commonjs' },
    //   exposes: {
    //     './models': './src/domain'
    //   }
    // })
    new StreamingRuntime({
      name: 'apps',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs' },
      exposes: {
        models: './src/domain',
        adapters: './src/adapters',
        services: './src/services',
        'event-bus': './src/services/event-bus'
      }
      // ,
      // shared: {
      //   axios: {
      //     // eager: true
      //   },
      //   'smartystreets-javascript-sdk': {
      //     //eager: true
      //   },
      //   kafkajs: {
      //     //eager: true
      //   },
      //   nanoid: {
      //     //eager: true
      //   }
      // }
    }),
    new NodeFederation({
      name: 'apps',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs' },
      exposes: {
        models: './src/domain',
        adapters: './src/adapters',
        services: './src/services',
        'event-bus': './src/services/event-bus'
      }
      // ,
      // shared: {
      //   axios: {
      //     //eager: true
      //   },
      //   'smartystreets-javascript-sdk': {
      //     //eager: true
      //   },
      //   kafkajs: {
      //     //eager: true
      //   },
      //   nanoid: {
      //     //eager: true
      //   }
      // }
    })
  ]
}

module.exports = [serverConfig]
