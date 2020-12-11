// create a test data set of valid users
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const SneakerModel = require("../models/Sneaker");

const sneakers = [
  {
    name: "nike",
    ref: "nikeRef",
    size: 40,
    description: "abc",
    price: 100,
    category: "men",
    id_tags: ["5fd2819fd3bedd4de2ef73e7"],
    image: "https://static.nike.com/a/images/w_1536,c_limit/9de44154-c8c3-4f77-b47e-d992b7b96379/image.jpg"
  },
  {
    name: "pumma",
    ref: "pummaRef",
    size: 35,
    description: "def",
    price: 150,
    category: "women",
    id_tags: ["5fd2819fd3bedd4de2ef73e7"],
    image: "https://static.nike.com/a/images/w_1536,c_limit/9de44154-c8c3-4f77-b47e-d992b7b96379/image.jpg"
  },
  {
    name: "addidas",
    ref: "addidasRef",
    size: 12,
    description: "ghi",
    price: 180,
    category: "kids",
    id_tags: ["5fd2819fd3bedd4de2ef73e7"],
    image: "https://static.nike.com/a/images/w_1536,c_limit/9de44154-c8c3-4f77-b47e-d992b7b96379/image.jpg"
  },
];


async function insertLabels() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection

    const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
    console.log(`seed artists done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertLabels();
