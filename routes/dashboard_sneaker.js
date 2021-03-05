const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const SneakerModel = require("./../models/Sneaker")
const TagModel = require("./../models/Tag")
const uploader = require("./../config/cloudinary")

// CREATE SNEAKERS
router.get("/create", (req, res, next) => {
    const tags = TagModel.find();
    res.render("partial/dashboard_sneaker_row", {tags});
});

router.post("/", /*uploader.single("picture"),*/ (req, res, next) => {
    // const newSneaker = {...req.body};
    SneakerModel.create(/*newSneaker*/)
        .then(res.redirect("/products"))
        .catch(next)
});

// EDIT SNEAKER
router.get("/edit/:id", (req, res, next)=>{
    const tags = TagModel.find();
    const sneakers = SneakerModel.findById(req.params.id).populate("tags")
        .then(res.render("partial/dashboard_sneaker_row", {sneakers, tags}))
        .catch(next)
})

router.post("/", /*uploader.single("picture"),*/ (req, res, next) =>{
    SneakerModel.findByIdAndUpdate(req.params.id)
        .then(res.redirect("/products"))
        .catch(next)
})

// DELETE SNEAKERS
router.delete("/:id", (res, req, next) => {
    SneakerModel.findByIdAndDelete(req.params.id)
        .then(res.redirect("/products"))
        .catch(next)
})

module.exports = router;
