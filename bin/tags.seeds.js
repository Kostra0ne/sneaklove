require("../config/mongodb");
const tagModel = require("./../models/Tag");

const tags = [{ label: "Nike" }, { label: "Rebook" }, { label: "Adidas" }];

tagModel
  .insertMany(tags)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
