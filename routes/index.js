const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker"); //Sneaker model
const TagsModel = require("./../models/Tag"); //Tag model

const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("index");
});
//Route to collection
router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});
//afficher par catégorie
router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const category = req.params.cat;
    const sneakers = await SneakerModel.find({ category });
    const tags = await TagsModel.find();
    res.render("products", { category, sneakers, tags });
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("one_product", { sneaker });
  } catch (error) {
    next(error);
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");
  } else {
    const isTheSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isTheSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect("/dashboard");
    }
  }
});

module.exports = router;
