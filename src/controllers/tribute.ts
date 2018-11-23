import { Request, Response } from "express";
import { browser } from "../browser";
import { rfc3339 } from "../util/date";
import path from "path";
import fs from "fs";
import assert from "assert";
import Settings from "../config/settings";
import logger from "../util/logger";
import { awaitExpression, assertAnyTypeAnnotation } from "babel-types";

const settings = new Settings();

/**
 * @param {!String} directory
 */
function checkDirectorySync(directory: string) {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const FORGOTTEN_PASS_TEXT = "Forgotten password";
const forgotten_re = new RegExp(FORGOTTEN_PASS_TEXT);

/**
 * Post /
 * Execute a tribute.
 */
export let postTribute = (req: Request, res: Response) => {
  req.assert("fb_id", "FB id cannot be blank").notEmpty();
  req.assert("tribute_body", "Message cannot be blank").notEmpty();
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Pasword cannot be blank").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/");
  }

  const fb_id = req.body.fb_id;
  const tribute_body = req.body.tribute_body;
  const email = req.body.email;
  const password = req.body.password;

  browser.newPage()
    .then(async page => {
      await page.goto(`https://www.messenger.com/t/${fb_id}`, { waitUntil: "networkidle2" });

      let loggedIn = false;

      const loginbutton = "#loginbutton";
      const pageBody = "body";
      try {
        // Button isn"t available at once
        await page.waitForSelector(loginbutton, { timeout: 3000 });
      } catch (err) {
        // We are possibly already logged in?
        loggedIn = true;
      }

      if (!loggedIn) {
        // Type into email and password box.
        await page.type("#email", `${email}`);
        await page.type("#pass", `${password}`);

        // TODO assert that input is present

        await page.click(loginbutton);

        await page.waitForNavigation({ waitUntil: "networkidle2" });

        const found = (await page.content()).match(forgotten_re);
        if (found) {
          req.flash("errors", { msg: "Invalid password" });
          return res.redirect("/");
        }
      }
      await page.click(pageBody);

      // Type in message and send with "enter"
      await page.type(pageBody, `${tribute_body}`);
      await page.type(pageBody, "\n");

      // Giving some time for message to be sent
      await sleep(3000);

      const now = rfc3339();
      const screenshotDirNormalized = path.normalize(`./${settings.screenshotDir}`);
      checkDirectorySync(screenshotDirNormalized);

      const screenLocation = path.format({
        name: `messenger_${fb_id}_${now}`,
        ext: ".png",
        dir: screenshotDirNormalized,
      });

      // Saving
      logger.debug(`Saving to ${screenLocation}`);
      await page.screenshot({ path: screenLocation });

      await page.close();

      req.flash("success", { msg: "Tribute has been paid successfully!" });
      res.redirect("/");
    })
    .catch(err => {
      req.flash("errors", err);
      return res.redirect("/");
    });
};