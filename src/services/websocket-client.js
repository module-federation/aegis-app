const WebSocket = require("ws");
const webhook = {
  eventName: "hot-reload",
  eventType: "webhook",
  eventData: {
    url: "http://localhost:8070/restart",
    desc: "Call webhook to hot replace updated code.",
  },
};

ws = new WebSocket(`ws://localhost:8060`);

ws.onerror = function () {
  console.log("WebSocket error");
};
ws.onopen = function () {
  console.log("WebSocket connection established");
  ws.send(JSON.stringify(webhook));
};
ws.onclose = function () {
  console.log("WebSocket connection closed");
  ws = null;
};
ws.onmessage = function (data) {
  console.log(JSON.stringify(JSON.parse(data.data), undefined, 2));
  ws.send(JSON.stringify(webhook));
};
