/**
 * WEBSWITCH (c)
 * websocket clients connect to a common server,
 * which broadcasts any messages it receives.
 */
"use strict";

import WebSocket from "ws";
import dns from "dns/promises";
import http from "http";
import https from "https";

const FQDN = process.env.WEBSWITCH_HOST || "webswitch.aegis.dev";
const PORT = 8060;
const PATH = "/api/publish";

async function getHostName() {
  try {
    return (await dns.lookup(FQDN), address => console.log(address))
      ? FQDN
      : "localhost";
  } catch (error) {
    console.warn("dns lookup", error);
  }
  return "localhost";
}

function getHeaders(method, payload) {
  const contentLength = ["POST", "PATCH"].includes(method)
    ? Buffer.byteLength(payload)
    : 0;

  const contentHeaders = { "Content-Type": "application/json" };

  return contentLength > 0
    ? { ...contentHeaders, "Content-Length": contentLength }
    : contentHeaders;
}

const client = {
  http: http,
  https: https,
};

async function httpsClient({
  hostname,
  port,
  path,
  protocol = "https",
  method = "GET",
  payload = "",
  safe = true,
}) {
  return new Promise(function (resolve, reject) {
    const normal = {
      hostname,
      port,
      path,
      method,
      headers: getHeaders(method, payload),
    };

    const options = safe ? normal : { ...normal, rejectUnauthorized: false };
    const chunks = [];

    try {
      const req = client[protocol].request(options, res => {
        res.setEncoding("utf8");
        res.on("data", chunk => chunks.push(chunk));
        res.on("error", e => console.warn(httpsClient.name, e.message));
        res.on("end", () => resolve(chunks.join("")));
      });
      req.on("error", e => {
        reject(e);
      });
      if (payload) req.on("connect", () => req.write(payload));
    } catch (e) {
      console.warn(httpsClient.name, e.message);
    }
  });
}

let webswitchClient;

export async function publishEvent(event, observer, useWebswitch = true) {
  if (!event) return;

  const hostname = await getHostName();
  const serializedEvent = JSON.stringify(event);

  try {
    if (useWebswitch) {
      if (!webswitchClient || !webswitchClient.OPEN) {
        console.debug("calling", event);
        // login first
        await httpsClient({
          hostname,
          port: PORT,
          path: "/login",
          method: "POST",
          protocol: "http",
        });

        webswitchClient = new WebSocket(`ws://${hostname}:${PORT}${PATH}`);
        webswitchClient.on("open", function () {
          webswitchClient.send(serializedEvent);
        });
        webswitchClient.on("message", function (message) {
          const event = JSON.parse(message);
          console.debug(publishEvent.name, message);
          observer.notify(event.eventName, event);
        });
      }
      webswitchClient.send(serializedEvent);
    } else {
      httpsClient({
        hostname,
        port,
        path,
        method: "POST",
        payload: serialziedEvent,
      });
    }
  } catch (e) {
    console.warn(publishEvent.name, e.message);
  }
}
