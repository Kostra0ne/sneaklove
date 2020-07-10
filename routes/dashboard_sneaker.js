const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const { log } = require("debug");
const uploader = require("./../config/cloudinary");
const { render } = require("../app");
const protectAdminRoute = require("../middlewares/protectAdminRoute");

/* Routes are prefixed with dashboard/ */

router.get("/prod-add", protectAdminRoute, (req, res, next) => {
  tagModel
    .find()
    .then((allTags) => {
      res.render("products_add", { allTags });
    })
    .catch(next);
});

router.get("/prod-manage", protectAdminRoute, (req, res, next) => {
  sneakerModel
    .find()
    .then((sneakers) => {
      res.render("products_manage", { sneakers });
    })
    .catch(next);
});

// router.post(
//   "/prod-add",
//   uploader.single("image"),
//   protectAdminRoute,
//   (req, res, next) => {
//     const newProd = req.body;

//     console.log(req.file);
//     console.log(req.body);

//     if (req.file) newProd.image = req.file.path;

//     sneakerModel
//       .create(newProd)
//       .then(() => {
//         req.flash("success", "sneaker successfully created");
//         res.redirect("/dashboard/prod-manage");
//       })
//       .catch(next);
//   }
// );

router.post(
  "/prod-add",
  uploader.single("image"),
  protectAdminRoute,
  (req, res, next) => {
    const newProd = req.body;

    console.log(req.file);
    console.log(req.body);

    if (req.file) newProd.image = req.file.path;

    sneakerModel
      .create(newProd)
      .then(() => {
        req.flash("success", "sneaker successfully created");
        res.redirect("/dashboard/prod-manage");
      })
      .catch(next);
  }
);

router.post("/tag-add", protectAdminRoute, (req, res, next) => {
  tagModel
    .create(req.body)
    .then(() => {
      req.flash("success", "Tag successfully created");
      res.redirect("/dashboard/prod-add");
    })
    .catch(next);
});

router.get("/prod-edit/:id", protectAdminRoute, (req, res, next) => {
  Promise.all([sneakerModel.findById(req.params.id), tagModel.find()])

    .then((dbRes) => {
      res.render("product_edit", { sneaker: dbRes[0], allTags: dbRes[1] });
    })
    .catch(next);
});

router.post("/prod-edit/:id", protectAdminRoute, (req, res, next) => {
  sneakerModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash("success", "product successfully edited");
      res.redirect("/dashboard/prod-manage");
    })
    .catch(next);
});

router.get("/prod-delete/:id", protectAdminRoute, (req, res, next) => {
  sneakerModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      req.flash("success", "product successfully deleted");
      res.redirect("/dashboard/prod-manage");
    })
    .catch(next);
});

module.exports = router;
