const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  label: String,
});

const TagsModel = mongoose.model("tags", TagsSchema);

module.exports = TagsModel;
