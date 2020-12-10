const express = require("express");
const router = express.Router();

const SneakerModel = require("../models/Sneaker");
const UserModel = require("../models/User");
const TagModel = require("../models/Tag");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", async (req, res) => {
  res.send("bar");
  const AllSneakers = await SneakerModel.find();
  console.log(AllSneakers);
  res.render("products", { AllSneakers });
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
