require("dotenv").config();
require("./../config/mongo");

//db user
const UserModel = require("./../models/User");

const users = [
  {
    name: "Jean-Claude",
    lastname: "VanDam",
    email: "jcvd@mail.com",
    password: "1234",
  },
];

async function inserUser() {
  try {
    await UserModel.deleteMany(); // empty the styles db collection
    const inserted = await UserModel.insertMany(users); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}
inserUser();


