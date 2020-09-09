
'use strict'

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const API_ROOT = "/api";
const PORT = 8060;

app.use(bodyParser.json());
app.use(express.static('dist'));
app.get(
  `${API_ROOT}/fedmonserv`,
  (req, res) => res.send('Federated Monolith Service')
);
app.get(`${API_ROOT}/service1`, (req, res) => {
  console.log({ from: req.ip, url: req.originalUrl });
  res.status(200).send({
    "from": "fedmonserv",
    "ip": req.ip,
    "port": PORT,
    "url": req.originalUrl,
    "date": new Date().toUTCString()
  });
});
app.post(`${API_ROOT}/publish`, (req, res) => {
  console.log({ event: req.body });
  res.status(201).send({ "event": req.body, "date": new Date().toUTCString() });
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

