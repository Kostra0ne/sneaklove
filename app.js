require("dotenv").config();
require("./config/mongo"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates

// base dependencies
const express = require("express");
const app = express();
const path = require("path"); //ajout 
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const hbs = require("hbs"); //modif
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dev_mode = false; // a changer pour faire les vérifs
const logger = require("morgan");

// config logger (pour debug)
app.use(logger("dev"));

// initial config
app.set("views", path.join(__dirname, "views")); //modif
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));//modif
hbs.registerPartials(path.join(__dirname, "views/partial"));//modif
app.use(express.urlencoded({ extended: true }));// modif
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
/* app.locals.site_url = process.env.SITE_URL; */

app.use(flash());

// CUSTOM MIDDLEWARES

if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // triggers dev mode during dev phase
  app.use(require("./middlewares/debugSessionInfos")); // displays session debug
}

app.use(require("./middlewares/exposeLoginStatus"));
app.use(require("./middlewares/exposeFlashMessage"));

// routers
app.use("/", require("./routes/index")); //collection
app.use("/dashboard_sneaker", require("./routes/dashboard_sneaker")); //CRUD actions
app.use("/auth", require("./routes/auth"));//ajout
module.exports = app;
