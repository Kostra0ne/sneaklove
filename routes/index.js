const express = require("express");
const router = new express.Router();
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const uploader = require("./../config/cloudinary");
const sneakerModel = require("../models/Sneaker");
const tagModel = require("./../models/Tag");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/prod-add", protectAdminRoute, (req, res, next) => {
  tagModel
    .find()
    .then((tags) => {
      res.render("products_add", { tags });
    })
    .catch(next);
});

router.get("/prod-manage",protectAdminRoute, (req, res, next) => {
  sneakerModel
    .find()
    .then((sneakers) => {
      res.render("products_manage", { sneakers });
    })
    .catch(next);
});

router.get("/delete/:id", (req, res, next) => {
  sneakerModel.findByIdAndDelete(req.params.id).then((dbres) => {
    req.flash("success", "Sneaker succesfully deleted");
    res.redirect("/prod-manage");
  });
});

router.post("/prod-add", uploader.single("picture"), (req, res, next) => {
  const { name, ref, size, description, price, category, id_tags } = req.body;
  console.log(req.file);

  sneakerModel
    .create({
      name,
      ref,
      size,
      description,
      price,
      picture: req.file ? req.file.path : undefined,
      category,
      id_tags,
    })
    .then(() => {
      req.flash("success", "sneaker successfully created");
      res.redirect("/prod-manage");
    })
    .catch(next);
});

router.get("/edit/:id", (req, res, next) => {
  Promise.all([
    sneakerModel.findById(req.params.id).populate("tags"),
    tagModel.find(),
  ])
    .then((dbRes) => {
      res.render("product_edit", { sneaker: dbRes[0], tags: dbRes[1] });
    })
    .catch(next);
});

router.post("/edit/:id", (req, res, next) => {
  sneakerModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash("success", "sneaker successfully created");
      res.redirect("/prod-manage");
    })
    .catch(next);
});

router.post("/tag-add/", (req, res, next) => {
  tagModel
    .create(req.body)
    .then(() => {
      req.flash("success", "tag successfully created");
      res.redirect("/prod-add");
    })
    .catch(next);
});

router.get("/one-product/:id", (req, res, next) => {
  sneakerModel
    .findById(req.params.id)
    .then((sneaker) => {
      res.render("one_product", { sneaker });
    })
    .catch(next);
});



module.exports = router;
