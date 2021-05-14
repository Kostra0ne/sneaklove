const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
    label: String
    })
    const TagModel = model("tags", tagSchema);
module.exports = TagModel;