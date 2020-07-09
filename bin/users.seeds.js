require("../app");
const userModel = require("./../models/User");

const users = [
  {
    name: "Audrey",
    lastname: "Belson",
    email: "audrey@yopmail.com",
    password: "123",
  },
  {
    name: "Chakib",
    lastname: "Bachir",
    email: "chakib@yopmail.com",
    password: "123",
  },
];

userModel
  .insertMany(users)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
