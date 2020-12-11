const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakersModel = require("./../models/Sneaker");

// ***************RENDER ADDING PAGE --> GET***********
router.get("/products_add", (req, res, next) => {
  res.render("products_add");
});
// *****************END***************

// ***************RENDER ADDING PAGE --> POST***********
router.post("/products_add", async (req, res, next) => {
  try {
    await SneakersModel.create(req.body);
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});
// *****************END***************

// ***************RENDER ADDING PAGE --> POST***********
router.get("/products_manage", (req, res, next) => {
  res.render("products_manage");
});
// *****************END***************

// ***************RENDER ADDING PAGE --> POST***********
// *****************END***************
module.exports = router;
