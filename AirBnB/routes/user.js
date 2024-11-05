const express = require("express");
const Router = express.Router({ mergeParams : true});
const User = require("../models/user.model.js");
const { Passport } = require("passport");
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const passport = require("passport");



Router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
    // res.send("form");
});

Router.post("/signup", wrapAsync(async(req, res) => {
    try {
        let { username, email, password } = req.body;
        let newuser = new User({email, username});
        let registerUser = await User.register(newuser, password);
        req.flash("Success", "User Was Register");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));


Router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

Router.post("/login", passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}), async(req, res) => {
    req.flash("Success", "welocme");
    res.redirect("/listings");
});
module.exports = Router;