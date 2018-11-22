"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../util/logger"));
dotenv_1.default.config({ path: ".env" });
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === "production";
function getOpt(option, fallback) {
    return process.env[option] ? process.env[option] : fallback;
}
function getInt(option, fallback) {
    return parseInt(getOpt(option, `${fallback}`));
}
function getBool(option, fallback) {
    return process.env[option]
        ? process.env[option] === "true"
            ? true // defined and literal true
            : process.env[option] === "false"
                ? false // defined and literal false
                : fallback // defined but neither true, nor false
        : fallback; // undefined
}
class Settings {
    constructor() {
        this.debug = !prod || getBool("DEBUG", false);
        this.viewport = {
            height: getInt("height", 768),
            width: getInt("width", 1366),
        };
        logger_1.default.debug("Loaded %s", JSON.stringify(this));
    }
    launchOptions() {
        return {
            headless: !this.debug,
            defaultViewport: this.debug ? undefined : this.viewport,
        };
    }
}
exports.default = Settings;
//# sourceMappingURL=settings.js.map