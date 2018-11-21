import { LaunchOptions, Viewport } from "puppeteer";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

function getOpt(option: string, fallback: string | number): string | number {
  return process.env[option]
    ? typeof fallback === "number"
      ? parseInt(process.env[option]!)
      : process.env[option]!
    : fallback;
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