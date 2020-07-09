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
  res.render("index") 
});

router.get("/sneakers/collection", (req, res,next) => {
  sneakerModel.find()
  .then((result) => res.render("products", {sneakers:result}))
  .catch(next)  
});



router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});  //JE NE SAIS PAS COMMENT TRAITER CETTE ROUTE


router.get("/one-product/:id", (req, res, next) => {
  sneakerModel.findById(req.params.id)
  .then((result) => res.render("one_product", {sneaker:result}))
  .catch(next) 
});



module.exports = router;
