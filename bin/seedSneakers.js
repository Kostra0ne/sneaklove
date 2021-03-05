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
  {
    name: "Adidas",
    ref: "M-57-1528",
    size: 48,
    description: "Orange, sporty, ugly",
    price: 220,
    category: "Men",
  },
  {
    name: "Sketchers",
    ref: "K-58-0003",
    size: 32,
    description: "Pink, casual, funky",
    price: 50,
    category: "Kids",
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
