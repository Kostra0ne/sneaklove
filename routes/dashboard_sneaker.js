const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");
const uploader = require("./../config/cloudinary");
const tagModel = require("./../models/Tag");

//ALL ROUTES ARE PREFIXED WITH /dashboard_sneaker

// add routes = add, delete, update

//delete
router.get("/product-delete/:id", async (req, res, next) => {
  try {
    await sneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("./../");
  } catch (err) {
    console.error(err);
  }
});

//manage
router.get("/prod-manage", async (req, res, next) => {
  try {
    let sneakers = await sneakerModel.find()
    res.render("products_manage", {sneakers});
  } catch (err) {
    console.error(err);
  }
});

//add
router.get("/prod-add", async (req, res, next) => {
  try {
    console.log(`in try`);
    let tags = await tagModel.find();
    console.log(tags);
    res.render("products_add", { tags });
  } catch (err) {
    console.error(err);
  }
});

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  try {
    console.log("in try");
    let newSneaker = await sneakerModel.create(req.body);
    console.log(`new product created, ${newSneaker}`);
    res.redirect("./");
  } catch (err) {
    console.error(err);
  }
});

//update
router.get("/prod-edit/:id", async (req, res, next) => {
  try {
    console.log(`in try`);
    let sneaker = await sneakerModel.findById(req.params.id);
    console.log(`retrived product to update - ${sneaker}`);
    let tags = await tagModel.find();
    console.log(`retrived tags - ${tags}`);
    res.render("product_edit", {
      sneaker: sneaker,
      tags: tags,
    });
  }
  catch (err) {
    next(err);
  }
});

router.post("/prod-edit/:id", async (req, res, next) => {
  try {
    console.log("in edit try");
    let updatedSneaker = await sneakerModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(`product edited - ${updatedSneaker}`);
    res.redirect("./../prod-manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
