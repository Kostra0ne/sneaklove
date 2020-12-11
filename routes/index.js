const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

//

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/prod-add", protectPrivateRoute, (req, res) => {
  res.render("productsAdd");
});

router.post(
  "/prod-add",
  protectPrivateRoute,
  uploader.single("image"),
  async (req, res, next) => {
    const newSneaker = { ...req.body };
    if (!req.file) {
      newSneaker.image = undefined;
    } else {
      newSneaker.image = req.file.path;
    }
    try {
      await SneakerModel.create(newSneaker);
      res.redirect("/sneakers/collection");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/sneakers/:cat", protectPrivateRoute, async (req, res, next) => {
  try {
    const category = req.params.cat;
    let sneakers =
      category === "collection"
        ? await SneakerModel.find()
        : await SneakerModel.find({ category: req.params.cat });
    res.render("products", { sneakers, category });
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", protectPrivateRoute, async (req, res) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("oneProduct", sneaker);
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard", protectPrivateRoute, async (req, res) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("productsManage", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", protectPrivateRoute, async function (req, res, next) {
  try {
    await SneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get(
  "/prod-edit/:id",
  protectPrivateRoute,
  async function (req, res, next) {
    try {
      const sneaker = await SneakerModel.findById(req.params.id);
      console.log(req.params.id);
      res.render("productEdit", sneaker);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/prod-edit/:id",
  protectPrivateRoute,
  async function (req, res, next) {
    try {
      const updatedOne = await SneakerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
