
require("dotenv").config();
require("../config/mongo"); // fetch the db connection
const UserModel = require("../models/User");


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
