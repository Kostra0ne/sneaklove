const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require('./../models/Sneaker');//Sneaker model
const TagsModel = require("./../models/Tag");//Tag model
const UserModel = require("./../models/User");
const uploader = require("./../config/cloudinary");//Require cloudy


//Route Create
router.get("/create", (req, res) =>{
    res.render("products_add");
});

router.post("/prod-add", uploader.single("sneaker-img"), async (req, res, next) =>{
    const newSneak = { ...req.body };
    newSneak.logo = req.file.path || null; // req.file.path leads to an url hosting the image @cloudinary
    try {
        await SneakerModel.create(newSneak);
        res.redirect("products");
    } catch (error) {
        next(error);
    }
});


module.exports = router;
