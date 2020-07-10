const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");

router.get("/collection", (req, res, next) => {
    sneakerModel.find()
        .then((sneakers) => {
        res.render("products", {sneakers})
        })
        .catch(next);

});

router.get("/:cat", (req, res,next) => {
   sneakerModel.find(
        {category: req.params.cat}
   ).then((sneakers) => {
    res.render("products", {sneakers} ); 
   })
    .catch(next)
    
});
  






module.exports = router;
