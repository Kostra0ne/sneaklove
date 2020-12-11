const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const TagModel = require("./../models/Tag");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

router.use(protectAdminRoute);

router.get("/", protectAdminRoute, async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/prod-add", protectAdminRoute, (req, res) => {
  res.render("products_add");
});

router.get("/prod-edit/:id", protectAdminRoute, async (req, res, next) => {
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

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  const newSneaker = { ...req.body };
  if (!req.file) newSneaker.image = undefined;
  else newSneaker.image = req.file.path;
  console.log(newSneaker);
  try {
    await SneakerModel.create(newSneaker);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/prod-delete/:id", protectAdminRoute, async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
