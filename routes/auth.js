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
}); 

var msg = { status : "error", text : "wrong email"}
    //console.log(msg);
    return res.render("signin", {msg});
    */

router.get("/signin", (req, res) => {
  res.render("signin");
});

// action::Registering

router.post("/signup", (req, res, next) => {
  const user = req.body;
  console.log(req.body);
  
  //might be useless bc of REQUIRE property in form
  if (!user.email || !user.password) {
    var msg = {status:"error", text: "please fill email and password fields."};
    console.log(msg);
    return res.redirect("/auth/signup", {msg});

  } else {
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (dbRes) {
          var msg = {status:"error", text: "this email adress is already registred. Sign-up or use a different email address"};
    console.log(msg);
          return res.render("signup", {msg});
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
//might be useless bc of REQUIRE property in form
  if (!user.email || !user.password) {
    return res.redirect("/signin");
  }

  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        var msg = { status : "error", text : "wrong email"}
    //console.log(msg);
    return res.render("signin", {msg});
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };

        delete clone.password;

        req.session.currentUser = clone;
        return res.redirect("/"); 

      } else {
        var msg = { status : "error", text : "wrong password"}
        //console.log(msg);
        return res.render("signin", {msg});
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
