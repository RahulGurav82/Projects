// Import necessary modules
const express = require("express"); // Importing Express framework
const mongoose = require("mongoose");
const app = express(); // Creating an instance of Express
const PORT = 3000; // Setting the port number for the server
const path = require("path"); // Importing 'path' module to handle file and directory paths
const methodOverride = require("method-override"); // Importing method-override for overriding HTTP methods
const Listing = require("./models/listing.model.js");
const { render } = require("ejs");

app.set("view engine", "ejs"); // Setting the view engine to EJS for templating
app.set("views", path.join(__dirname, "/views")); // Setting the views directory
app.use(express.static(path.join(__dirname, "public"))); // Serving static files from the 'public' directory
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded data (e.g., form submissions)
app.use(methodOverride("_method")); // Enabling method override to support PUT and DELETE methods

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("Connect To DB");
})
.catch((err)=> {
    console.log("Error During Connect To DB", err);
})


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res)=> {
    res.send("App Work.")
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
});

// new listing route
app.get("/listings/new", (req, res)=> {  
    res.render("./listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let listings = await Listing.findById(id);
    res.render("./listings/show.ejs", {listings});
});

app.post("/listings/new", async (req, res) => {
    let newListing = new Listing(req.body.listing);
    // console.log(newListing);
    newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res)=> {
    let {id} = req.params;
    let listings = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listings});
});

app.put("/listings/:id/edit", async (req, res)=> {
    let {id} = req.params;
    // console.log(...req.body.listing)
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
});

app.delete("/listings/:id/delete", async (req, res)=> {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


app.listen(PORT, ()=>{
    console.log(`Server Is Running On PORT ${PORT}`);
});