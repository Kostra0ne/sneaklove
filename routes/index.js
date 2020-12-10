const express = require("express");
const router = new express.Router();
const SneakerModel = require("./../models/Sneaker");
const UserModel = require("./../models/User");
const TagModel = require("./../models/Tag");

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
    res.render("one_product", await SneakerModel.findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/collection/:id", async (req, res, next) => {
  const tag = await TagModel.findById(req.params.id);
  const tags = await TagModel.find();
  const sneakers = await SneakerModel.find({ id_tags: tag });
  res.render("products", { sneakers, tags });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
