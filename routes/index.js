const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");
const uploader = require("./../config/cloudinary");

//

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/prod-add", (req, res) => {
  res.render("productsAdd");
});

//// POST - /dashboard/label/create
//router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
//  // if all good, multer will expose the uploaded object in req.file
//  // req.file.path leads to an URL hosting the image @cloudinary
//  const newSneaker = { ...req.body };
//  if (req.file) {
//    newSneaker.image = req.file.path;
//  } else {
//    newSneaker.image = undefined;
//  }
//  try {
//    await SneakerModel.create(newSneaker);
//    res.redirect("/sneakers/collection");
//  } catch (err) {
//    next(err); // express will display the error on the provided error page (error.////hbs) (check the www file for details ....)
//  }
//});

// POST - /dashboard/label/create
router.post("/prod-add", async (req, res, next) => {
  // if all good, multer will expose the uploaded object in req.file
  // req.file.path leads to an URL hosting the image @cloudinary
  try {
    await SneakerModel.create(req.body);
    console.log(req.body);
    res.redirect("/sneakers/collection");
  } catch (err) {
    next(err); // express will display the error on the provided error page (error.hbs) (check the www file for details ....)
  }
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
    res.render("oneProduct", sneaker);
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
