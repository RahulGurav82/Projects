const Listing = require("../models/listing.model.js"); // Importing the Listing model
const Review = require("../models/review.model.js"); // Importing the Listing model

module.exports.addReviews = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
 
    await newReview.save().then(()=> console.log("Saved")).catch((err) => console.log("error while new review saved"));
    await listing.save().then(()=> console.log("Saved")).catch((err) => console.log("error while new listing saved"));
 
    req.flash("Success", "New Review Added")
    res.redirect(`/listings/${id}`);
 }

module.exports.deleteReviews = async (req, res) => {
    const { id, reviewId } = req.params;

    // Pull the review from the listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success", "Review deleted.");
    // Redirect back to the listing
    res.redirect(`/listings/${id}`);
}
