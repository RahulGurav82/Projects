const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.model.js");

// express app setup
const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/imageshare"; // MongoDB connection URL


app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));

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

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect(MONGO_URL)
.then(() => console.log("DB Connected."))
.catch((err) => console.log("error in db connection", err));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/upload", (req, res) => {
    res.render("upload.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
    let {username, email, password } = req.body;
    let newuser = new User({username, email});
    let registerUser = await User.register(newuser, password);
    // console.log(registerUser);
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login" , passport.authenticate("local", {failureRedirect : '/'}) , async (req, res) => {
    res.send("welcome");
});

app.listen(PORT, () => {
    console.log(`server is running on : http://localhost:${PORT}`);
});