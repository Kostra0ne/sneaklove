// create a test data set of valid users
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const TagsModel = require("../models/Tag");



const tags = [
        {
                name: "aaaa",
                lastname: "aaaa",
                email: "aaa@gmail.com",
                password: "aaa"
        },
        {
                name: "bbbb",
                lastname: "bbbb",
                email: "bbbb@gmail.com",
                password: "bbbb"
        },
        {
                name: "cccc",
                lastname: "cccc",
                email: "cccc@gmail.com",
                password: "cccc"
        }
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
