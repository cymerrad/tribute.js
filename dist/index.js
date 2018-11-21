"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const settings_1 = __importDefault(require("./config/settings"));
const hostname = "127.0.0.1";
const port = 8000;
const app = express();
app.use(body_parser_1.default.json());
let browser;
const server = http_1.default.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello world\n");
});
server.listen(port, hostname, () => __awaiter(this, void 0, void 0, function* () {
    const settings = new settings_1.default();
    browser = yield puppeteer_1.default.launch(settings.launchOptions());
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Browser has been initialized`, browser);
}));
//# sourceMappingURL=index.js.map