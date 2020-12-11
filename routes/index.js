const express = require("express");
const app = require("../app");
const router = new express.Router();
const SneakersModel = require("./../models/Sneaker");

//Request auth route
router.use("/signin", require("./../routes/auth"));

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

// *************Display all details by element***********
router.get("/one-product/:id", async (req, res, next) => {
  try {
    const oneProduct = await SneakersModel.findById(req.params.id);
    res.render("one_product", oneProduct);
  } catch (error) {
    next(error);
  }
});
// *****************END*************************

module.exports = router;
