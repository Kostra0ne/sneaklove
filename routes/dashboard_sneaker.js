const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");
const uploader = require("./../config/cloudinary");

router.get("/prod-add", async (req, res, next) => {
  try {
    const tags = await TagModel.find();
    res.render("products_add", { tags });
  } catch (err) {
    next(err);
  }
});

// Sneakers create
router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  // if all good, multer will expose the uploaded object in req.file
  // req.file.path leads to an URL hosting the image @cloudinary
  const newSneaker = { ...req.body };
  console.log(newSneaker);
  if (req.file) {
    newSneaker.image = req.file.path;
  } else {
    newSneaker.image = undefined;
  }

  try {
    await SneakerModel.create(newSneaker);
    res.redirect("/dashboard_sneaker/prod-add");
  } catch (err) {
    next(err); // express will display the error on the provided error page (error.hbs) (check the www file for details ....)
  }
});

// Tag create
router.post("/tag-add", async (req, res, next) => {
  // if all good, multer will expose the uploaded object in req.file
  // req.file.path leads to an URL hosting the image @cloudinary
  const newTag = { ...req.body };

  try {
    await TagModel.create(newTag);
    res.redirect("/dashboard_sneaker/prod-add");
  } catch (err) {
    next(err); // express will display the error on the provided error page (error.hbs) (check the www file for details ....)
  }
});

router.get("/prod-manage", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

//GET edit
router.get("/product-edit/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    const tags = await TagModel.find();
    res.render("product_edit", { sneaker, tags });
  } catch (err) {
    next(err);
  }
});

//POST edit
router.post("/prod-edit/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.redirect("/dashboard_sneaker/prod-manage");
  } catch (err) {
    next(err);
  }
});

router.get("/prod-manage/delete/:id", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard_sneaker/prod-manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
