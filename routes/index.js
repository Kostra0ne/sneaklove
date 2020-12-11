const express = require("express");
const router = new express.Router();
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    const tags = await TagModel.find();
    res.render("products", { sneakers, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const category = req.params.cat;
    const sneakers = await SneakerModel.find({ category });
    const tags = await TagModel.find();
    res.render("products", { category, sneakers, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    console.log(sneaker);
    res.render("one_product", { sneaker });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
