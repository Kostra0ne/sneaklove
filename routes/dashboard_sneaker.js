const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploader = require("./../config/cloudinary");
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

router.get("/", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();

    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/create", (req, res) => {
  res.render("products_add");
});

router.post("/create", async (req, res, next) => {
  const newSneaker = { ...req.body };
  try {
    await SneakerModel.create(newSneaker);
    res.redirect("products_manage");
  } catch (err) {
    next(err);
  }
});

router.get("/update/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id); // fetch the label to update
    res.render("product_edit", sneaker); // pass the found label to the view
  } catch (err) {
    next(err); // if an error occurs, display it on error.hbs page
  }
});

router.post("/:id", async (req, res, next) => {
  const sneakerToUpdate = { ...req.body };
  try {
    await SneakerModel.findByIdAndUpdate(req.params.id, sneakerToUpdate, {
      new: true,
    });
    res.redirect("/dashboard/products_manage");
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    // use the model to delete one label by id
    const deleteSneaker = await SneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard/"); // then redirect to labels full list
  } catch (err) {
    next(err);
  }
});

module.exports = router;
