const mongoose = require("mongoose");

const Schema = mongoose.Schema;

 const sneakersSchema = new Schema({

     name: String,
     ref: String,
     size: Number,
     description:String,
     price:Number,
     category:{
         type:String,
         enum:[
             "men",
             "women",
             "kids",
         ]
     },
     id_tags:[{
         type:String,
        // type:Schema.Types.ObjectId, 
        ref:"tags"
     }],
 });


 const sneackersModel = mongoose.model("Sneakers", sneakersSchema);

module.exports = sneackersModel ;