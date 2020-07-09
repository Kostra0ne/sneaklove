const express = require("express");
const router = new express.Router();

/* return console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
); */

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});



module.exports = router;
