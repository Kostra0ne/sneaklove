const express = require("express");
const router = new express.Router();
const tagModel = require("./../models/Tag");

router.post("/", async (req, res, next) =>{
    try {
       res.json(await tagModel.find());
    } catch (error) {
        next(error)
    }
});


router.post("/create", async (req, res, next) =>{
    try {
        res.json(await tagModel.create(req.body));
    } catch (error) {
        next(error)
    }
});

module.exports = router;