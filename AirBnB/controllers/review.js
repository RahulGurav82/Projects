const Listing = require("../models/listing.model.js"); // Importing the Listing model to interact with the listings collection in the database.
const Review = require("../models/review.model.js"); // Importing the Review model to interact with the reviews collection in the database.

// Controller to add a review to a listing
module.exports.addReviews = async (req, res) => {
    const { id } = req.params; // Extract the listing ID from the route parameters.
    const listing = await Listing.findById(id); // Find the listing by its ID.

    const newReview = new Review(req.body.review); // Create a new Review instance using the data from the request body.
    newReview.author = req.user._id; // Assign the logged-in user's ID as the author of the review.
    listing.reviews.push(newReview); // Add the new review's ID to the `reviews` array of the listing.

    // Save the new review to the database
    await newReview
        .save()
        .then(() => console.log("Saved")) // Log success message if saved successfully.
        .catch((err) => console.log("error while new review saved")); // Log error message if saving fails.

    // Save the updated listing (with the new review) to the database
    await listing
        .save()
        .then(() => console.log("Saved")) // Log success message if saved successfully.
        .catch((err) => console.log("error while new listing saved")); // Log error message if saving fails.

    req.flash("Success", "New Review Added"); // Flash a success message to the user.
    res.redirect(`/listings/${id}`); // Redirect the user back to the listing's detail page.
};

// Controller to delete a review from a listing
module.exports.deleteReviews = async (req, res) => {
    const { id, reviewId } = req.params; // Extract the listing ID and review ID from the route parameters.

    // Update the listing by pulling (removing) the review ID from its `reviews` array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document itself from the database
    await Review.findByIdAndDelete(reviewId);

    req.flash("Success", "Review deleted."); // Flash a success message to the user.

    // Redirect back to the listing's detail page
    res.redirect(`/listings/${id}`);
};
