const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sneakerSchema = new Schema(
  {
    name: String,
    ref: String,
    size: String,
    street: String,
    description: Number,
    price: String,
    category: { type: String, enum: ["men", "women", "kids"] },
    // id_tags: [ObjectId],
  },
  { timestamps: true }
);
const SneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = SneakerModel;
