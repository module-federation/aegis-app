"use strict";

const session = require("express-session");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { uuid } = require("./lib/utils");
require("dotenv").config();
const services = require("./service-registry").default;
//const { handleEvents } = require("./services-mock/event-service");

const app = express();
const map = new Map();
const API_ROOT = "/api";
const PORT = 8060;

import axios from "axios";
// list the models we expose to host through module federation
import { models } from "./models";
console.log(models);

// Run test service endpoints
services.init();

// We need the same instance of the session parser in express and
// WebSocket server.
const sessionParser = session({
  saveUninitialized: false,
  secret: "$eCuRiTy",
  resave: false,
});

// Serve static files from the 'public' folder.
app.use(express.static("public"));
app.use(express.static("dist")); // remoteEntry.js
app.use(sessionParser);
app.use(express.json());

app.post("/login", function (req, res) {
  // "Log in" user and set userId to session.
  const id = uuid();
  console.log(`Updating session for user ${id}`);
  req.session.userId = id;
  res.send({ result: "OK", message: "Session updated" });
});

app.delete("/logout", function (request, response) {
  const ws = map.get(request.session.userId);
  console.log("Destroying session");
  request.session.destroy(function () {
    if (ws) ws.close();
    response.send({ result: "OK", message: "Session destroyed" });
  });
});

app.get(`${API_ROOT}/fedmonserv`, (req, res) =>
  res.send("Federated Monolith Service")
);

app.get(`${API_ROOT}/service1`, (req, res) => {
  console.log({ from: req.ip, url: req.originalUrl });
  res.status(200).send({
    from: "fedmonserv",
    ip: req.ip,
    port: PORT,
    url: req.originalUrl,
    date: new Date().toUTCString(),
  });
});

// Create HTTP server
const server = http.createServer(app);
const wss = new WebSocket.Server({ clientTracking: true, noServer: true });

// Send events emitted from host to any WS clients
app.post(`${API_ROOT}/publish`, (req, res) => {
  console.log({ event: req.body });
  //handleEvents(req, res);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ event: req.body }));
    }
  });
});

// Handle request to upgrade to websocket protocol
server.on("upgrade", function (request, socket, head) {
  console.log("Parsing session from request...");

  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      socket.destroy();
      return;
    }
    console.log("Session is parsed");
    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit("connection", ws, request);
    });
  });
});

wss.on("connection", function (ws, request) {
  const userId = request.session.userId;
  map.set(userId, ws);

  ws.on("message", function (message) {
    console.log(`Received message ${message} from user ${userId}`);
  });

  ws.on("close", function () {
    map.delete(userId);
  });
});

const accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpzTEIzNmEzZmJuS0VYb0MtWWlhNyJ9.eyJpc3MiOiJodHRwczovL2Rldi0yZmUyaWFyNi51cy5hdXRoMC5jb20vIiwic3ViIjoiRGRSSEg2dTVCc3FwclMwM3J0Z0ZEdjVwNnh6Q2RFVUtAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbWljcm9saWIuaW8vIiwiaWF0IjoxNjE2MzEwNzIyLCJleHAiOjE2MTYzOTcxMjIsImF6cCI6IkRkUkhINnU1QnNxcHJTMDNydGdGRHY1cDZ4ekNkRVVLIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.QlAiBv74oXQrezbmzRlP0XiEU-_dKg2pLy2ohglYELDBmel3eDB95jgFDwUftqdNhlcD0JG8-1KDynuxixwY_G0FdJ1P2O0TuJM1bD6e3cPkpYxbAqZkHyjOYzBs6WV8U1Lmcg2b8vfbPF4wm-UVRS685b1pUit5hKNZgBsLSLvqveOCySIG1VYWsjcs3D-OilaW4tiKBbtufiQSw3TJFGBWcQrouhl24WBQC7VMu-kWMkdqZGtyV44Hy2X8DltLw48QcmpeW0PtjVC_L1JGaLd3upShSBk_IC0CJAX1S065OXmKiGUKyQg6P1qqCzSqz8Yn7ac5iKJtmw_9jB2aQw";
axios.defaults.headers.common["Authorization"] = `bearer ${accessToken}`;

setTimeout(() => {
  try {
    const https = require("https");
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    axios
      .get("https://localhost:8707/microlib/reload", { httpsAgent })
      .then(response => console.log(response.data));
  } catch (e) {
    console.log(e);
  }
}, 20000);

server.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}\n`);
});
