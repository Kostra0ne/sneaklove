const express = require("express");
const router = express.Router();
const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");


// form views

router.get("/signup", (req, res) => {
  res.render("signup");
});

/* router.get("/signup", (req, res) => {
  res.render("signup", { js: ["signup"] }); //?????
}); */

router.get("/signin", (req, res) => {
  res.render("signin");
});

// action::Registering

router.post("/signup", (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    req.flash("error", "no empty fields here please");
    return res.redirect("/signup");

  } else {
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (dbRes) {
          req.flash("error", "sorry, email is already taken :/");
          return res.redirect("/signup");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;

        userModel.create(user).then(() => res.redirect("/signin"));
      })
      .catch(next);
  }
});

// action::Login

router.post("/signin", (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    req.flash("error", "wrong credentials");
    return res.redirect("/signin");
  }

  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        req.flash("error", "wrong credentials");
        return res.redirect("/auth/signin");
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };

        delete clone.password;

        req.session.currentUser = clone;
        return res.redirect("/index"); 

      } else {
        req.flash("error", "wrong credentials");
        return res.redirect("/signin");
      }
    })
    .catch(next);
});

// action::Logout

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/signin");
  });
});

module.exports = router;
