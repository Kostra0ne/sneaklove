const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User");


//GET ROUTES
router.get("/signin", (req, res, next) => {
    res.render("signin");
});

router.get("/signup", (req, res, next) => {
    res.render("signup");
});

router.get("/signout", (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect("/signin");
    });
});

//POST ROUTES
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });

    if (!foundUser) {
      req.flash("error", "Invalid cretendials");
      res.redirect("/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;
        req.session.currentUser = userObject;
        console.log("You're logged in!");
        req.flash("success", "Successfully logged in!");
        res.redirect("/");
      }
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const newUser = { ...req.body };
        console.log(newUser);
        const foundUser = await UserModel.findOne({email: newUser.email});
    
    if(foundUser) {
        req.flash("warning", "Email already registered");
        res.redirect("/signup");
    } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        await UserModel.create(newUser);
        console.log("New user registered");
        req.flash("success", "Congrats! You are now registered!");
        res.redirect("/signin");
    }
    } catch (err) {
        let errorMessage = "";
        for (field in err.errors){
            errorMessage += err.errors[field].message + "\n";
        }
        req.flash("error", errorMessage);
        res.redirect("/signup");
    }
});



module.exports = router;



