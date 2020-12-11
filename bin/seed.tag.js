// create a test data set of valid users
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const TagsModel = require("../models/Tag");



const tags = [
        {
                label: "bbbb"
        },
        {
                label: "aaaa"
        },

]


async function insertLabels() {
        try {
                await TagsModel.deleteMany(); // empty the styles db collection


                const inserted = await TagsModel.insertMany(tags); // insert docs in db
                console.log(`seed artists done : ${inserted.length} documents inserted !`);
        } catch (err) {
                console.error(err);
        }
}

insertLabels();
