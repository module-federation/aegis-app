// var WebSocketServer = require("websocket").server;
// const express = require("express");
// const app = express();

// var clients = [];
// var socket = new WebSocketServer({
//   httpServer: app.listen(8060, () => console.log("listening")),
//   autoAcceptConnections: true,
//   trackClient,
// });

// socket.on("request", function (request) {
//   var connection = request.accept("any-protocol", request.origin);
//   clients.push(connection);

//   connection.on("message", function (message) {
//     //broadcast the message to all the clients
//     clients.forEach(function (client) {
//       client.send(message.utf8Data);
//     });
//   });
// });
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ clientTracking: true, port: 8062 });

wss.broadcast = function (data, sender) {
  wss.clients.forEach(function (client) {
    if (client.OPEN && client !== sender) {
      client.send(data);
    }
  });
};

wss.on("connection", function (client) {
  console.log("client connected", client.url);
  client.addListener("ping", function () {
    client.pong();
  });
  client.on("message", function (message) {
    console.log(message);
    wss.broadcast(message, client);
  });
});
