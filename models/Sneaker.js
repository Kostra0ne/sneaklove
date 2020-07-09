const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  image : {
      type : String,
    default : "./../public/medias/img/shoe.png"},
  category: {
      type : String,
        Enum : ["men", "women", "kids"]
  },
  id_tags: {
      type : Schema.Types.Ojbectid,
      ref : "Tag"
  }
});


const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;