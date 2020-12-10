const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
module.exports = router;

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signup", (req, res, next) => {
  const user = req.body;
  console.log(user);
  if (user.email && user.password) {
    userModel
      .findOne({ email: user.email })
      .then((dbRes) => {
        if (dbRes) {
          //   req.flash("error", "sorry, email is already taken :/");
          res.redirect("/signup");
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hashed = bcrypt.hashSync(user.password, salt);
          user.password = hashed;
          userModel.create(user).then(() => res.redirect("/signin"));
        }
      })
      .catch(next);
  } else {
    // req.flash("error", "no empty fields here please");
    res.redirect("/signup");
  }
});

router.post("/signin", (req, res, next) => {
  const user = req.body;
  if (user.email && user.password) {
    userModel
      .findOne({ email: user.email })
      .then((userFound) => {
        if (userFound) {
          if (bcrypt.compareSync(user.password, userFound.password)) {
            const { _doc: clone } = { ...userFound };
            delete clone.password;
            req.session.currentUser = clone;
            res.redirect("/");
          } else {
            // req.flash("error", "wrong credentials");
            res.redirect("/signin");
          }
        } else {
          req.flash("error", "wrong credentials");
          res.redirect("/signin");
        }
      })
      .catch(next);
  }
  else {
    req.flash("error", "wrong credentials");
    res.redirect("/signin");
  }
});

router.get("/logout", (req,res) =>{
    req.session.destroy(()=> {
        res.redirect("/");
    });
});

module.exports = router;
