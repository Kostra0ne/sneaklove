require("dotenv").config();
require("./../config/mongodb");

const tagModel = require("./../models/Tag");

const labels = [
    {
        label: "running",
    },
    {
        label: "hiking",
    },
    {
        label: "street",
    },
    {
        label: "ugly",
    },
    {
        label: "fashion",
    },
    {
        label: "cheap",
    },
]

tagModel.insertMany(labels)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.log(dbErr));