const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");
const uploader = require("./../config/cloudinary");
const tagModel = require("./../models/Tag");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

//ALL ROUTES ARE PREFIXED WITH /dashboard_sneaker

// add routes = add, delete, update

//delete  *WORKS*
router.get(
  "/product-delete/:id",
  protectPrivateRoute,
  async (req, res, next) => {
    try {
      await sneakerModel.findByIdAndDelete(req.params.id);
      res.redirect("./../prod-manage");
    } catch (err) {
      next(err);
    }
  }
);

//manage  *WORKS*
router.get("/prod-manage", protectPrivateRoute, async (req, res, next) => {
  try {
    let sneakers = await sneakerModel.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

//add  *WORKS*
router.get("/prod-add", protectPrivateRoute, async (req, res, next) => {
  try {
    //console.log(`in try`);
    let tags = await tagModel.find();
    //console.log(tags);
    res.render("products_add", { tags: tags, scripts: ["manage"] });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/prod-add",
  protectPrivateRoute,
  uploader.single("image"),
  async (req, res, next) => {
    try {
      //console.log("in try");
      let newObj = req.body;
      if (req.file) newObj.image = req.file.path;
      let newSneaker = await sneakerModel.create(newObj);
      //console.log(`new product created, ${newSneaker}`);
      res.redirect("./prod-manage");
    } catch (err) {
      next(err);
    }
  }
);

//update *WORKS*
router.get("/prod-edit/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    console.log(`in try`);
    let sneaker = await sneakerModel.findById(req.params.id);
    console.log(`retrived product to update - ${sneaker}`);
    let tags = await tagModel.find();
    console.log(`retrived tags - ${tags}`);
    res.render("product_edit", {
      sneaker: sneaker,
      tags: tags,
    });
  } catch {
    next();
  }
});

router.post("/prod-edit/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    console.log("in edit try");
    let updatedSneaker = await sneakerModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(`product edited - ${updatedSneaker}`);
    res.redirect("./../prod-manage");
  } catch (err) {
    next(err);
  }
});




// add tag


router.post("/tag-add", async (req,res, next) => {
  var label = req.body;
  try { var newTag = await tagModel.create(label)
    res.status(200).json(newTag)
  }
  catch (err) { next(err)}
})




module.exports = router;
