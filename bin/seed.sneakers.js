require("dotenv").config();
require(".././config/mongo");


//db sneakers
const SneakerModel = require("./../models/Sneaker");

const sneakers = [
  {
    name: "Nike",
    ref: "Airforce",
    size: 43,
    description: "White sneakers",
    price: 100,
    category: "men",

  },
  {
    name: "Nike",
    ref: "Airforce",
    size: 43,
    description: "White sneakers",
    price: 100,
    category: "women",

  },
  {
    name: "Nike",
    ref: "Airforce",
    size: 43,
    description: "White sneakers",
    price: 100,
    category: "kids",

  },
];
async function inserUser() {
    try {
      await SneakerModel.deleteMany(); // empty the styles db collection
      const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
      console.log(`seed labels done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  }
  inserUser();
  
