const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");

//

router.get("/", (req, res) => {
  res.render("index");
});

//RRRRRRRRRRRRA
router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const category = req.params.cat;
    const allSneakers = await SneakerModel.find();
    const sneakers = await SneakerModel.find({ category: req.params.cat });
    res.render("products", { sneakers, category, allSneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("one_product", sneaker);
  } catch (err) {
    next(err);
  }
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
