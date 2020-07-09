require("dotenv").config();
require("./../config/mongodb");

const UserModel = require("./../models/User");

const users = [
  {
    name: "Manon",
    lastname: "Morgaut",
    email:"manonmorgaut@gmail.com"
    password:"ilovebeyonce"
  },
  {
    name: "Maya",
    lastname: "Despretz",
    email:"mayadespretz@gmail.com"
    password:"batmanisacrazycat"
  },
  {
    name: "Virginia",
    lastname: "Woolf",
    email:"unechambreasoi@gmail.com"
    password:"womanpower"
  },
];

UserModel.insertMany(users)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.log(dbErr));
