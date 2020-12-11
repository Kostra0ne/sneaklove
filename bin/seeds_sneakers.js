require("./../config/mongo");
const SneakerModel = require("./../models/Sneaker");

const sneakers = [
  {
    name: "Nike sport One",
    ref: "315241847106",
    size: 4,
    description:
      "Build on the legacy of Nike. Inspired by the racing style of the 70s, the brand recently launched the Reebok Legacy 83 exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors. Buy your pair now and make the race more fun!",
    price: 89.99,
    category: "kids",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Converse Chuck Taylor",
    ref: "315241847809",
    size: 9,
    description:
      "Inspired by the racing style of the 70s, exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors.",
    price: 89.99,
    category: "women",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Tuned",
    ref: "315241847208",
    size: 10,
    description: "",
    price: 169.99,
    category: "men",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
];

async function insertSneakers() {
  try {
    await SneakerModel.deleteMany();
    const inserted = await SneakerModel.insertMany(sneakers);
    console.log(`seeds sneakers done : ${inserted.length} documents inserted!`);
  } catch (error) {
    console.error(error);
  }
}
insertSneakers();
