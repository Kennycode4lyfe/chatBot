const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const path = require("path");
const process = require("process");

//file path for html files in local storage to be rendered
const filepath = path.join("/Users", "HP", "Desktop", "chatBot", "frontend");

//file path for html files to be rendered in production
const productionFilePath = process.env.FILEPATH;

authRouter.get("/", (req, res) => {
  const isAuthenticated = !!req.user;
  console.log(isAuthenticated);
  if (isAuthenticated) {
    console.log("user is in the restaurant");
  } else {
    console.log("unknown user");
  }
  //if user details is still found in session, render the home page else render the index page
  res.sendFile(isAuthenticated ? "home.html" : "index.html", {
    root: productionFilePath || filepath,
  });
});

authRouter.post(
  "/login",
  passport.authenticate("custom", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = authRouter;
