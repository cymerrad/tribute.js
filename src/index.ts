import express = require("express");
import http from "http";
import bodyParser from "body-parser";
import puppeteer, { Browser } from "puppeteer";
import Settings from "./Settings";

const hostname = "127.0.0.1";
const port = 8000;

const app = express();
app.use(bodyParser.json());

let browser: Browser;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world\n");
});

server.listen(port, hostname, async () => {
  const settings = new Settings();

  browser = await puppeteer.launch(settings.launchOptions());

  console.log(`Server running at http://${hostname}:${port}/`);

  console.log(`Browser has been initialized`, browser);
});

