const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const fileUploader = require("./../config/cloudinary");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", async (req, res, next) => {
  if (req.params.cat === "collection") {
    try {
      const sneakers = await SneakerModel.find();
      res.render("products", { sneakers });
    } catch (err) {
      next(err);
    }
  } else if (req.params.cat === "men") {
    try {
      const sneakers = await SneakerModel.find({ category: "men" });
      res.render("products", { sneakers });
    } catch (err) {
      next(err);
    }
  } else if (req.params.cat === "women") {
    try {
      const sneakers = await SneakerModel.find({ category: "women" });
      res.render("products", { sneakers });
    } catch (err) {
      next(err);
    }
  } else if (req.params.cat === "kids") {
    try {
      const sneakers = await SneakerModel.find({ category: "kids" });
      res.render("products", { sneakers });
    } catch (err) {
      next(err);
    }
  }

});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    console.log(sneaker);
    res.render("one_product", { sneaker });
  } catch (err) {
    next(err);
  }
});

router.get("/prod-add", async (req, res, next) => {
  try {
    const tags = await TagModel.find();
    res.render("products_add", { tags })
  } catch (err) {
    next(err)
  }

});

router.post("/prod-add", fileUploader.single('image'), async (req, res, next) => {
  try {
    const newProd = {...req.body};
    console.log(req.file)
    const newSneaker = req.body;
     console.log(req.body); 
    await SneakerModel.create(newSneaker);
    // res.redirect("/dashboard");
  } catch (err) {
    next(err)
  }
});


router.get("/prod-edit/:id", async (req, res, next) => {
  const sneaker = await SneakerModel.findById(req.params.id);
  console.log(sneaker);
  res.render("product_edit", { sneaker })
});


router.post("/prod-edit/:id", async (req, res, next) => {
  try {
    const updateSneaker = req.body ///may use syntax{...req.body}???

    await SneakerModel.findByIdAndUpdate(req.params.id, updateSneaker);
    res.send("good here");
  } catch (err) {
    next(err)
  }
});



router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
