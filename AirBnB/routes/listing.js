const express = require("express");
const Router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const { ListingSchema } = require("../schema.js"); // Importing Joi schema for validation
const ExpressError = require("../utils/ExpressError.js"); // Custom error class
const Listing = require("../models/listing.model.js"); // Importing the Listing model
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");


const validateSchema = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(err => err.message).join(', '));
    } else {
        next();
    }
};

Router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

Router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new");
});

Router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listings = await Listing.findById(id).populate({path : "reviews", populate : { path : "author"}}).populate("owner");
    if(!listings){
        req.flash("error", "Listings You Requested. Not Exist..!")
        res.redirect("/listings")
    }
    res.render("listings/show", { listings });
}));

Router.post("/new", isLoggedIn,validateSchema, wrapAsync(async (req, res) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("Success", "New Listing Created.");
    res.redirect("/listings");
}));

Router.get("/:id/edit", isLoggedIn ,isOwner,wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listings = await Listing.findById(id);
    if(!listings){
        req.flash("error", "Listings You Requested. Not Exist..!")
        res.redirect("/listings")
    }
    res.render("listings/edit", { listings });
}));

Router.put("/:id/edit", isLoggedIn, isOwner,validateSchema, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("Success", "Listing Updated.")
    res.redirect(`/listings/${id}`);
}));

Router.delete("/:id/delete", isLoggedIn , isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Success", " Listing Deleted.")
    res.redirect("/listings");
}));

module.exports = Router;