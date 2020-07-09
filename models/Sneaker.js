const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
    required: true,
  },
  size: Number,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
  },
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;
