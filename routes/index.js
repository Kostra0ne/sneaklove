const express = require("express");
const router = express.Router();
const SneakersModel = require("./../models/Sneaker");

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res) => {
  SneakersModel.find()
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/men", (req, res) => {
  SneakersModel.find({category: {$eq : "Men"}})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/women", (req, res) => {
  SneakersModel.find({category: {$eq : "Women"}})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/kids", (req, res) => {
  SneakersModel.find({category: {$eq : "Kids"}})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

///

router.get("/one-product/:id", (req, res) => {
  SneakersModel.findById(req.params.id)
  .then((sneaker) => res.render('one_product', {sneaker}))
  .catch(err => console.log(err));
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
