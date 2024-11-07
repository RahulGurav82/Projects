// Import necessary modules
if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express"); // Importing Express framework
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB connection
const path = require("path"); // Importing 'path' module to handle file and directory paths
const methodOverride = require("method-override"); // Importing method-override for overriding HTTP methods
const ejsMate = require("ejs-mate"); // Importing ejsMate for EJS layouts
const ExpressError = require("./utils/ExpressError.js"); // Custom error class
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.model.js");

// Express App Setup
const app = express(); // Creating an instance of Express
const PORT = 3000; // Setting the port number for the server
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // MongoDB connection URL

app.set("view engine", "ejs"); // Setting the view engine to EJS for templating
app.set("views", path.join(__dirname, "/views")); // Setting the views directory
app.engine("ejs", ejsMate); // Setting ejsMate as the template engine
app.use(express.static(path.join(__dirname, "/public"))); // Serving static files from 'public' directory
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded data (e.g., form submissions)
app.use(methodOverride("_method")); // Enabling method override to support PUT and DELETE methods

// Session Configuration
const sessionOptions = {
    secret: "mysupersecretstrings",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expiration set to 1 week from now
        maxAge: 7 * 24 * 60 * 60 * 1000, // Max age: 1 week in milliseconds
        httpOnly: true, // Ensuring the cookie is accessible only by the web server
    }
}

// Routes
app.get("/", (req, res) => {
    res.send("App is working.");
});

app.use(session(sessionOptions)); // Enabling sessions with sessionOptions
app.use(flash()); // Enabling flash messages
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Database Connection
mongoose.connect(MONGO_URL)
    .then(() => console.log("Database Connection Successful!"))
    .catch((err) => console.log("Database Connection Error:", err));

// Flash message middleware to set success/error messages
app.use((req, res, next) => {
    res.locals.Success = req.flash("Success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email : "student@gmail.com",
        username : "rahul"
    });

    let registerUser = await User.register(fakeUser, "rahul");
    res.send(registerUser);
});

// Use defined routes for listings and reviews
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// Error Handling for unknown routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// General error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
