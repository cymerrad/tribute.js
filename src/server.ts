import errorHandler from "errorhandler";

import app from "./app";
import { browser } from "./browser";

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

  await browser.init();

  if (app.get("env") === "development") {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${app.get("port")}`, { waitUntil: "networkidle2" });
  }

  console.log("  Press CTRL-C to stop\n");
});

export default server;
