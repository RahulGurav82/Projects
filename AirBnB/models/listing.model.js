// Importing mongoose and Schema from mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose to define the schema structure

// Importing the Review model, which is referenced in the Listing model
const Review = require("./review.model.js"); // Assuming you have a review model

// Defining the Listing schema
const listingSchema = new Schema({
  title: {
    type: String,  // Defining the type of 'title' as a String
    required: true,  // Making the title a required field
  },
  description: {
    type: String,  // Defining the type of 'description' as a String
    required: true,  // Making the description a required field
  },
  
  // The image field (currently commented out) stores the file name and URL of an image associated with the listing.
  // If uncommented, it provides a default image if no image is uploaded.
  // image: {
  //   filename: {
  //     type: String,  // Stores the filename of the image
  //     default: "defaultImageFilename",  // Default filename when no image is provided
  //   },
  //   url: {
  //     type: String,  // Stores the URL of the image
  //     default:
  //       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Default image URL
  //     set: (v) =>
  //       v === ""
  //         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"  // Fallback to default image if URL is empty
  //         : v,  // Otherwise, store the provided URL
  //   },
  // },
  // Image field to store URL and filename of an uploaded image
  image: {
    url: String,  // Stores the URL of the image
    filename: String,  // Stores the filename of the image
  },
  
  price: {
    type: Number,  // Defining the type of 'price' as a Number
    required: true,  // Making the price a required field
  },
  location: {
    type: String,  // Defining the type of 'location' as a String
    required: true,  // Making the location a required field
  },
  country: {
    type: String,  // Defining the type of 'country' as a String
    required: true,  // Making the country a required field
  },
  
  // Defining a reference to the 'Review' model, storing an array of review IDs
  reviews: [
    {
      type: Schema.Types.ObjectId,  // Storing ObjectId references to reviews
      ref: "Review",  // Referring to the Review model
    },
  ],
  
  // Defining the owner field as a reference to the 'User' model
  owner: {
    type: Schema.Types.ObjectId,  // Storing ObjectId reference to the User who owns the listing
    ref: "User",  // Referring to the User model
  },
  
  // Defining the geometry field, which stores geolocation data
  geometry: {
    type: {
      type: String,  // 'type' field should always be 'Point' for GeoJSON
      enum: ['Point'],  // Restricting the 'type' field to only 'Point'
      required: true  // The type field is required
    },
    coordinates: {
      type: [Number],  // Array of numbers representing latitude and longitude
      required: true  // Coordinates are required
    }
  }
});

// Creating the Listing model using the defined schema
const Listing = mongoose.model("Listing", listingSchema);

// Exporting the Listing model so it can be used elsewhere in the application
module.exports = Listing;
