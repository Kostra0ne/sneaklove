const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("./../models/Sneaker"); //Sneaker model
const TagsModel = require("./../models/Tag"); //Tag model
const UserModel = require("./../models/User");
const uploader = require("../config/cloudinary"); //Require cloudy

//Route Create
router.get("/create", (req, res) => {
  res.render("products_add");
});

router.get("/", async (req, res) => {
  res.render("products_manage");
});

router.post(
  "/create",
  uploader.single("sneaker-img"),
  async (req, res, next) => {
    const newSneak = { ...req.body };
    if (!req.file) newSneak.logo = undefined;
    else newSneak.image = req.file.path;
    try {
      await SneakerModel.create(newSneak);
      res.redirect("/dashboard", { newSneak });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/update/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
