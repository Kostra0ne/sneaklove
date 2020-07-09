const express = require("express");
const router = express.Router();
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const userModel = require("./../models/User");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res, next) => {
  const cat = req.params.cat;

  if (cat === "men" || cat === "women" || cat === "kids") {
    Promise.all([
      sneakerModel.find({ category: cat }).populate("label"),
      tagModel.find(),
    ])
      .then((dbRes) =>
        res.render("products", { sneakers: dbRes[0], tags: dbRes[1] })
      )
      .catch(next);
  } else if (cat === "collection") {
    Promise.all([sneakerModel.find().populate("label"), tagModel.find()])
      .then((dbRes) =>
        res.render("products", { sneakers: dbRes[0], tags: dbRes[1] })
      )
      .catch(next);
  } else {
    res.redirect("/");
  }
});

router.get("/one-product/:id", (req, res, next) => {
  sneakerModel
    .findById(req.params.id)
    .then((sneaker) => res.render("one_product", { sneaker }))
    .catch(next);
});

/* router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
}); */

module.exports = router;
