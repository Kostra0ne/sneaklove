require("dotenv").config();
require("./../config/mongo");

const UserModel = require("../models/User");

const userDB = [
  {
    name: "name1",
    lastname: "lastname1",
    email: "emaiL1@email.fr",
    password: "password1",
  },

  {
    name: "name2",
    lastname: "lastname2",
    email: "emaiL2@email.fr",
    password: "password2",
  },

  {
    name: "name3",
    lastname: "lastname3",
    email: "emaiL3@email.fr",
    password: "password3",
  },

  {
    name: "name4",
    lastname: "lastname4",
    email: "emaiL4@email.fr",
    password: "password4",
  },

  {
    name: "name5",
    lastname: "lastname5",
    email: "emaiL5@email.fr",
    password: "password5",
  },
];

//poser la question demain -------------

async function insertUsers() {
  try {
    await UserModel.deleteMany(); 
    const inserted = await UserModel.insertMany(userDB); // insert docs in db
    console.log(`seed users done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertUsers();