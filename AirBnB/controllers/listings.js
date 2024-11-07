const Listing = require("../models/listing.model.js"); // Importing the Listing model


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}