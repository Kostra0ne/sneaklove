var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  image: String,
});

const SneakerModel = mongoose.model("sneaker", SneakerSchema);

module.exports = SneakerModel;
