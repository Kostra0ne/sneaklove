const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const SneakerModel = require("../models/Sneaker");
const UserModel = require("../models/User");
const TagModel = require("../models/Tag");


router.get("/dashboard", async (req, res, next) => {
    const sneakers = await SneakerModel.find()
    console.log(sneakers);
    //              view        +    object
    res.render("products_manage", {sneakers} )
  });





  module.exports = router;