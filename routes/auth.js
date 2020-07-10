const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const { log } = require("debug");

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
    console.log(req.body);
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

router.post("/signin", (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    // one or more field is missing

    req.flash("error", "wrong credentials");
    return res.redirect("/auth/signin");
  }

  userModel
    .findOne({ email: user.email })
    .then((dbRes) => {
      if (!dbRes) {
        // no user found with this email

        req.flash("error", "wrong credentials");
        return res.redirect("/auth/signin");
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        // encryption says : password match success
        const { _doc: clone } = { ...dbRes }; // make a clone of db user
        console.log(clone.password);
        delete clone.password; // remove password from clone
        // console.log(clone);

        req.session.currentUser = clone; // user is now in session... until session.destroy
        console.log("current user =>", req.session.currentUser);
        return res.redirect("/");
      } else {
        // encrypted password match failed
        req.flash("error", "wrong credentials");
        return res.redirect("/auth/signin");
      }
    })
    .catch(next);
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
