const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();
const TagModel = require("./../models/Tag");

router.get("/tag-add", async (req, res, next) => {
        try {
                res.json(await TagModel.find());
        } catch (err) {
                next(err);
        }
})

router.post("/tag-add", async (req, res, next) => {
        try {
                res.json(await TagModel.create(req.body));
        } catch (err) {
                next(err)
        }
});

router.get("/:idTag/:category", async (req, res, next) => {
        try {
                console.log(req.params.id)
                res.json(await SneakerModel.find({id_tags: req.params.idTag, category:req.params.category}));
        } catch (err) {
                next(err)
        }
})
//get all prods
router.get("/:idTag", async (req, res, next) => {
        try {
                console.log(req.params.id)
                res.json(await SneakerModel.find({id_tags: req.params.idTag}));
        } catch (err) {
                next(err)
        }
})

module.exports = router;