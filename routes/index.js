const express = require("express");
const router = new express.Router();
const sneakerModel = require("./../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers =  await sneakerModel.find();
    res.render("products", {sneakers});
  } 
  catch(error) {next(error)}
});

router.get("/sneakers/:cat", (req, res) => {
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
