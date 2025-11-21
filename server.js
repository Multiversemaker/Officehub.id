require('dotenv').config(); 
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const db = require("./Utils/db");
const path = require("path");
const userInjector = require("./Middlewares/userInjector");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("models", path.join(__dirname, "Models"));
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentuser = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(userInjector);
app.use("/", require("./Routes/auth"));
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/manager", require("./Routes/managerRoutes"));
app.use("/editor", require("./Routes/editorRoutes"));
app.use("/employee", require("./Routes/clientRoutes"));

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start server
app.listen(port, () => {
  console.log(`Selamat Datang Di Aplikasi Workspace Tahap I`);
});