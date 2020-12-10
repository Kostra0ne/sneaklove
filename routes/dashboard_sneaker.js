const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const TagModel = require("./../models/Tag");

router.get("/", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.get("/prod-edit/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("product_edit", sneaker);
  } catch (err) {
    next(err);
  }
});

router.post("/prod-edit/:id", async (req, res, next) => {
  try {
    const newSneaker = { ...req.body };
    await SneakerModel.findByIdAndUpdate(req.params.id, newSneaker, {
      new: true,
    });
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.post("/prod-add", async (req, res, next) => {
  try {
    await SneakerModel.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/prod-delete/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
