var path = require('path')
const ModuleFederationPlugin = require('webpack')
  .container.ModuleFederationPlugin;
const httpNode = require('./webpack/http-node');

var serverConfig = {
  target: httpNode,
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8060',
    libraryTarget: 'commonjs',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'orderService',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './service1': './src/services/service1',
        './publish-event': './src/services/publish-event',
        './models': './src/models',
        './order-service': '/src/services/order-service',
        './paymentService': '/src/services/real-payment-service',
        './shippingService': '/src/services/real-shipping-service',
        './address-service': '/src/services/address-service'
      },
      shared: {
        'axios': {
          eager: true
        },
        'smartystreets-javascript-sdk': {
          eager: true
        }
      }
    }),
  ]
}

module.exports = [serverConfig]