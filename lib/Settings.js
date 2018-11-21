"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var argv = minimist_1.default(process.argv.slice(2));
function getOpt(option, fallback) {
    return argv[option] ? argv[option] : fallback;
}
var Settings = /** @class */ (function () {
    function Settings() {
        this.debug = getOpt("d", false);
        this.viewport = {
            height: getOpt("h", 1366),
            width: getOpt("w", 768),
        };
    }
    Settings.prototype.launchOptions = function () {
        return {
            headless: this.debug,
        };
    };
    return Settings;
}());
exports.default = Settings;
