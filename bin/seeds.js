require("dotenv").config();
require("./../config/mongodb");
// const sneackersModel = require("./../models/Sneakers");
// const userModel = require("./../models/User");
const tagModel = require("./../models/Tag");

// const demoSneakers = [
//   {
//     name: "air-max 200",
//     ref: "5626996262",
//     size: "16",
//     description: "new air-max and new design",
//     price: "150",
//     category: "men",
//     id_tags: "[sneakers]"
//   },
//   {
//     name: "react",
//     ref: "5626995992",
//     size: "8",
//     description: "new react and new design",
//     price: "125",
//     category: "women",
//     id_tags: "[sneakers]"
//   },
  
//   {
//     name: "air-jordan 22",
//     ref: "56269459922",
//     size: "6.5",
//     description: "new jordan and new design",
//     price: "80",
//     category: "kids",
//     id_tags: "[sneakers]"
//   },
// ];

// const demoUser = [
//   {
//     name: "lolo",
//     lastname: "mary",
//     email: "lolomary@gmail.com",
//     password: "123",
//   },
//   {
//     name: "bob",
//     lastname: "leponge",
//     email: "lepongebob@gmail.com",
//     password: "4563",
//   },
//   {
//     name: "lolita",
//     lastname: "lipinka",
//     email: "lipinka@gmail.com",
//     password: "7894",
//   },
// ];
// const demoTag = [
//   {
//     label: "men",
//   },
//   {
//     label: "fashion",
//   },
//   {
//     label: "sport",
//   },
//   {
//     label: "basket",
//   },
// ];

sneackersModel
  .create(demoSneakers)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));

// userModel
//   .create(demoUser)
//   .then((dbRes) => console.log(dbRes))
//   .catch((dbErr) => console.error(dbErr));

tagModel
  .create(demoTag)
  .then((dbRes) => {
    console.log(dbRes)
    // let arrayIds = []
  // retravailler ca pr avoir un array d'ids de tags
  // retravailler demoSneakers pour attribuer au hasard un de ces id de tags au champ id_tags
  // ensuite tu fais le sneackersModel.create 
  })
  .catch((dbErr) => console.error(dbErr));
