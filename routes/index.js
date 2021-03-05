const express = require("express");
const router = express.Router();
const SneakersModel = require("./../models/Sneaker");
const UsersModel = require("./../models/User");

const bcrypt = require("bcrypt");
// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res) => {
  SneakersModel.find()
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/men", (req, res) => {
  SneakersModel.find({category: {$eq : "Men"}})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/women", (req, res) => {
  SneakersModel.find({category: {$eq : "Women"}})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/kids", (req, res) => {
  SneakersModel.find({category: {$eq : "Kids"}})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

///

router.get("/one-product/:id", (req, res) => {
  SneakersModel.findById(req.params.id)
  .then((sneaker) => res.render('one_product', {sneaker}))
  .catch(err => console.log(err));
});

router.get("/signup", (req, res) => {
  res.render("signup.hbs");

});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = {...req.body };
    const foundUser = await UsersModel.findOne({email: newUser.email});
    if(foundUser){
      req.flash('warning','email already in use.');
      res.redirect('/signin')
      console.log("Already in the DB");
    }else {
      console.log("NewUSer Password" + newUser);
      const hashedPassword= bcrypt.hashSync(newUser.password, 10)
      
      newUser.password = hashedPassword;
      

      await UsersModel.create(newUser);
      res.redirect('signin')
      console.log("New User" + newUser)
    }
  } catch(err) {
    next(err)
    console.log(err);
  }

});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
