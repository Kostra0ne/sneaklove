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
        enum: [
            "Men",
            "Women",
            "Kids"
        ]
    },
    id_tags: [Schema.Types.ObjectId]
})

const SneakersModel = mongoose.model("sneakers", sneakerSchema);

module.exports = SneakersModel;