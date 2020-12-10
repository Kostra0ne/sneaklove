var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  label: String,
});

const TagModel = mongoose.model("tag", TagSchema);

module.exports = TagModel;
