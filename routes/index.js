const express = require("express");
const sneackersModel = require("../models/Sneakers");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const { relativeTimeRounding } = require("moment");
const protectPrivateRoute=require("./../middlewares/protectPrivateRoute");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});
router.get("/sneakers/collection", (req, res, next) => {
    sneackersModel
      .find()
      .then((dbres) => {
        console.log(dbres);
        res.render("products", { sneakers: dbres });
      })
      .catch(next);
  });
router.get("/sneakers/:cat", (req, res, next) => {
let search = req.params.cat;


sneackersModel
    .find({category:search})
    .then((dbres) => {
      console.log (dbres);
      res.render("products", { sneakers: dbres });
    })
    .catch(next)
    
});


router.get("/one-product/:id", protectPrivateRoute, (req, res, next) => {
  sneackersModel
    .findById(req.params.id)
    .then((dbres) => {
      res.render("one_product", { sneaker: dbres });
    })
    .catch(next);
});

router.get("/prod-add",protectPrivateRoute, (req, res, next) => {
  sneackersModel
    .find()
    .then((dbres) => {
      res.render("products_add");
    })
    .catch(next);
});

router.post("/prod-add", uploader.single("picture"),protectPrivateRoute, (req, res, next) => {
  const { name, ref, size, description, price, category, id_tags } = req.body;
  console.log(req.body);
  sneackersModel
    .create({
      name,
      ref,
      size,
      description,
      price,
      category,
      id_tags,
      picture: req.file ? req.file.path : undefined,
    })
    .then((dbres) => {
      req.flash("success", "sneaker successfully created");
      res.redirect("/sneakers/collection");
    })
    .catch(next);
});

router.get("/prod-manage", protectPrivateRoute, (req, res, next) => {
  sneackersModel
    .find()
    .then((dbres) => {
      res.render("products_manage", { sneakers: dbres });
    })
    .catch(next);
});

router.get("/delete/:id", protectPrivateRoute,(req, res, next) => {
  sneackersModel
    .findByIdAndRemove(req.params.id)
    .then((dbRes) => {
      res.redirect("/sneakers/collection");
    })
    .catch(next);
});

router.get("/product-edit/:id",protectPrivateRoute, async (req, res, next) => {
  try {
    const sneaker = await sneackersModel.findById(req.params.id);
    res.render("./../views/product_edit.hbs", sneaker);
  } catch (err) {
    next(err);
  }
});

router.post("/product-edit/:id",protectPrivateRoute, async (req, res, next) => {
  try {
    await sneackersModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/prod-manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
