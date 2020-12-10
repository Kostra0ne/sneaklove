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


//poser la question demain -------------

async function insertTag() {
  try {
    await TagModel.deleteMany(); 
    const inserted = await TagModel.insertMany(tagDB); // insert docs in db
    console.log(`seed tags done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertTag();