const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    name: String,
    ref: String,
    size: Number,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ["men", "women", "kids"]
    },
    id_tags: {
        type: Schema.Types.ObjectId,
        ref: "Tag",
    },
    image: {
        type : String,
        default: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1500,h_1500/global/372359/05/sv01/fnd/EEA/fmt/png/Basket-RS-X-Puzzle-AC-pour-bb"
    }
})

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;