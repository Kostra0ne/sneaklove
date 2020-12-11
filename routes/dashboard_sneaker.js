const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

module.exports = router;
