require("../app");
const userModel = require("./../models/User");

const users = [
  {
    name: "Audrey",
    lastname: "B",
    email: "audrey@yopmail.com",
    password: "123",
    role: "admin",
  },
  {
    name: "Chakib",
    lastname: "B",
    email: "chakib@yopmail.com",
    password: "123",
  },
];

userModel
  .insertMany(users)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
