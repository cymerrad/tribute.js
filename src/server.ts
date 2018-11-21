import errorHandler from "errorhandler";

import app from "./app";

import puppeteer, { Browser } from "puppeteer";
import Settings from "./config/settings";

let browser: Browser;

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );

  const settings = new Settings();

  browser = await puppeteer.launch(settings.launchOptions());
  const page = await browser.newPage();
  await page.setViewport(settings.viewport);

  console.log("  Press CTRL-C to stop\n");
});

export default server;
