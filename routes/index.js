const express = require("express");
const router = new express.Router();
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");
const User = require("./../models/User");
const bcrypt = require("bcrypt"); // lib to encrypt data

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    const tags = await TagModel.find();
    res.render("products", { sneakers, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const category = req.params.cat;
    const sneakers = await SneakerModel.find({ category });
    const tags = await TagModel.find();
    res.render("products", { category, sneakers, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    console.log(sneaker);
    res.render("one_product", { sneaker });
  } catch (err) {
    next(err);
  }
});

router.get("/signup", async (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });
    console.log(newUser);
    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/signin");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/signin", async (req, res, next) => {
  res.render("signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    //   Display an error message telling the user that either the password
    // or the email is wrong
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");
    // res.render("auth/signin.hbs", { error: "Invalid credentials" });
  } else {
    // https://www.youtube.com/watch?v=O6cmuiTBZVs
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      // Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
      // res.render("auth/signin.hbs", { error: "Invalid credentials" });
    } else {
      //
      // Authenticate the user...
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password; // remove password before saving user in session
      // console.log(req.session, "before defining current user");
      req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)

      req.flash("success", "Successfully logged in...");
      res.redirect("/sneakers/collection");
    }
  }
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here
    // console.log(req.session.currentUser);
    res.redirect("/auth/signin");
  });
});

module.exports = router;
