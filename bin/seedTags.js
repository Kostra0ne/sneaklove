require("./../config/mongodb");

const mongoose = require("mongoose");
const TagsModel = require("./../models/Tag");
const TagModel = require("./../models/Tag");

const tagDB = {
    label: "Just Do It!"
}

TagsModel.create(tagDB)
    .then((dbRes) => {
        console.log(dbRes);
    })
    .catch((error) => {
        console.log(error);
    })