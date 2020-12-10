const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: String[(men, women, kids)],
  id_tags: [ObjectId],
});

const SneakerModel = mongoose.model("sneaker", SneakerSchema);

module.exports = SneakerModel;
