const Listing = require("./models/listing.model.js"); // Importing the Listing model
const Review = require("./models/review.model.js");
const {reviewsSchema, ListingSchema } = require("./schema.js"); // Importing Joi schema for validation


module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.originalUrl);
    if( !req.isAuthenticated() ) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must Be Looged In To Create Listing!");
        return res.redirect("/login")
    }
    next();
}

module.exports.savedRedirectUrl = (req, res, next ) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You Don't Have Permission To Edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You Are A Not Author Of This reviewed..");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateSchema = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(err => err.message).join(', '));
    } else {
        next();
    }
};

module.exports.validateReviews = (req, res, next) => {
    const { error } = reviewsSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(err => err.message).join(', '));
    } else {
        next();
    }
};