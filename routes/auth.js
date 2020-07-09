const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const bcrypt = require("bcrypt");

/* Routes are prefixed with auth/ */

// form views
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

// action => registering

router.post("/signup", (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    console.log(req.body); // TODO req.body is f*** {} EMPTY !!!
    req.flash("error", "an error occured");
    return res.redirect("/auth/signup");
  } else {
    userModel
      .findOne({ email: user.email })
      .then((dbRes) => {
        if (dbRes) {
          req.flash("error", "an error occured");
          return res.redirect("/auth/signup");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;
        userModel.create(user).then(() => res.redirect("/auth/signin"));
      })
      .catch(next);
  }
});

module.exports = router;
