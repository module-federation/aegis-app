import http from "http";
import websocket from "websocket";
import dns from "dns/promises";

const FQDN = "remote.aegis.com";
const PORT = 8060;
const PATH = "/api/publish";

export async function publishEvent(event, useWebSocket = true) {
  if (!event) return; 

  const host = (await dns.lookup(FQDN)) ? FQDN : "localhost";
  const serialized = JSON.stringify(event);

  if (useWebSocket) {

    const client = new websocket.client();

    client.on("connectFailed", function (error) {
      console.log("Connect Error: " + error.toString());
    });

    client.on("connect", function (connection) {
      console.log("WebSocket Client Connected");
      connection.on("error", function (error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on("close", function () {
        console.log("echo-protocol Connection Closed");
      });
      connection.on("message", function (message) {
        if (message.type === "utf8") {
          console.log("Received: '" + message.utf8Data + "'");
        }
      });

      connection.sendUTF(serialized);
    });

    client.connect(`ws://${host}:${PORT}${PATH}`, "echo-protocol");
  } else {
    const options = {
      hostname: host,
      port: 8060,
      path: PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(serialized),
      },
    };

    const req = http.request(options, res => {
      res.setEncoding("utf8");
      res.on("data", chunk => {
        console.log(chunk);
      });
      res.on("end", () => {});
    });

    req.on("error", e => {
      // console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(serialized);
    req.end();
  }
}
