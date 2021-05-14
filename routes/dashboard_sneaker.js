const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const SneakerModel = require("./../models/Sneaker")
const TagModel = require("./../models/Tag")
const uploader = require("./../config/cloudinary")

// CREATE SNEAKERS
router.get("/prod-add", async (req, res, next) => {
    const tags = await TagModel.find();
    res.render("products_add", {tags});
});

router.post("/prod-add", uploader.single("image"), (req, res, next) => {
    const newSneaker = {...req.body};
    if (!req.file) newSneaker.image = undefined;
    else {
        newSneaker.image = req.file.path
    };
    SneakerModel.create(newSneaker)
        .then(res.redirect("/sneakers/collection"))
        .catch(next)
});

// EDIT SNEAKER
router.get("/prod-manage", async (req, res, next)=>{
    try {
      const tags = await TagModel.find();
      const sneakers = await SneakerModel.find().populate("tags");
      res.render("products_manage", {sneakers, tags});
    } catch(err) { 
      next(err);
    }
})

router.get("/product-edit/:id", (req, res, next) => {
  SneakerModel.findById(req.params.id)
  .then(dbRes => res.render("product_edit", {sneaker: dbRes}))
  .catch(next);
})

router.post("/product-edit/:id", /*uploader.single("picture"),*/ (req, res, next) =>{
  const { name, ref, size, description, price, category, id_tags } = req.body;
    SneakerModel.findByIdAndUpdate(req.params.id, { name, ref, size, description, price, category, id_tags }, { new: true })
        .then(() => res.redirect("/prod-manage"))
        .catch(next)
})

// DELETE SNEAKERS
router.get("/product-delete/:id", (req, res, next) => {
  console.log("req params: ", req.params);
    SneakerModel.findByIdAndDelete(req.params.id)
        .then(() => res.redirect("/prod-manage"))
        .catch(next)
})

module.exports = router;
