/**
 * WEBSWITCH (c)
 * websocket clients connect to a common server,
 * which broadcasts any messages it receives.
 */
"use strict";

import WebSocket from "ws";
import dns from "dns/promises";

const FQDN = process.env.WEBSWITCH_HOST || "webswitch.aegis.dev";
const PORT = 8062;
const PATH = "/api/publish";

async function getHostName() {
  try {
    return (await dns.lookup(FQDN)) ? FQDN : "localhost";
  } catch (error) {
    console.warn("dns lookup", error);
  }
  return "localhost";
}

/**@type import("ws/lib/websocket") */
let ws;

export async function publishEvent(event, observer) {
  if (!event) return;

  const hostname = await getHostName();
  const serializedEvent = JSON.stringify(event);

  try {
    function webswitch() {
      console.debug("webswitch sending", event);

      if (!ws) {
        ws = new WebSocket(`ws://${hostname}:${PORT}${PATH}`);

        ws.on("message", function (message) {
          console.debug(message);
          const event = JSON.parse(message);
          console.debug(event);
          observer.notify(event.eventName, event);
        });

        ws.on("open", function () {
          ws.send(serializedEvent);
        });

        ws.on("error", function (error) {
          console.error("webswitchClient.on(error)", error);
        });
        return;
      }
      ws.send(serializedEvent);
    }
    webswitch();
  } catch (e) {
    console.warn(publishEvent.name, e.message);
  }
}
