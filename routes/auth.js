const express = require("express");
const router = new express.Router();

const User = require("./../models/User");
const bcrypt = require("bcrypt"); // lib to encrypt data

//ROUTE FOR SIGNUP AND SIGNIN
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    //   Display an error message telling the user that either the password
    // or the email is wrong
    const error_msg = "Invalid credentials";
    req.flash("error", error_msg);
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      // Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      //
      // Authenticate the user...
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password; // remove password before saving user in session
      req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)

      req.flash("success", "Successfully logged in...");
      res.redirect("/sneakers/collection");
    }
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/auth/signup");
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

router.get("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
