import http from "http";

export function publishEvent(event) {
  if (!event) {
    return;
  }
  const serialized = JSON.stringify(event);

  const options = {
    hostname: "localhost",
    port: 8060,
    path: "/api/publish",
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
