require("dotenv").config();
require("./../config/mongodb");

const sneakerModel = require("./../models/Sneaker");

const sneakers = [
  {
    name: "Air Force 1" ,
    ref: "NIKE567",
    size: 38,
    description: "Really cool sneakers",
    price: 210,
    category: "men",
    id_tags: ["5f0719c748a3e861d69debe2"]
  },
  {
    name: "Adidas Originals" ,
    ref: "ADIDAS28",
    size: 39,
    description: "Even cooler sneakers",
    price: 180,
    category: "women",
    id_tags: ["5f0719c748a3e861d69debe2", "5f0719c748a3e861d69debe3"]
  }
]

sneakerModel.insertMany(sneakers)
.then((dbRes) => console.log(dbRes))
.catch((dbErr) => console.log(dbErr));
