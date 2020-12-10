const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: { type: String, enum: ["kids", "men", "women"] },
  image: {
    type: String,
    default: "/medias/img/shoe.png",
  },
  id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
});

const SneakerModel = mongoose.model("sneaker", SneakerSchema);

module.exports = SneakerModel;
