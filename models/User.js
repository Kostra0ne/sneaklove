var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
