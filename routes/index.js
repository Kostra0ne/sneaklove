const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products", { sneakers }); // we are ready now to loop through each label and display @view
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find({ category: req.params.cat });
    res.render("products", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    console.log(sneaker);
    res.render("one_product", { sneaker });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
