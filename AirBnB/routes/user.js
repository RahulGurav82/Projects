const express = require("express");
const Router = express.Router({ mergeParams : true});
const { Passport } = require("passport");
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js");


Router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

Router.post("/signup", wrapAsync( userController.singup));

Router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

Router.post("/login", savedRedirectUrl, passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}), userController.login);

Router.get("/logout", userController.logout);

module.exports = Router;