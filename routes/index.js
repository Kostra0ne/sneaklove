const express = require("express");
const router = new express.Router();
const SneakerModel = require("../models/Sneaker");
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

router.get("/sneakers/:cat", (req, res) => {
  res.render("");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
