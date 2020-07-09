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
  },
  {
    name: "Adidas Originals" ,
    ref: "ADIDAS28",
    size: 39,
    description: "Even cooler sneakers",
    price: 180,
    category: "women",
  }
]

sneakerModel.insertMany(sneakers)
.then((dbRes) => console.log(dbRes))
.catch((dbErr) => console.log(dbErr));
