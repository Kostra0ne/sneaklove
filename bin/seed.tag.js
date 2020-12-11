require("dotenv").config();
require("./../config/mongo");
const TagModel = require("./../models/Tag");
const mongoose = require("mongoose");

const tags = [
  {
    label: "running",
  },
  {
    label: "basketball",
  },
  {
    label: "mountain climbing",
  },
  {
    label: "tennis",
  },
  {
    label: "football",
  },
  {
    label: "fitness",
  },
];

//empty database
TagModel.deleteMany()
  .then(async () => {
    //insert robots in db
    await TagModel.insertMany(tags);
    console.log("ok: nb a tags has been inserted");
  })
  .catch((err) => {
    console.log(err);
  });
