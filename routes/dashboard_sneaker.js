const express = require("express"); // import express in this module
const { render } = require("../app");
const router = new express.Router(); // create an app sub-module (router)
const SneakersModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const uploader = require("../config/cloudinary");

// ***************RENDER ADDING PAGE --> GET***********
router.get("/products_add", (req, res, next) => {
  res.render("products_add");
});
// *****************END***************

// ***************RENDER ADDING PAGE --> POST***********
router.post(
  "/products_add",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = req.file.path;
      }
      await SneakersModel.create(req.body);
      res.redirect("/products_manage");
    } catch (error) {
      next(error);
    }
  }
);
// *****************END***************

// ***************RENDER ADDING PAGE --> POST***********
router.get("/products_manage", async (req, res, next) => {
  try {
    const sneakers = await SneakersModel.find();
    res.render("products_manage", { sneakers });
  } catch (error) {
    next(error);
  }
});
// *****************END***************

// ***************DELETE ITEMS PAGE --> GET***********
router.get("/products_manage/:id", async (req, res, next) => {
  try {
    await SneakersModel.findByIdAndRemove(req.params.id);
    res.redirect("/products_manage");
  } catch (error) {
    next(error);
  }
});
// *****************END***************

// ***************UPDATE ITEMS PAGE --> GET***********
router.get("/products_edit/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakersModel.findById(req.params.id);
    res.render("product_edit", sneaker);
  } catch (error) {
    next(error);
  }
});
// *****************END***************

//*********RENDER ITEMS FOR EDIT*********** */
router.post("/products_edit/:id", async (req, res, next) => {
  try {
    const result = await SneakersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(result);
    res.redirect("/products_manage");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
