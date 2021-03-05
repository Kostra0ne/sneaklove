require("./../config/mongodb");

const mongoose = require("mongoose");
const SneakersModel = require("./../models/Sneaker");

const sneakerArray = [
  {
    name: "AirMax",
    ref: "W-54-2021",
    size: 39,
    description: "Blue, white swoosh, comfy, stylish",
    price: 120,
    category: "Women",
  },
];

SneakersModel.create(sneakerArray)
  .then((dbRes) => {
    console.log(dbRes);
  })
  .catch((error) => {
    console.log(error);
  });

//
