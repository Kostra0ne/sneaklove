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
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/men", (req, res) => {
  SneakersModel.find({category: {$eq : "Men"}})
  .then((dbRes) => {
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/women", (req, res) => {
  SneakersModel.find({category: {$eq : "Women"}})
  .then((dbRes) => {
    res.render("products.hbs", { sneakers: dbRes });
  })
  .catch(err => console.log(err))
});

router.get("/sneakers/kids", (req, res) => {
  SneakersModel.find({category: {$eq : "Kids"}})
  .then((dbRes) => {
    //console.log(dbRes);
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
  res.render("signup.hbs")
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UsersModel.findOne({ email: newUser.email});

    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/signin");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UsersModel.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/signin");
    }
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/signup");
  }
});
router.get("/signin", (req, res) => {
  res.render("signin.hbs")
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
    const foundUser = await UsersModel.findOne({ email: email });
    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signup");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password; 
        req.session.currentUser = userObject
        req.flash("success", "Successfully logged in...");
        res.redirect("/sneakers/collection");
      }
    }
});

module.exports = router;
