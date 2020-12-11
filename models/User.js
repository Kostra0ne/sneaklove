const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
