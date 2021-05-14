const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

router.get(["/","/home"], (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  // SneakerModel.find()
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

// router.get("/signin", (req, res) => {
//   res.render("signin");
// });


module.exports = router;
