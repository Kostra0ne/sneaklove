const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
    {
        name: String,
        ref: String,
        size: Number,
        description: String,
        price: Number,
        category: {
            type: String,
            enum: ["men", "women", "kids"]
        },
        id_tags: [{
            type: Schema.Types.ObjectId,
            ref: "tags"
        }],
        image: {
            type: String,
            default: "http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg"
        }
    }
)

const SneakerModel = mongoose.model("sneakers", sneakerSchema);

module.exports = SneakerModel;