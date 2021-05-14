require('./../../config/mongodb');
const TagModel = require("./../../models/Tag");

const tag = [
    {label: "Fancy"},
    {label: "Cute"},
    {label: "Streetwear"},
    {label: "Rain"}
]

TagModel.create(tag)
    .then((tagDoc)=> {
        console.log(tagDoc);
    })
    .catch((error) => console.log(error));

