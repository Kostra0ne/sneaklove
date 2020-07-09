require("../app");
const sneakerModel = require("./../models/Sneaker");

const sneakers = [
  {
    name: "Air Force One",
    ref: "DJDJ9865DDJd0",
    size: 41,
    description: "Very comfortable shoes",
    price: 110,
    category: "men",
    id_tags: "5f0735c700e43723ac594ac8",
  },
  {
    name: "Stan Smith",
    ref: "dodidKdk88765",
    size: 36,
    description: "",
    price: 120,
    category: "women",
    id_tags: "5f0735c700e43723ac594aca",
  },
  {
    name: "Speed Tr 2.0",
    ref: "dskskdksd9888",
    size: 32,
    description: "",
    price: 39,
    category: "kids",
    id_tags: "5f0735c700e43723ac594ac9",
  },
];

sneakerModel
  .insertMany(sneakers)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
