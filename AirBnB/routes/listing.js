const express = require("express");
const Router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Utility function to wrap async route handlers for error handling.
const listingController = require("../controllers/listings.js"); // Controller handling listing-related logic.
const multer = require("multer"); // Middleware for handling multipart/form-data (file uploads).
const { storage } = require("../cloudConfig.js"); // Cloud storage configuration for file uploads.
const upload = multer({ storage }); // Configure multer to use the specified cloud storage.
const { isOwner, validateSchema } = require("../middleware.js"); // Middleware to check if the user is the owner and to validate request data.
const { isLoggedIn } = require("../middleware.js"); // Middleware to check if a user is logged in.

// Route to fetch and display all listings
Router.get("/", wrapAsync(listingController.index));

// Routes for creating a new listing
Router.route("/new")
    .get(isLoggedIn, listingController.newListing) // Display the form for creating a new listing (requires login).
    .post(
        isLoggedIn, // Check if the user is logged in.
        validateSchema, // Validate the request data against the schema.
        upload.single('listing[image]'), // Handle a single file upload for the field 'listing[image]'.
        wrapAsync(listingController.addListing) // Add a new listing (wrapped for async error handling).
    );

// Route to fetch and display a specific listing by ID
Router.get("/:id", wrapAsync(listingController.showListing));

// Routes for editing an existing listing
Router.route("/:id/edit")
    .get(
        isLoggedIn, // Check if the user is logged in.
        isOwner, // Check if the user is the owner of the listing.
        wrapAsync(listingController.editListing) // Display the edit form for the listing.
    )
    .put(
        isLoggedIn, // Check if the user is logged in.
        isOwner, // Check if the user is the owner of the listing.
        upload.single('listing[image]'), // Handle a single file upload for the updated image.
        validateSchema, // Validate the updated request data.
        wrapAsync(listingController.updateListing) // Update the listing (wrapped for async error handling).
    );

// Route to delete a specific listing
Router.delete(
    "/:id/delete",
    isLoggedIn, // Check if the user is logged in.
    isOwner, // Check if the user is the owner of the listing.
    wrapAsync(listingController.destroyListing) // Delete the listing (wrapped for async error handling).
);

module.exports = Router; // Export the router to be used in the main app.