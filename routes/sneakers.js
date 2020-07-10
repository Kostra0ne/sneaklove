// Define all routes related to CRUD

const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await sneakerModel.find();
    const tags = await tagModel.find();
    res.render("products", { sneakers: sneakers, tags: tags });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const sneakers = await sneakerModel.find({ category: req.params.cat });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await sneakerModel.findById(req.params.id);
    res.render("one_product", { sneaker });
  } catch (error) {
    next(error);
  }
});

router.get("/prod-add", async (req, res, next) => {
  try {
    const tags = await tagModel.find();
    res.render("products_add", {tags: tags, scripts: ["create_tag"]});
  } catch (error) {
    next(error)
  }
});

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newSneaker = req.body;
    if (req.file) newSneaker.image = req.file.path;
    await sneakerModel.create(newSneaker);
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});

router.get("/prod-manage", async (req, res, next) => {
  try {
    const sneakers = await sneakerModel.find();
    res.render("products_manage", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/product-delete/:id", async (req, res, next) => {
  try {
    await sneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

router.get("/product-edit/:id", async(req, res, next) => {
  try {
    const sneaker = await sneakerModel.findById(req.params.id);
    res.render("product_edit", {sneaker});
  } catch (error) {
    next(error);
  }
});

router.post("/product-edit/:id", async (req, res, next) => {
  try {
    await sneakerModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
})

module.exports = router;
