// add seeds here
require("dotenv").config();
require("./../config/mongo");

const sneakerModel = require("./../models/Sneaker");

const sneakers = [
    {
        name: "Air force",
        ref: "GHTDU13",
        size:40,
        description: "super cool shoes",
        price:110,
        image:"/medias/img/shoe.png",
        category:"men",
        id_tags:"5f076bc25d39d6256bc507d4"
    },
    {
        name: "Air Max",
        ref: "GHTDU13",
        size:38,
        description: " cool shoes",
        price:90,
        image:"/medias/img/shoe.png",
        category:"women",
        id_tags:"5f076bc25d39d6256bc507d5"
    },
    {
        name: "FOO",
        ref: "G13YDH",
        size:30,
        description: "super cool shoes",
        price:80,
        image:"/medias/img/shoe.png",
        category:"kids",
        id_tags:"5f076bc25d39d6256bc507d6"
    }
];

sneakerModel.create(sneakers)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.error(dbErr))

 const tagModel = require("./../models/Tag");

const tags = [
    {
        label: "gangsta"
    },
    {
        label: "urban"
    },
    {
        label: "street"
    }
]; 

tagModel.create(tags)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.error(dbErr))