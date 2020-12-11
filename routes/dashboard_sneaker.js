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
    try {
        const sneakers = await SneakerModel.find();
  res.render("products_manage", { sneakers });
    } catch (error) {
        next(error);
    }
});

router.post(
  "/create",
  uploader.single("sneaker-img"),
  async (req, res, next) => {
    const newSneak = { ...req.body };
    if (!req.file) newSneak.logo = undefined;
    else newSneak.image = req.file.path;
    console.log(newSneak);
    try {
      await SneakerModel.create(newSneak);
      res.redirect("/dashboard");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/update/:id", async (req, res, next) =>{
    try {
        res.render("product_edit", await SneakerModel.findById(req.params.id));
    } catch (error) {
        next(error)
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

router.post("/:id", async (req, res, next) => {
    try {
        const sneakers = { ...req.body };
        await SneakerModel.findByIdAndUpdate(req.params.id, sneakers);
        res.redirect("/dashboard")
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
