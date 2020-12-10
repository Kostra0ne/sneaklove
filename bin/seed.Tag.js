require("dotenv").config();
require(".././config/mongo");


//db sneakers
const TagsModel = require("./../models/Tag");

const tag = [
  {
      label: "A label"
  },
];
async function inserUser() {
    try {
      await TagsModel.deleteMany(); // empty the styles db collection
      const inserted = await TagsModel.insertMany(tag); // insert docs in db
      console.log(`seed labels done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  }
  inserUser();
  
