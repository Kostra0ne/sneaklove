require("dotenv").config();
require("../config/mongodb");
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");

const sneakers = [
  {
    name: "Air Jordan I",
    ref: "REF1",
    size: 10,
    description: "The best Air Jordan",
    price: 550,
    category: "men",
    image:
      "https://c.static-nike.com/a/images/t_prod_ss/w_640,c_limit,q_auto,f_auto/vogtqj5pzacmnclt7zuf/nike-air-jordan-1-summit-white-amp-track-red-amp-black-release-date.jpg",
    id_tags: "5fd253181b1637339778fda3",
  },
  {
    name: "Converse All-Star",
    ref: "REF2",
    size: 8,
    description: "The best Converse",
    price: 350,
    category: "women",
    image:
      "https://www.converse.com/on/demandware.static/-/Sites-ConverseMaster/default/dwc8588b23/images/hi-res/M9160C_standard.jpg?sw=580&sh=580&sm=fit",
  },
  {
    name: "Adidas Stan Smith",
    ref: "REF3",
    size: 4,
    description: "Classic Stan Smith",
    price: 100,
    category: "kids",
    image: "https://images.esellerpro.com/2308/I/208/80/8971844517918.jpg",
  },
];

const tags = [
  { label: "running" },
  { label: "streetwear" },
  { label: "loungewear" },
  { label: "basketball" },
];

async function insertion() {
  try {
    await SneakerModel.deleteMany();
    SneakerModel.insertMany(sneakers);
    TagModel.deleteMany();
    TagModel.insertMany(tags);
    console.log("Inserted Stuff");
  } catch (err) {
    console.error(err);
  }
}

insertion();
