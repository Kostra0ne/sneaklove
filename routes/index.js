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

router.get("/sneakers/:cat", (req, res) => {
  SneakersModel.find().then((dbRes) => {
    console.log(dbRes)
    res.render('products.hbs', {sneakers:dbRes})
})
});

router.get("/one-product/:id", (req, res) => {
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
