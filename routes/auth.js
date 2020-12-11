const express = require("express");
const router = new express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

// router.get("/signin", (req, res) => {
//   res.render("/auth/signin");
// });

// router.post("/signin", async (req, res, next) => {
//   const { email, password } = req.body;
//   const foundUser = await User.findOne({ email: email });

//   if (!foundUser) {
//     req.flash("error", "Invalid credentials");
//     res.redirect("/auth/signin");
//   } else {
//     const isTheSamePassword = bcrypt.compareSync(password, foundUser.password);
//     if (!isTheSamePassword) {
//       req.flash("error", "Invalid credentials");
//       res.redirect("/auth/signin");
//     } else {
//       const userDocument = { ...foundUser };
//       const userObject = foundUser.toObject();
//       delete userObject.password;
//       req.session.currentUser = userObject;

//       req.flash("success", "Successfully logged in...");
//       res.redirect("/dashboard");
//     }
//   }
// });

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

module.exports = router;
