const express = require("express");
const router = new express.Router();
const SneakersModel = require("./../models/Sneaker");

// console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`);

//********Home********* */
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/home", (req, res) => {
  res.render("index");
});
// ************END************

// **************Display all sneakers**********
router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakersModel.find();
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
// *****************END*************************

// **************Display all sneakers MEN**********
router.get("/sneakers/men", async (req, res, next) => {
  try {
    const sneakers = await SneakersModel.find({ category: { $eq: "men" } });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
// *****************END*************************

// **************Display all sneakers KIDS**********
router.get("/sneakers/kids", async (req, res, next) => {
  try {
    const sneakers = await SneakersModel.find({ category: { $eq: "kids" } });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
// *****************END*************************

// **************Display all sneakers WOMEN**********
router.get("/sneakers/women", async (req, res, next) => {
  try {
    const sneakers = await SneakersModel.find({ category: { $eq: "women" } });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
// *****************END*************************

// ************************
router.get("/one-product/:id", async (req, res, next) => {
  try {
    const oneProduct = await SneakersModel.findById(req.params.id);
    res.render("one_product", oneProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
