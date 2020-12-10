// configs/cloudinary.config.js

const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary: cloudinary,
  folder: "sneaklove", // The name of the folder in cloudinary
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
