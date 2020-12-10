require("dotenv").config();
require("./../config/mongo");

const TagModel = require("../models/Tag");

const tagDB = [
  { label: "tag1" },
  { label: "tag2" },
  { label: "tag3" },
  { label: "tag4" },
  { label: "tag5" },
  { label: "tag6" },
];
