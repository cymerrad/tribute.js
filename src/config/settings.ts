import { LaunchOptions, Viewport } from "puppeteer";
import dotenv from "dotenv";
import logger from "../util/logger";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

function getOpt(option: string, fallback: string): string {
  return process.env[option] ? process.env[option]! : fallback;
}

function getInt(option: string, fallback: number): number {
  return parseInt(getOpt(option, `${fallback}`));
}

function getBool(option: string, fallback: boolean): boolean {
  return process.env[option]
    ? process.env[option] === "true"
      ? true // defined and literal true
      : process.env[option] === "false"
        ? false // defined and literal false
        : fallback // defined but neither true, nor false
    : fallback; // undefined
}

class Settings {
  debug: boolean;
  viewport: Viewport;

  constructor() {

    this.debug = !prod || getBool("DEBUG", false);
    this.viewport = {
      height: getInt("height", 768),
      width: getInt("width", 1366),
    } as Viewport;

    logger.debug("Loaded %s", JSON.stringify(this));
  }

  launchOptions(): LaunchOptions {
    return {
      headless: !this.debug,
      defaultViewport: this.debug ? undefined : this.viewport,
    } as LaunchOptions;
  }
}

export default Settings;