const Listing = require("../models/listing.model.js"); // Importing the Listing model
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

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
        res.redirect("/listings");
    }
    res.render("listings/show", { listings });
}

module.exports.addListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send(); 
    
    console.log(response.body.features[0].geometry);
    
    let url = req.file.path;
    let filename = req.file.filename;

    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename};
    newListing.geometry = response.body.features[0].geometry;
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
    let orignalImageUrl = listings.image.url;
    orignalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listings, orignalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename};
        await listing.save();
    }
    
    req.flash("Success", "Listing Updated.")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Success", " Listing Deleted.")
    res.redirect("/listings");
}