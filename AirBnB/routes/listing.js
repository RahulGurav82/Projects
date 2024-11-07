const express = require("express");
const Router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const { isLoggedIn } = require("../middleware.js");
const { isOwner, validateSchema } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

Router.get("/", wrapAsync(listingController.index));

Router.get("/new", isLoggedIn, listingController.newListing);

Router.get("/:id", wrapAsync(listingController.showListing));

Router.post("/new", isLoggedIn, validateSchema, wrapAsync(listingController.addListing));

Router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

Router.put("/:id/edit", isLoggedIn, isOwner, validateSchema, wrapAsync(listingController.updateListing));

Router.delete("/:id/delete", isLoggedIn , isOwner, wrapAsync(listingController.destroyListing));

module.exports = Router;