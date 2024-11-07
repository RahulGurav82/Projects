const express = require("express");
const Router = express.Router({ mergeParams : true});
const { Passport } = require("passport");
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js");

Router.route("/signup")
.get((req, res) => {
    res.render("users/signup.ejs");
})
.post(wrapAsync( userController.singup));


Router.route("/login")
.get((req, res) => {
    res.render("users/login.ejs");
})
.post(savedRedirectUrl, passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}), userController.login);


Router.get("/logout", userController.logout);

module.exports = Router;