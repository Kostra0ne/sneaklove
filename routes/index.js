const express = require("express");
const router = express.Router();
const fileUploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
// const protectAdminRoute = require("./../middlewares/exposeLoginStatus")
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");


console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", async (req, res, next) => {
  if (req.params.cat === "collection") {

    try {
      const tags = await TagModel.find()
      const sneakers = await SneakerModel.find().populate("tag");
      console.log(sneakers[0].id_tags)
      res.render("products", { sneakers, tags });
    } catch (err) {
      next(err);
    }


  } else {
    try {
      const sneakers = await SneakerModel.find({ category: req.params.cat }).populate("tag");
      const tags = await TagModel.find()
      res.render("products", { sneakers, tags });
    } catch (err) {
      next(err);
    }
  }

});

router.get("/prod-manage",protectPrivateRoute, async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers })
  } catch (err) {
    next(err);
  }
})


router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    console.log(sneaker);
    res.render("one_product", { sneaker });
  } catch (err) {
    next(err);
  }
});

router.get("/prod-add", protectPrivateRoute, async (req, res, next) => {
  console.log(req.session, "tototot");
  try {
    const tags = await TagModel.find();
    res.render("products_add", { tags })
  
  } catch (err) {
    next(err)
  }
  // scripts: ['clients.js']
});

router.post("/prod-add", protectPrivateRoute, fileUploader.single("image"), async (req, res, next) => {
  const newSneaker = { ...req.body };
  // console.log("check", req.body)
  if (!req.file) newSneaker.image = undefined;
  else newSneaker.image = req.file.path;

  try {
    await SneakerModel.create(newSneaker);
    res.redirect("/dashboard");
  } catch (err) {
    next(err)
  }
});




router.get("/prod-edit/:id", protectPrivateRoute, async (req, res, next) => {
  const sneaker = await SneakerModel.findById(req.params.id);
  const tags = await TagModel.find();

  console.log(sneaker);
  res.render("product_edit", { sneaker, tags })
});


router.post("/prod-edit/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    const sneaker = req.body

    await SneakerModel.findByIdAndUpdate(req.params.id, sneaker);
    res.redirect("/dashboard")
  } catch (err) {
    next(err)
  }
});


router.get("/prod-delete/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
})



router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  // console.log(req.body)
  try {
    const newUser = { ...req.body };
    // console.log({newUser})
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      console.log("found")
      req.flash("warning", "Email already registered");
      res.redirect("/signup");
    } else {
      console.log("new")
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/dashboard");
    }
  } catch (err) {
    next(err)
  }
})

router.get("/signin", (req, res) => {
  res.render("signin")
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });
  console.log(foundUser);
  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");

  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      // Authenticate the user...
      // const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      // Stores the user in the session (data server side + a cookie is sent client side)
      delete userObject.password;
      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect("/dashboard");
    }
  }
});


//logout
router.get("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
});


router.post("/tag-add", async(req, res, next) => {
  console.log(req.body);
  await TagModel.create(req.body);
});

module.exports = router;
