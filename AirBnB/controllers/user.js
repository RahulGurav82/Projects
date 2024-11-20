const User = require("../models/user.model.js"); // Importing the User model to interact with the users collection in the database.
const { Passport } = require("passport"); // Importing Passport for authentication handling.

// Controller for signing up a new user
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body; // Extracting user details from the request body.
        
        // Creating a new user instance (without password) to register using Passport's local-mongoose plugin.
        let newuser = new User({ email, username });
        
        // Register the new user and hash the password using Passport's register method.
        let registerUser = await User.register(newuser, password);

        // Log the user in after successful registration.
        req.login(registerUser, (err) => {
            if (err) {
                return next(err); // If there's an error during login, pass it to the error handler.
            }
            req.flash("Success", "User Was Registered"); // Flash a success message to the user.
            res.redirect("/listings"); // Redirect to the listings page after registration.
        });
    } catch (e) {
        // Handle any errors (e.g., username or email already exists).
        req.flash("error", e.message); // Flash the error message to the user.
        res.redirect("/signup"); // Redirect back to the signup page on error.
    }
};

// Controller for logging in an existing user
module.exports.login = async (req, res) => {
    req.flash("Success", "Welcome"); // Flash a welcome message to the user after login.
    
    // Determine where to redirect the user after login; defaults to "/listings" if no redirect URL is specified.
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); // Redirect to the determined URL.
};

// Controller for logging out a user
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Pass any errors during logout to the error handler.
        }
        req.flash("Success", "You Are Logged Out"); // Flash a success message indicating logout.
        res.redirect("/listings"); // Redirect to the listings page after logout.
    });
};
