const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

const UserModel = model("users", userSchema);
module.exports = UserModel;
