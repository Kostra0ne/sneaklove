const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  image: {
    type: String,
    default: "/medias/img/shoe.png",
  },
  price: Number,
  category: { type: String, enum: ["men", "women", "kids"] },
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
  },
});

const SneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = SneakerModel;
