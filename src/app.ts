import express from "express";
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import flash from "express-flash";
import session from "express-session";
import path from "path";
import expressValidator from "express-validator";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as contactController from "./controllers/contact";
import * as tributeController from "./controllers/tribute";
import Settings from "./config/settings";

// Create Express server
const app = express();
const settings = new Settings();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  cookie: { secure: false },
  secret: "memes",
  resave: true,
  saveUninitialized: false,
}));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.set("screenshots", settings.screenshotDir);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.post("/", tributeController.postTribute);
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);

export default app;