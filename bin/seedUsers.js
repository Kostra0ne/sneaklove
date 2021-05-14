require("./../config/mongodb");

const mongoose = require("mongoose");
const UsersModel = require("./../models/User");


const usersArray = [{
    name: "Pam",
    lastname: "Beasly",
    email: "pamola@dunderm.com",
    password: "iLovJIMMM@"
}]

UsersModel.create(usersArray)
    .then((dbRes) => {
        console.log(dbRes);
    })
    .catch((error) => {
        console.log(error);
    })