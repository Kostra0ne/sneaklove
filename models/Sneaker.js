const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  id_tags: [Schema.Types.ObjectId],
});

const SneakerModel = mongoose.model("sneakers", SneakerSchema);

module.exports = SneakerModel;
