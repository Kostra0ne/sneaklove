const express = require("express");
const router = new express.Router();
const SneakersModel = require("./../models/Sneaker");

// console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`);

//********Home********* */
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/home", (req, res) => {
  res.render("index");
});
// ************END************

// **************Display all sneakers**********
router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakersModel.find();
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
// *****************END*************************

// ************************
// router.get("/sneakers/:cat", async (req, res, next) => {
// try {

//   res.send("bar");
// } catch (error) {
//   next(error);
// }

// });

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
