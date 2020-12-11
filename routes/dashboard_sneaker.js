const express = require("express"); // import express in this module
const SneakerModel = require("./../models/Sneaker");
const router = new express.Router(); // create an app sub-module (router)
const TagModel = require("./../models/Tag");
const { render } = (require = "../app");
// const uploader = require("../config/cloudinary");

router.get("/products_add", (req, res, next) => {
  res.render("products_add");
});

router.post("/products_add", async (req, res, next) => {
  try {
    await SneakerModel.create(req.body);
    res.redirect("/products_manage");
  } catch (err) {
    next(err);
  }
});

router.get("/products_manage", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/products_manage/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/products_manage");
  } catch (err) {
    next(err);
  }
});
// edit

router.get("/products_edit/:id", async (req, res, next) => {
  try {
    res.render("product_edit", {
      sneaker: await SneakerModel.findById(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/products_edit/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/products_manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
