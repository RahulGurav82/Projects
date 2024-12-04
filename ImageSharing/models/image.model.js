const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    imageUrl: String,
    publicId: String,
    location: String,
    coordinates: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [longitude, latitude]
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
});

module.exports = mongoose.model("Image", ImageSchema);
