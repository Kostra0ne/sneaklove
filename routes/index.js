const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();
const TagModel = require("../models/Tag");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/home", (req, res) => {
  res.render("index");
});
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    res.render("products", { sneakers: await SneakerModel.find() });
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/:cat", async (req, res, next) => {
  // try {
  const category = req.params.cat;
  const sneakers = SneakerModel.find({ category: req.params.category });
  const tag = TagModel.findById();
  res.render("products", { tag, sneakers, category });
  // } catch (err) {
  //   next(err);
  // }
});

router.get("/one-product/:id", async (req, res, next) => {
  SneakerModel.findById(req.params.id)
    .then((result) => res.render("one_product", { sneaker: result }))
    .catch(next);
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
