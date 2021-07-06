/**
 * WEBSWITCH (c)
 * websocket clients connect to a common server,
 * which broadcasts any messages it receives.
 */
"use strict";

import http from "http";
import websocket from "websocket";
import dns from "dns/promises";

const FQDN = process.env.WEBSWITCH_HOST || "webswitch.aegis.dev";
const PORT = 8060;
const PATH = "/api/publish";

async function getHostName() {
  try {
    return (await dns.lookup(FQDN)) ? FQDN : "localhost";
  } catch (error) {
    console.warn("dns lookup", error);
  }
  return "localhost";
}

async function httpClient({
  hostname,
  port,
  path,
  method = "GET",
  payload = "",
}) {
  return new Promise(function (resolve, reject) {
    const contentLength = ["POST", "PATCH"].includes(method)
      ? Buffer.byteLength(payload)
      : 0;
    const contentHeaders = { "Content-Type": "application/json" };
    const headers =
      contentLength > 0
        ? { ...contentHeaders, "Content-Length": contentLength }
        : contentHeaders;

    const options = {
      hostname,
      port,
      path,
      method,
      headers,
    };

    try {
      const req = http.request(options, res => {
        res.setEncoding("utf8");
        res.on("data", chunk => console.log(chunk));
        res.on("error", e => console.warn(httpClient.name, e.message));
        res.on("end", resolve);
      });
      req.on("error", e => {
        reject(e);
      });
      if (contentLength > 0) req.on("connect", () => req.write(payload));
    } catch (e) {
      console.warn(httpClient.name, e.message);
    }
  });
}

/**
 * Connect to Webswitch server.
 * @param {websocket.client} client
 * @returns {Promise<websocket.connection>}
 */
async function webswitchConnect(client, url, observer) {
  return new Promise(function (resolve, reject) {
    try {
      console.debug("connecting to...", url);

      client.on("connect", function (connection) {
        console.debug("...connected to", url, connection.remoteAddress);

        connection.on("message", function (message) {
          console.debug("received message from", url);

          if (message.type === "utf8") {
            const event = JSON.parse(message);

            observer.notify(event.eventName, {
              message,
              address: connection.remoteAddress,
            });
          }
        });

        connection.on("error", function (error) {
          console.warn(webswitchConnect.name, error.message);
          reject(error);
        });

        resolve(connection);
      });

      client.on("connectFailed", function (error) {
        reject(error);
      });
      client.on("error", function (error) {
        reject(error);
      });
      client.connect(url);
    } catch (e) {
      console.warn(webswitchConnect.name, e.message);
    }
  });
}
let webswitchConnection;

export async function publishEvent(event, observer, useWebswitch = true) {
  if (!event) return;

  const hostname = await getHostName();
  const serializedEvent = JSON.stringify(event);

  if (useWebswitch) {
    if (!(webswitchConnection && webswitchConnection.connected)) {
      try {
        // login
        await httpClient({
          hostname,
          port: PORT,
          path: "/login",
          method: "POST",
        });

        webswitchConnection = await webswitchConnect(
          new websocket.client(),
          `ws://${hostname}:${PORT}${PATH}`,
          observer
        );

        webswitchConnection.sendUTF(serializedEvent);
      } catch (e) {
        console.warn(publishEvent.name, e.message);
      }
    }
  } else {
    httpClient({
      hostname,
      port,
      path,
      method: "POST",
      payload: serialziedEvent,
    });
  }
}
