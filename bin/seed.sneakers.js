require("dotenv").config();
require("./../config/mongo");
const SneakerModel = require ("./../models/Sneaker");
const mongoose = require("mongoose");

const sneakers = [
{
    image: "https://cdn.shopify.com/s/files/1/2358/2817/products/Wethenew-Sneakers-france-Nike-Air-Force-1-Sketch-Black-Swoosh_1200x.png?v=1588271360",
    name: "Air force one",
    ref: "5bb1",
    size: 9,
    description: "nike air force one",
    price: 150,
    category: "men",
    //id_tags: []
},
{
    image: "https://cdn.shopify.com/s/files/1/2358/2817/products/Wethenew-Sneakers-france-Nike-Air-Force-1-Sketch-Black-Swoosh_1200x.png?v=1588271360",
    name: "Air force Woman",
    ref: "5cc1",
    size: 6,
    description: "nike air force women",
    price: 200,
    category: "women",
    //id_tags: []
},
{
    image: "https://cdn.shopify.com/s/files/1/2358/2817/products/Wethenew-Sneakers-france-Nike-Air-Force-1-Sketch-Black-Swoosh_1200x.png?v=1588271360",
    name: "Air force Kids",
    ref: "5bb1",
    size: 3,
    description: "nike air force one",
    price: 70,
    category: "kids",
    //id_tags: []
}

]

//empty database
SneakerModel.deleteMany().then(async () => {
    //insert robots in db
    await SneakerModel.insertMany(sneakers);
    console.log("ok: nb a sneakers has been inserted")
}).catch(err => {
    console.log(err)
})
