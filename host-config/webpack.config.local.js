var path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const httpNode = require('./webpack/http-node')

var serverConfig = {
  target: httpNode,

  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'remote-entries/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8002/',
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
    new ModuleFederationPlugin({
      name: 'local',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './remote-entries': './remote-entries'
      }
    })
  ]
}

module.exports = [serverConfig]
