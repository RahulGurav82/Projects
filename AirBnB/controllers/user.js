const User = require("../models/user.model.js");
const { Passport } = require("passport");



module.exports.singup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        let newuser = new User({email, username});
        let registerUser = await User.register(newuser, password);
        req.login(registerUser, (err) => {
            if(err) {
                return next();
            }
            req.flash("Success", "User Was Register");
            res.redirect("/listings");
        });        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async(req, res) => {
    req.flash("Success", "welocme");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
           return next(err);
        }
        req.flash("Success", "You Are Logged Out");
        res.redirect("/listings");
    });
}