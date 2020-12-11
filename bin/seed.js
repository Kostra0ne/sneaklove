require("dotenv").config();
require("./../config/mongo");
const SneakerModel = require("./../models/Sneaker");

const Sneaker = [
  {
    name: "Converse",
    ref: "C456",
    size: 38,
    description: "white shoes for everyday use",
    price: 99,
    category: "women",
  },
  {
    name: "Vans",
    ref: "V302",
    size: 45,
    description: "black skater shoes for street wear",
    price: 70,
    category: "men",
  },
  {
    name: "Nike",
    ref: "N991",
    size: 28,
    description: "toddler first shoes",
    price: 53,
    category: "kids",
  },
];

async function insertSneakers() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const insertedSneaker = await SneakerModel.insertMany(Sneaker); // insert docs in db
    console.log(
      `seed sneakers done : ${insertedSneaker.length} documents inserted !`
    );
  } catch (err) {
    console.error(err);
  }
}

insertSneakers();
