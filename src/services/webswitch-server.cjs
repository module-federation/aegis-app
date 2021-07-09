"use strict";
const WebSocketServer = require("ws").Server;
const nanoid = require("nanoid").nanoid;
const server = new WebSocketServer({ clientTracking: true, port: 8062 });

server.broadcast = function (data, sender) {
  server.clients.forEach(function (client) {
    if (client.OPEN && client.webswitchId !== sender.webswitchId) {
      console.debug("sending to client", client.webswitchId);
      client.send(data);
    }
  });
};

server.on("connection", function (client) {
  client.webswitchId = nanoid();
  console.log("client connected", client.webswitchId);

  client.addListener("ping", function () {
    client.pong();
  });

  client.on("close", function () {
    console.warn("client disconnecting", client.webswitchId);
  });

  client.on("message", function (message) {
    if (client.webswitchInit) {
      server.broadcast(message, client);
      return;
    }

    if (message.toString() === client.protocol) {
      console.log("client initialized");
      client.webswitchInit = true;
      return;
    }

    client.terminate();
    console.log("terminated potential imposter client", client.webswitchId);
  });
});
