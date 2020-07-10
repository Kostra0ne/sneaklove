const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const { log } = require("debug");
const uploader = require("./../config/cloudinary");
const { render } = require("../app");

/* Routes are prefixed with dashboard/ */

router.get("/prod-add", (req, res, next) => {
   tagModel
      .find()
      .then((allTags) => {
         res.render("products_add", { allTags });
      })
      .catch(next);
});

router.get("/prod-manage", (req, res, next) => {
   sneakerModel
      .find()
      .then((sneakers) => {
         res.render("products_manage", { sneakers });
      })
      .catch(next);
});

router.post("/prod-add", uploader.single("image"), (req, res, next) => {
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
});

router.get("/prod-edit/:id", (req, res, next) => {
   sneakerModel
      .findById(req.params.id)
      .then((sneaker) => {
         res.render("product_edit", sneaker);
      })
      .catch(next);
});

router.get("/prod-delete/:id", (req, res, next) => {
   sneakerModel
      .findByIdAndDelete(req.params.id)
      .then(() => {
         req.flash("success", "product successfully deleted");
         res.redirect("/prod-manage");
      })
      .catch(next);
});

module.exports = router;
