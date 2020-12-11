const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagsSchema = new Schema(
  {
    label: String,
  },
  { timestamps: true }
);
const TagsModel = mongoose.model("tag", tagsSchema);

module.exports = TagsModel;
