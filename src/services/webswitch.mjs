/**
 * WEBSWITCH (c)
 * websocket clients connect to a common server,
 * which broadcasts any messages it receives.
 */
("use strict");

import WebSocket from "ws";
import dns from "dns/promises";

const FQDN = process.env.WEBSWITCH_HOST || "webswitch.aegis.dev";
const PORT = 8062;
const PATH = "/webswitch/broadcast";

async function lookup(hostname) {
  try {
    const result = await dns.lookup(hostname);
    console.debug("server address", result, result.address);
    return result.address;
  } catch (error) {
    console.warn("dns lookup", error);
  }
  return null;
}

async function getHostName() {
  const hostname = await lookup(FQDN);
  return hostname ? hostname : "localhost";
}

/**@type import("ws/lib/websocket") */
let ws;

export async function publishEvent(event) {
  if (!event) return;

  const hostname = await getHostName();
  const serializedEvent = JSON.stringify(event);

  function webswitch() {
    console.debug("webswitch sending", event);

    if (!ws) {
      ws = new WebSocket(`ws://${hostname}:${PORT}${PATH}`, "webswitch");

      ws.on("message", function (message) {
        console.debug(message);
        const event = JSON.parse(message);
        console.debug(event);
      });

      ws.on("open", function () {
        ws.send(serializedEvent);
        ws.send(ws.protocol);
      });

      ws.on("error", function (error) {
        console.error("webswitchClient.on(error)", error);
      });
      return;
    }
    ws.send(serializedEvent);
  }

  try {
    webswitch();
  } catch (e) {
    console.warn(publishEvent.name, e.message);
  }
}

publishEvent("webswitch");
publishEvent("hello again");

setTimeout(() => publishEvent("webswitch"), 2000);
