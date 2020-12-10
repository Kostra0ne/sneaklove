// create a test data set of valid users
const mongoose = require("mongoose");
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const SneakerModel = require("../models/Sneaker"); // fetch the model to validate our user document before insertion (in database)

const styles = [
  {
    name: "Ninja",
    ref: "nt75",
    size: 38,
    description: "shoes",
    price: 100,
    category: "women",
    id_tags: "5fd245daacc7b145c31a695a",
  },

  {
    name: "reebook",
    ref: "nt785",
    size: 37,
    description: "shoes",
    price: 110,
    category: "men",
    id_tags: "5fd245daacc7b145c31a695a",
  },
  {
    name: "nike",
    ref: "nt756",
    size: 36,
    description: "shoes",
    price: 130,
    category: "kids",
    id_tags: "5fd245daacc7b145c31a695a",
  },
];

async function insertSneaker() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const inserted = await SneakerModel.insertMany(styles); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertSneaker();
