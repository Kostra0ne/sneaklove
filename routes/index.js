const express = require("express");
const sneackersModel = require("../models/Sneakers");
const router = new express.Router();

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// // )

router.get("/", (req, res) => {
  res.render("index");
});


// router.get("/sneakers/:cat", (req, res, next) => {
// let search = req.params.cat
// let myQuery = null
// if   
//sneackersModel
//     .find(myQuery)
//     .then((dbres) => {
//       res.render("products", { sneackers: dbres });
//     })

//     .catch(next);
// });
// router.get("/sneakers/men", (req,res,next) =>{
//   sneackersModel
//   .findById
// })
router.get("/sneakers/collection", (req, res, next) => {
  sneackersModel
    .find()
    .then((dbres) => {
      console.log(dbres)
      res.render("products", { sneakers: dbres })
    }).catch(next);
});
// router.get("/sneakers/men", (req, res, next) => {
//   sneackersModel
//     .find()
//     .then((dbres) => {
//       console.log(dbres)
//       res.render("products", { sneakers: dbres })
//     }).catch(next);
// });

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
