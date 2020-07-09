const express = require("express");
const router = express.Router();

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});

/* router.get("/sneakers/collection", (req, res) => {
  res.render
}); */

router.get("/sneakers/:cat", (req, res) => {
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
