const express = require("express");
const router = new express.Router();
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/api/sneakers", async (req, res) => {
  try {
    res.json(await SneakerModel.find());
  } catch (err) {
    res.json(err);
  }
});

router.get("/api/tags", async (req, res) => {
  try {
    res.json(await TagModel.find());
  } catch (err) {
    res.json(err);
  }
});

router.post("/api/tags", async (req, res) => {
  try {
    await TagModel.create(req.body);
  } catch (error) {
    res.json(error);
  }
});

router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const category = req.params.cat;
    let sneakers;
    category === "collection"
      ? (sneakers = await SneakerModel.find())
      : (sneakers = await SneakerModel.find({ category }));
    const tags = await TagModel.find();
    res.render("products", { category, sneakers, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    res.render("one_product", await SneakerModel.findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/collection/:id", async (req, res, next) => {
  const tag = await TagModel.findById(req.params.id);
  const tags = await TagModel.find();
  const sneakers = await SneakerModel.find({ id_tags: tag });
  res.render("products", { sneakers, tags });
});

module.exports = router;
