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

// 

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products", {sneakers});
  } catch (error) {
    next(error);
  }
});

// router.get("/sneakers/:cat", async (req, res) => {
//   res.send("bar");
//   const AllSneakers = await SneakerModel.find();
//   console.log(AllSneakers);
//   const CatSneakers = AllSneakers.category.enum;
//   console.log(CatSneakers)
//   res.render("products", { AllSneakers });
// });

router.get("/sneakers/:tartuff", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find({ category: req.params.tartuff });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res) => {
  res.send("baz");
  try {
    const sneakers = await SneakerModel.findById({ category: req.params.Id });
    res.render("one_product", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
