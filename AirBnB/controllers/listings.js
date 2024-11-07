const Listing = require("../models/listing.model.js"); // Importing the Listing model


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}

module.exports.newListing = (req, res) => {
    res.render("listings/new");
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listings = await Listing.findById(id).populate({path : "reviews", populate : { path : "author"}}).populate("owner");
    if(!listings){
        req.flash("error", "Listings You Requested. Not Exist..!")
        res.redirect("/listings")
    }
    res.render("listings/show", { listings });
}

module.exports.addListing = async (req, res) => {
    let url = req.file.path;
    // console.log(req.path);
    let filename = req.file.filename;

    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename};
    await newListing.save();
    req.flash("Success", "New Listing Created.");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listings = await Listing.findById(id);
    if(!listings){
        req.flash("error", "Listings You Requested. Not Exist..!")
        res.redirect("/listings")
    }
    res.render("listings/edit", { listings });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("Success", "Listing Updated.")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Success", " Listing Deleted.")
    res.redirect("/listings");
}