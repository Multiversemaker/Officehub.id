const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});
