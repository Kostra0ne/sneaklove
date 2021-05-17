const express = require("express");
const router = new express.Router();

const bcrypt = require("bcrypt");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");
// const uploader = require("./../config/cloudinary");

const UserModel = require("./../models/User");
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
// const { render, delete } = require("../app");

router.get("/signin", (req, res, next) => {
  res.render("signin.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

router.get("/signout", (req, res, next) => {
  req.session.destoy(function (err) {
    res.redirect("/auth/signin");
  });
});

router.post("/signin",(req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
  .then((foundUser) => {
    if (!foundUser) {
      req.flash("error", "invalid credentials");
      res.redirect("/auth/signin");
    } else {
        console.log(foundUser);
        console.log(password);
        console.log(foundUser.password);
    
      const isSamePW = bcrypt.compareSync(foundUser.password, password); //ici password vient de la bdd et founUser;password est celui renseigner par le user lors de la connexion
      if (!isSamePW) {
        req.flash("error", "invalid credentials");
        res.redirect("/auth/signin");
      } else {
        const userObject = foundUser.toObject(); // pour n'avoir vraiment que email et password et pas d'autre données annexes(coté serveur)
        delete userObject.password; // suppr le contenu de password dans req body
        req.session.currentUser = userObject; //+ c'est ca qui enr le user dans la session et envoyer le cookie au "client"
        console.log("connected");
        req.flash("Yataaa!");
        res.redirect("/sneakers/:cat");
      }
    }
  }).catch((err)=>{
        res.render("signin.hbs");
        next(err);
  });


});

router.post("/signup", (req, res, next) => {
  const newUser = { ...req.body };

  UserModel.findOne({ email: newUser.email })
    .then((foundUser) => {
      if (foundUser) {
        req.flash("error", "email already registered");
        res.redirect("/auth/signup");
      } else {
        console.log("user not found");
        hashPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashPassword;
        UserModel.create(newUser).then(() => {
          console.log("user created");
          req.flash("Success", "You've been registered");
          res.redirect("/auth/signin");
        });
        //   .catch((err) => next(err));
      }
    })
    .catch((err) => {
      let errorMessage = "";
      for (field in err.errors) {
        console.log(field);
        errorMessage += err.errors[field].message + "\n";
      }
      console.log(errorMessage);
      req.flash("error", errorMessage);
      res.redirect("/auth/signup");
    });
});

module.exports = router;
