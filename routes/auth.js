const express = require("express");
const router = new express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/signup");
      console.log('"Email already registered');
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/dashboard");
      console.log("You are now registered");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });

  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");
    console.log("EMAIL MAUVAIS");
  } else {
    const isTheSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isTheSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
      console.log("MAUVAIS MOT DE PASSE");
    } else {
      console.log("MOT DE PASSE CORRECT ET EMAIL CORRECT");
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect("/"); //si marche ramene dashboard
    }
  }
});

module.exports = router;
