categoryrequire("./../config/mongo");
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
    name: "Nike Air",
    ref: "315241847107",
    size: 5,
    description:
      "Build on the legacy of Nike. Inspired by the racing style of the 70s, the brand recently launched the Reebok Legacy 83 exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors. Buy your pair now and make the race more fun!",
    price: 89.99,
    category: "kids",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike One Force",
    ref: "315241847108",
    size: 3,
    description:
      "Build on the legacy of Nike. Inspired by the racing style of the 70s, the brand recently launched the Reebok Legacy 83 exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors. Buy your pair now and make the race more fun!",
    price: 89.99,
    category: "kids",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Cortez",
    ref: "315241847109",
    size: 6,
    description:
      "Build on the legacy of Nike. Inspired by the racing style of the 70s, the brand recently launched the Reebok Legacy 83 exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors. Buy your pair now and make the race more fun!",
    price: 89.99,
    category: "kids",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Tuned",
    ref: "315241847102",
    size: 8,
    description: "",
    price: 169.99,
    category: "women",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Reebok Legacy 83",
    ref: "315241847108",
    size: 7,
    description:
      "Build on the legacy of Reebok. Inspired by the racing style of the 70s, the brand recently launched the Reebok Legacy 83 exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors. Buy your pair now and make the race more fun!",
    price: 109.99,
    category: "women",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Air Force 1 Pixel",
    ref: "315241847114",
    size: 6,
    description:
      "Inspired by the racing style of the 70s, exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors.",
    price: 109.99,
    category: "women",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Air Max 2090",
    ref: "315241847102",
    size: 7,
    description:
      "Inspired by the racing style of the 70s, exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors.",
    price: 69.99,
    category: "women",
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
  {
    name: "Reebok Legacy 83",
    ref: "315241847708",
    size: 11,
    description:
      "Build on the legacy of Reebok. Inspired by the racing style of the 70s, the brand recently launched the Reebok Legacy 83 exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors. Buy your pair now and make the race more fun!",
    price: 109.99,
    category: "men",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Air Force 1 Pixel",
    ref: "315241847614",
    size: 13,
    description:
      "Inspired by the racing style of the 70s, exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors.",
    price: 109.99,
    category: "men",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Nike Air Max 2090",
    ref: "315241848102",
    size: 10,
    description:
      "Inspired by the racing style of the 70s, exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors.",
    price: 69.99,
    category: "men",
    image: "/medias/img/shoe.png",
    // id_tags: [ObjectId]
  },
  {
    name: "Converse Chuck Taylor",
    ref: "315241847909",
    size: 12,
    description:
      "Inspired by the racing style of the 70s, exclusively for women. The sneaker has been redesigned to meet modern needs with trail running features like a lug sole, TPU heel protection, synthetic suede overlays with translucent ripstop underlays and a hot melt xxl vector. You are spoiled for choice because it comes in different colors such as black suede, translucency, reflectivity, snake print, metallic logo and bright colors.",
    price: 89.99,
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

// SneakerModel.insertmeny(sneakers)
//   .then((sneakers) => {
//     sneakers.forEach((sneakers) => {
//       console.log(sneakers.name);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
