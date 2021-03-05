require('./../../config/mongodb');
const SneakerModel = require("./../../models/Sneaker");

const sneaker = [
    {
        name: "Nike Blazer Mid",
        ref: "sneaker1",
        size: 39,
        description: "A good sneaker to chill on the weekends",
        price: 109.99,
        category: "women",
        id_tags: null
    },
    {
        name: "Adidas Superstar",
        ref: "sneaker2",
        size: 43,
        description: "Old school sneaker back on trend",
        price: 99.99,
        category: "men",
        id_tags: null
    },
    {
        name: "Converse Chuck Taylor Allstars",
        ref: "sneaker3",
        size: 34,
        description: "For the cool kid in high school",
        price: 59.99,
        category: "kids",
        id_tags: null
    }  
]

SneakerModel.create(sneaker)
    .then((sneakerDoc)=> {
        console.log(sneakerDoc);
    })
    .catch((error) => console.log(error));

