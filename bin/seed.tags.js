// create a test data set of valid users
const mongoose = require("mongoose");
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const TagModel = require("../models/Tag"); // fetch the model to validate our user document before insertion (in database)

const styles = [
  {
    label: "sport",
  },

  {
    label: "casual",
  },
  {
    label: "chic",
  },
];

async function insertSneaker() {
  try {
    await TagModel.deleteMany(); // empty the styles db collection
    const inserted = await TagModel.insertMany(styles); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertSneaker();
