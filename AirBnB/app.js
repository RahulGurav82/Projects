// Import necessary modules
const express = require("express"); // Importing Express framework
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB connection
const path = require("path"); // Importing 'path' module to handle file and directory paths
const methodOverride = require("method-override"); // Importing method-override for overriding HTTP methods
const ejsMate = require("ejs-mate"); // Importing ejsMate for EJS layouts
const Listing = require("./models/listing.model.js"); // Importing the Listing model
const wrapAsync = require("./utils/wrapAsync.js"); // Utility to handle async errors
const ExpressError = require("./utils/ExpressError.js"); // Custom error class
const { ListingSchema } = require("./schema.js"); // Importing Joi schema for validation

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

// Middleware for schema validation
const validateSchema = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(err => err.message).join(', '));
    } else {
        next();
    }
};

// Routes
app.get("/", (req, res) => {
    res.send("App is working.");
});

app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/show", { listings });
}));

app.post("/listings/new", validateSchema, wrapAsync(async (req, res) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/edit", { listings });
}));

app.put("/listings/:id/edit", validateSchema, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
}));

app.delete("/listings/:id/delete", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

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
