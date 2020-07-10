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
  console.log(req.body);
  
  if (!user.email || !user.password) {
    /* req.flash("error", "no empty fields here please"); */
    return res.redirect("/auth/signup", msg={status:"error", text: "no empty fields here please"});

  } else {
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (dbRes) {
          res.locals.msg = {status: "error", text:"sorry, email is already taken :/"};
          req.flash("error", "sorry, email is already taken :/"); //pb affichage
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
        return res.redirect("/"); 

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
    res.redirect("/auth/signin");
  });
});

module.exports = router;
