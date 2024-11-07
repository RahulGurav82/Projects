const express = require("express");
const Router = express.Router({ mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js"); // Utility to handle async errors
const { isLoggedIn, isReviewAuthor, validateReviews } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

Router.post("/", isLoggedIn, validateReviews,  wrapAsync(reviewController.addReviews));
 
Router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReviews));

module.exports = Router;