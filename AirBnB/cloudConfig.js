// Importing required modules from Cloudinary and multer-storage-cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuring Cloudinary with environment variables for security and credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // The Cloudinary cloud name
    api_key: process.env.CLOUD_API_KEY,  // The Cloudinary API key
    api_secret: process.env.CLOUD_API_SECRET,  // The Cloudinary API secret
});

// Setting up the storage configuration for uploading files to Cloudinary using multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  // The Cloudinary instance we configured earlier
    params: {
      folder: 'wonderlust_DEV',  // Specifies the Cloudinary folder where the images will be stored
      allowFormats: ["png", "jpg", "jpeg"],  // Restricts the allowed formats for uploads
    },
});

// Exporting the cloudinary instance and the storage configuration for use in other parts of the app
module.exports = {
    cloudinary,
    storage
};