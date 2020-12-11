require("dotenv").config();
require("./../config/mongo");
const UserModel = require("./../models/User");
const mongoose = require("mongoose");

const users = [
  {
    name: "Ed",
    lastname: "Pfau",
    email: "ed.pfau@yahoo.fr",
    password: "12345",
  },
];

//empty database
UserModel.deleteMany()
  .then(async () => {
    //insert robots in db
    await UserModel.insertMany(users);
    console.log("ok: nb a users has been inserted");
  })
  .catch((err) => {
    console.log(err);
  });
