require("dotenv").config();
require("../config/mongo");

const SnearkerModel = require("../models/Sneaker");

const sneakersDB = [
  {
    name: "Name1",
    ref: "ref1",
    size: 1,
    description: "fake description",
    price: 1,
    category: "women",
  },

  {
    name: "Name2",
    ref: "ref2",
    size: 2,
    description: "fake description 2",
    price: 2,
    category: "kids",
  },

  {
    name: "Name3",
    ref: "ref3",
    size: 3,
    description: "fake description 3",
    price: 3,
    category: "men",
  },

  {
    name: "Name4",
    ref: "ref4",
    size: 4,
    description: "fake description 4",
    price: 4,
    category: "women",
  },

  {
    name: "Name5",
    ref: "ref5",
    size: 5,
    description: "fake description 5",
    price: 5,
    category: "men",
  },

  {
    name: "Name6",
    ref: "ref6",
    size: 6,
    description: "fake description 6",
    price: 6,
    category: "kids",
  },
];


//poser la question demain -------------

async function insertSneaker() {
  try {
    await SnearkerModel.deleteMany(); 
    const inserted = await SnearkerModel.insertMany(sneakersDB); // insert docs in db
    console.log(`seed sneakers done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertSneaker();