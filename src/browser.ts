import Settings from "./config/settings";
import puppeteer, { Browser, Page } from "puppeteer";
import logger from "./util/logger";
import { setTimeout } from "timers";

const settings = new Settings();
const resolveTimeout = 1000; // ms
const resolveTryLimit = 10;

// TODO
// https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md

class BrowserHandler {
  private ready: boolean;
  private browser: Browser;
  readonly settings: Settings;

  constructor(settings: Settings) {
    this.ready = false;
    this.settings = settings;
    this.browser = {} as Browser;
  }

  init = async () => {
    this.browser = await puppeteer.launch(this.settings.launchOptions());
    this.ready = true;
  }

  newPage = async (repeated = 0): Promise<Page> => {
    if (this.ready) {
      const page = await this.browser.newPage();
      await page.setViewport(this.settings.viewport);
      return page;
    }
    if (repeated > resolveTryLimit) {
      throw new Error("Reached limit on resolve tries.");
    }
    logger.debug(`Will retry in ${resolveTimeout / 1000} seconds (${repeated})`);
    return new Promise<Page>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const value = await this.newPage(++repeated);
          return resolve(value);
        }
        catch (reason) {
          return reject(reason);
        }
      }, resolveTimeout);
    });
  }

}

export const browser = new BrowserHandler(settings);
