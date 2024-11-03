// Import necessary modules
const express = require("express"); // Importing Express framework
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB connection
const path = require("path"); // Importing 'path' module to handle file and directory paths
const methodOverride = require("method-override"); // Importing method-override for overriding HTTP methods
const ejsMate = require("ejs-mate"); // Importing ejsMate for EJS layouts
const ExpressError = require("./utils/ExpressError.js"); // Custom error class
const listing = require("./routes/listing.js");
const reviews = require("./routes/review.js")

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

// Database Connection
mongoose.connect(MONGO_URL)
    .then(() => console.log("Database Connection Successful!"))
    .catch((err) => console.log("Database Connection Error:", err));


// Routes
app.get("/", (req, res) => {
    res.send("App is working.");
});

app.use("/listings", listing);
app.use("/listings/:id/reviews", reviews);


// Error Handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
