const express = require("express");
const { _router } = require("../app");
const router = new express.Router();
const uploader = require("./../config/cloudinary");

const SneakerModel = require("./../models/Sneaker");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  const sneakers = await SneakerModel.find();
  res.render("products", { sneakers });
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

//NEW ROUTE TO ACCESS CREATE FORM
router.get("/product-add", (req, res) => {
  res.render("products_add");
});

router.post(
  "/product-add",
  uploader.single("image"),
  async (req, res, next) => {
    const newSneaker = { ...req.body };
    if (req.file) {
      newSneaker.image = req.file.path;
    } else {
      newSneaker.image = undefined;
    }
    console.log(newSneaker);

    try {
      await SneakerModel.create(newSneaker);
      res.redirect("/sneakers/collection");
    } catch (err) {
      next(err);
    }
  }
);

//NEW ROUTE TO MANAGE PRODUCTS
router.get("/manage", async (req, res) => {
  const sneakers = await SneakerModel.find();
  res.render("products_manage", { sneakers });
});

router.get("/manage/delete/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/manage");
  } catch (err) {
    next(err);
  }
});

//ROUTE FOR SIGNUP AND SIGNIN
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
