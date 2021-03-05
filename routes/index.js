const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");

// console.log(`\n\n
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
  console.log("req params: ", req.params);
  const category = req.params.cat;

  if(category === "collection") {
    SneakerModel.find()
    .then(dbRes => res.render("products", { sneakers: dbRes }))
    .catch(err => console.log(err));
  } else {
    SneakerModel.find({category})
    .then(dbRes => res.render("products", { sneakers: dbRes }))
    .catch(err => console.log(err));
  }
  
});

router.get("/one-product/:id", (req, res) => {
  SneakerModel.findById(req.params.id)
  .then(dbRes => res.render("one_product", { sneaker: dbRes }))
  .catch(err => console.log(err));
});

router.get("/signup", (req, res) => {
  res.send("signup");
});

router.get("/signin", (req, res) => {
  res.send("signin");
});


module.exports = router;
