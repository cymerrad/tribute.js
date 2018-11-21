"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === "production";
function getOpt(option, fallback) {
    return process.env[option]
        ? typeof fallback === "number"
            ? parseInt(process.env[option])
            : process.env[option]
        : fallback;
}
class Settings {
    constructor() {
        this.debug = !prod;
        this.viewport = {
            height: getOpt("h", 1366),
            width: getOpt("w", 768),
        };
    }
    launchOptions() {
        return {
            headless: this.debug,
            defaultViewport: this.debug ? undefined : this.viewport,
        };
    }
}
exports.default = Settings;
//# sourceMappingURL=settings.js.map