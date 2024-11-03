const express = require("express");
const Router = express.Router({ mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const {reviewsSchema } = require("../schema.js"); // Importing Joi schema for validation
const ExpressError = require("../utils/ExpressError.js"); // Custom error class
const Listing = require("../models/listing.model.js"); // Importing the Listing model
const Review = require("../models/review.model.js"); // Importing the Listing model

const validateReviews = (req, res, next) => {
    const { error } = reviewsSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(err => err.message).join(', '));
    } else {
        next();
    }
};
Router.post("/", validateReviews,  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
 
    listing.reviews.push(newReview);
 
    await newReview.save().then(()=> console.log("Saved")).catch((err) => console.log("error while new review saved"));
    await listing.save().then(()=> console.log("Saved")).catch((err) => console.log("error while new listing saved"));
 
    // console.log("New review saved");
    res.redirect(`/listings/${id}`);
 }));
 

 Router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // Pull the review from the listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);

    // Redirect back to the listing
    res.redirect(`/listings/${id}`);
}));

module.exports = Router;