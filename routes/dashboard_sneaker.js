const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");
const uploader = require("./../config/cloudinary");

//ALL ROUTES ARE PREFIXED WITH /dashboard_sneaker

// add routes = add, delete, update




module.exports = router;
