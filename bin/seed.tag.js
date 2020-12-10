require("dotenv").config();
require("./../config/mongo");
const TagModel = require ("./../models/Tag");
const mongoose = require("mongoose");

const tags = [
{
label: "abc"
}
]

//empty database
TagModel.deleteMany().then(async () => {
    //insert robots in db
    await TagModel.insertMany(tags);
    console.log("ok: nb a tags has been inserted")
}).catch(err => {
    console.log(err)
})
