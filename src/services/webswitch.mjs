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
const PATH = "/webswitch/broadcast";

/**
 * Lookup IP address of WebSwitch server.
 */
async function getServerAddress() {
  try {
    const result = await dns.lookup(FQDN);
    console.debug("server address", result);
    return result?.address ? result.address : "localhost";
  } catch (error) {
    console.error("dns lookup", error);
  }
  return "localhost";
}

/**@type import("ws/lib/websocket") */
let ws;
const serverAddress = getServerAddress().then(result => result.address);

export async function publishEvent(event, observer) {
  if (!event) return;

  serverAddress
    .then(function (address) {
      const serializedEvent = JSON.stringify(event);

      function webswitch() {
        console.debug("webswitch sending", event);

        if (!ws) {
          ws = new WebSocket(`ws://${address}:${PORT}${PATH}`);

          ws.on("message", function (message) {
            try {
              const event = JSON.parse(message);
              if (event.eventName && observer) {
                observer.notify(event.eventName, event);
              } else {
                console.warn("no eventName or observer", message);
              }
            } catch (error) {
              console.error(ws.on.name, message, error);
            }
          });

          ws.on("open", function () {
            ws.send(JSON.stringify("webswitch"));
          });

          ws.on("error", function (error) {
            console.error(ws.on.name, error);
          });
        }

        function send() {
          if (ws.readyState) {
            ws.send(serializedEvent);
          } else {
            setTimeout(() => send(), 1000);
          }
        }

        send();
      }

      try {
        webswitch();
      } catch (e) {
        console.warn(publishEvent.name, e.message);
      }
    })
    .catch(e => console.error(e));
}
