const express = require("express");
const router = new express.Router();
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("../models/Tag");

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

router.get("/sneakers/collection", (req, res, next) => {
  Promise.all([sneakerModel.find(), tagModel.find()])
    .then((dbRes) => {
      res.render("products", {
        sneakers: dbRes[0],
        tags: dbRes[1],
        scripts : ["collection"]
      });
    })
    .catch(next);
});

router.get("/sneakers/:cat", (req, res, next) => {
  Promise.all([sneakerModel.find({category: req.params.cat}), tagModel.find()])
    .then((dbRes) => {
      res.render("products", {
        sneakers: dbRes[0],
        tags: dbRes[1],
        scripts : ["collection"]
      });
    })
    .catch(next);
});

router.get("/one-product/:id", (req, res, next) => {
  sneakerModel.findById(req.params.id)
  .then((result) => res.render("one_product", {sneaker:result}))
  .catch(next) 
});


/*  FILTERS


router.get("/sneakers/:tag", (req, res, next) => {
  sneakerModel.populate("Tag")
 sneakerModel.find( {id_tags.label :req.params.tag}
    .then((dbRes) => {
      res.render("products", {
        sneakers: dbRes[0],
        tags: dbRes[1],
        scripts : ["collection"]
      });
    })
    .catch(next);
});
*/


module.exports = router;
