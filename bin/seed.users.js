require("dotenv").config();
require("./../config/mongo");

const UserModel = require("../models/User");

const userDB = [
  {
    name: "name1",
    lastname: "lastname1",
    email: "emaiL1",
    password: "password1",
  },

  {
    name: "name2",
    lastname: "lastname2",
    email: "emaiL2",
    password: "password2",
  },

  {
    name: "name3",
    lastname: "lastname3",
    email: "emaiL3",
    password: "password3",
  },

  {
    name: "name4",
    lastname: "lastname4",
    email: "emaiL4",
    password: "password4",
  },

  {
    name: "name5",
    lastname: "lastname5",
    email: "emaiL5",
    password: "password5",
  },
];
