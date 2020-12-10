const express = require("express");
const router = new express.Router();
// const SneakerModel = require("./../models/Sneaker");
// const UserModel = require("./../models/User");
// const TagsModel = require("./../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  try {
    // await SneakerModel.find(req.params.cat);
    res.render("products");
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", (req, res) => {
  res.render("baz");
});

router.get("/signup", (req, res) => {
  res.render("sneak");
});

router.get("/signin", (req, res) => {
  res.render("love");
});

module.exports = router;
