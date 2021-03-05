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
    console.log(req.body);
    console.log("REQ.FILE:"+req.file);
    if (!req.file) newSneaker.image = undefined;
    else {
        console.log(req.file.path);
        newSneaker.image = req.file.path
    };
    SneakerModel.create(newSneaker)
        .then(res.redirect("/sneakers/collection"))
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
