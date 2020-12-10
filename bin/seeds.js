require("dotenv").config();
require(".././app");

const UserModel = require("../models/User");

const users = [
  {
    name: "Jean-Claude",
    lastname: "VanDam",
    email: "jcvd@mail.com",
    password: "1234",
  },
];

UserModel.insertMany(users)
  .then((dbRes) => console.log(dbRes))
  .catch((err) => console.log(err));
