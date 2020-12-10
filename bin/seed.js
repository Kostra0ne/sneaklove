// create a test data set of valid users
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");

const sneakers = [
  {
    name: "Bar",
    ref: "DFGU55",
    size: 36,
    description: "These sneakers are Okay-ish",
    price: 100,
    image: "/medias/img/shoe.png",
    category: "women",
    id_tags: "5fd25b60353ceedda3f2eeb3",
  },
  {
    name: "Yooo",
    size: 45,
    description: "These sneakers are better",
    price: 80,
    image: "/medias/img/shoe.png",
    category: "kids",
    id_tags: "5fd25b60353ceedda3f2eeb4",
  },
  {
    name: "Plop",
    size: 40,
    description: "These sneakers are the best",
    price: 190,
    image: "/medias/img/shoe.png",
    category: "men",
    id_tags: "5fd25b60353ceedda3f2eeb5",
  },
];

const tags = [
  {
    label: "Cool",
  },
  {
    label: "Brolife",
  },
  {
    label: "Funny",
  },
];

async function insertTags() {
  try {
    await TagModel.deleteMany(); // empty the styles db collection
    const inserted = await TagModel.insertMany(tags); // insert docs in db
    console.log(`seed tags done : ${inserted.length} documents inserted !`);
    console.log(inserted);
  } catch (err) {
    console.error(err);
  }
}
insertTags();

async function insertSneakers() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
    console.log(`seed sneakers done : ${inserted.length} documents inserted !`);
    console.log(inserted);
  } catch (err) {
    console.error(err);
  }
}
insertSneakers();
