const express = require("express");
const Router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner, validateSchema } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

Router.get("/", wrapAsync(listingController.index));

Router.route("/new")
.get(isLoggedIn, listingController.newListing)
.post(isLoggedIn, validateSchema, upload.single('listing[image]'), wrapAsync(listingController.addListing));


Router.get("/:id", wrapAsync(listingController.showListing));

Router.route("/:id/edit")
.get(isLoggedIn, isOwner, wrapAsync(listingController.editListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateSchema, wrapAsync(listingController.updateListing));

Router.delete("/:id/delete", isLoggedIn , isOwner, wrapAsync(listingController.destroyListing));

module.exports = Router;