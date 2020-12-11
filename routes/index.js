const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();
const TagModel = require("../models/Tag");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/home", (req, res) => {
  res.render("index");
});
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    res.render("products", { sneakers: await SneakerModel.find() });
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/men", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find({ category: { $eq: "men" } });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
router.get("/sneakers/kids", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find({ category: { $eq: "kids" } });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
router.get("/sneakers/women", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find({ category: { $eq: "women" } });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
router.get("/one-product/:id", async (req, res, next) => {
  SneakerModel.findById(req.params.id)
    .then((result) => res.render("one_product", { sneaker: result }))
    .catch(next);
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
