const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    //   Display an error message telling the user that either the password
    // or the email is wrong
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");
   
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);

    if (!isSamePassword) {
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


router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });

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

// router.get("/signout", async (req, res, next) => {
//   req.session.destroy(function (err) {
//     // cannot access session here
//     // console.log(req.session.currentUser);
//     res.redirect("/signin");
//   });
// });

module.exports = router;
