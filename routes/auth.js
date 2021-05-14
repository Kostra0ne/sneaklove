const express = require("express");
const router = new express.Router();

const bcrypt = require("bcrypt");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");
// const uploader = require("./../config/cloudinary");

const UserModel = require("./../model/User");
const SneakerModel = require("./../model/Sneaker");
const TagModel = require("./../model/Tags");
// const { render, delete } = require("../app");

router.get("/signin", (req, res, next) => {
  res.render("signin.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

router.get("/signout", (req, res, next) => {
  req.session.destoy(function (err) {
    res.redirect("signin.hbs");
  });

  router.post("/signin", (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = UserModel.find({ email: email }).then(() => {
      if (!foundUser) {
        req.flash("error", "invalid credentials");
        res.redirect("/signin");
      } else {
        const isSamePW = bcrypt.compareSync(password, foundUser.password); //ici password vient de la bdd et founUser;password est celui renseigner par le user lors de la connexion
        if (!isSamePW) {
          req.flash("error", "invalid credentials");
          res.redirect("/signin");
        } else {
          const userObject = foundUser.toObject(); // pour n'avoir vraiment que email et password et pas d'autre données annexes(coté serveur)
          delete userObject.password; // suppr le contenu de password dans req body
          req.session.currentUser = userObject; //+ c'est ca qui enr le user dans la session et envoyer le cookie au "client"
          req, flash("Yataaa!");
          res.redirect("/sneakers/:cat");
        }
      }
    });

    res.render("signin.hbs");
  });
});

router.post("/signup", (req, res, next) => {
  const newUser = { ...req.body };
  const foundUser = UserModel.find({ email: newUser.email })
    .then(() => {
      if (foundUser) {
        req.flash("error", "email already registered");
        res.redirect("/signup");
      } else {
        hashPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashPassword;
        UserModel.create(newUser)
          .then(() => {
            req.flash("Success", "You've been registered");
            res.redirect("/signin");
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});
module.exports = router;
