'use strict'

const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const httpNode = require('./webpack/http-node')

const ctx = JSON.stringify(process.env.GITPOD_WORKSPACE_CONTEXT)

var serverConfig = {
  target: httpNode,
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: `https://api.github.com?owner=module-federation&repo=aegis-app&filedir=dist&branch=master`,
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
        './models': './src/domain',
        './adapters': './src/adapters',
        './services': './src/services',
        './ports': './src/domain/ports',
        './event-bus': './src/services/event-bus'
      },
      shared: {
        axios: {
          eager: true
        },
        'smartystreets-javascript-sdk': {
          eager: true
        },
        kafkajs: {
          eager: true
        },
        nanoid: {
          eager: true
        }
      }
    })
  ]
}

module.exports = [serverConfig]
