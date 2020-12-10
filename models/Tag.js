const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
        name: String,
        lastname: String,
        email: String,
        password: String
})

const TagModel = mongoose.model("tag", TagsSchema);

module.exports = TagModel;