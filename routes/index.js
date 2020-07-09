const express = require("express");
const router = new express.Router();
const sneakerModel = require("./../models/Sneaker");

/* return console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
); */

router.get("/", (req, res) => {
  res.render("index");  //importer toute la collection Sneakers , la transmettre au hbs et dans le hbs faire un #each dans le partial sneaker_mini :)
});


router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});



module.exports = router;
