var path = require('path')
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const nodeExternals = require('webpack-node-externals');

var serverConfig = {
  entry: [path.resolve(__dirname, "src/index.js")],
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
  },
  externals: nodeExternals({
    allowlist: [/webpack\/container/],
  }),
  resolve: {
    extensions: [".js"],
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
      name: "fedmonserv",
      library: { type: "commonjs-module" },
      filename: "remoteEntry.js",
      exposes: {
        "./service1": "./src/services/service1",
        "./publish-event": "./src/services/publish-event"
      },
      shared: ["express"],
    }),
  ]
}

module.exports = [serverConfig]