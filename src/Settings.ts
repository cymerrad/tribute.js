import { LaunchOptions, Viewport } from "puppeteer";
import dotenv from "dotenv";
import minimist from "minimist";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

const argv = minimist(process.argv.slice(2));

function getOpt<T>(option: string, fallback: T): T {
  return argv[option] ? argv[option] : fallback;
}

class Settings {
  debug: boolean;
  viewport: Viewport;

  constructor() {

    this.debug = !prod;
    this.viewport = {
      height: getOpt("h", 1366),
      width: getOpt("w", 768),
    } as Viewport;
  }

  launchOptions(): LaunchOptions {
    return {
      headless: this.debug,
      defaultViewport: this.debug ? undefined : this.viewport,
    } as LaunchOptions;
  }
}

export default Settings;