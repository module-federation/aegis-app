var path = require('path')
const ModuleFederationPlugin = require('webpack')
  .container.ModuleFederationPlugin;
const nodeExternals = require('webpack-node-externals');
const httpNode = require('./webpack/http-node');
const deps = require('./package.json').dependencies;

var serverConfig = {
  target: httpNode,
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8060',
    libraryTarget: 'commonjs',
  },
  // externals: nodeExternals({
  //   allowlist: [
  //     /webpack\/container/,
  //     'smartystreets-javascript-sdk',
  //     /axios/,
  //     'follow-redirects',
  //     'is-retry-allowed'
  //   ],
  // }),
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
      name: 'fedmonserv',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './service1': './src/services/service1',
        './publish-event': './src/services/publish-event',
        './models': './src/models',
      },
      shared: {
        //...deps,
        'smartystreets-javascript-sdk': {
          eager: true
        }
      }
    }),
  ]
}

module.exports = [serverConfig]