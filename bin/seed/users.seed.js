require('./../../config/mongodb');
const UserModel = require("./../../models/User");

const user = [
    {
        name: "Anaïs",
        lastname: "Engler",
        email: "anais@street.org",
        password: "123456"
    },
    {
        name: "Mélusine",
        lastname: "Rey",
        email: "melu@street.org",
        password: "123456"
    },
    {
        name: "Mathieu",
        lastname: "Lambertin",
        email: "mathieu@natureetdecouverte.org",
        password: "plaid"
    }
]

UserModel.create(user)
    .then((userDoc)=> {
        console.log(userDoc);
    })
    .catch((error) => console.log(error));

