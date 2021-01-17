var path = require("path");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const httpNode = require("./webpack/http-node");
const NodemonPlugin = require("nodemon-webpack-plugin");

var serverConfig = {
  target: httpNode,
  entry: ["@babel/polyfill", path.resolve(__dirname, "src/index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:8060",
    libraryTarget: "commonjs",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new NodemonPlugin(),
    new ModuleFederationPlugin({
      name: "orderService",
      library: { type: "commonjs-module" },
      filename: "remoteEntry.js",
      exposes: {
        "./models": "./src/models",
        "./adapters": "./src/adapters",
        "./service1": "./src/services-mock/service1",
        "./publish-event": "./src/services/publish-event",
        "./orderService": "/src/services/order-service",
        "./eventService": "/src/services/event-service",
        "./paymentService": "/src/services/payment-service",
        "./shippingService": "/src/services/shipping-service",
        "./addressService": "/src/services/address-service",
      },
      shared: {
        axios: {
          eager: true,
        },
        "smartystreets-javascript-sdk": {
          eager: true,
        },
        kafkajs: {
          eager: true,
        },
      },
    }),
  ],
};

module.exports = [serverConfig];
