const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: String,
    lastname: String,
    size: String,
    email: String,
    password: Number,
    price: String,
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
