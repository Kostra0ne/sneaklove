// Define all routes related to CRUD

const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const sneakerModel = require("./../models/Sneaker");

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await sneakerModel.find();
    res.render("products", { sneakers });
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

router.get("/prod-add", (req, res) => {
  res.render("products_add");
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

module.exports = router;
