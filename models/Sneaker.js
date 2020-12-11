const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: { type: String, enum: ["men", "women", "kids"] },
  id_tags: { type: Schema.Types.ObjectId, ref: "tag" },
  image: {
    type: String,
    default:
      "https://images-na.ssl-images-amazon.com/images/I/71rR1V%2B9FqL._UY695_.jpg",
  },
});

const SneakersModel = mongoose.model("sneakers", sneakerSchema);

module.exports = SneakersModel;
