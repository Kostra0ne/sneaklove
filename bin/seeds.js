require("dotenv").config();
require("./../config/mongo");

const SneakerModel = require("./../models/Sneaker");

const sneakers = [
  {
    name: "NIKE Blazer Mid '77 Infinite",
    ref: "DA7233-100",
    size: 42,
    description:
      "The Nike Blazer Mid '77 Infinite toughens up the old-school, b-ball icon that has become the go-to of the streets. Durable rubber details on the toe, heel and side let you take it where you want, day in and day out, while the piping and distorted Swoosh logo add a modern touch.",
    price: 100,
    category: "men",
    image:
      "https://res.cloudinary.com/dark3xnme/image/upload/v1607635712/blazer-mid-77-infinite-shoe-SVrkH5_wnbkge.jpg",
  },
  {
    name: "Converse x Golf Wang Chuck 70 Hightop",
    ref: "170011C",
    size: 37,
    description:
      "POLKA DOT PARTY. Premium craftsmanship meets quirky design on a bold new Chuck 70 from GOLF WANG.",
    price: 110,
    category: "women",
    image:
      "https://res.cloudinary.com/dark3xnme/image/upload/v1607635664/170011C_standard_lnhuh7.jpg",
  },
  {
    name: "Adidas NMD_1",
    ref: "FX6794",
    size: 45,
    description: "A signature heel pull and midsole plugs amp up the '80s vibe",
    price: 140,
    category: "men",
    image:
      "https://res.cloudinary.com/dark3xnme/image/upload/v1607635750/5bdcc0ebaf3e30eaa3c2e496d4748136_lcwyva.jpg",
  },
  {
    name: "Crocs Kids' Bayaland Sandal",
    ref: "205400",
    size: 21,
    description:
      "There's a little bit of athletic spirit taken from the Crocband™ styles underpinning these easy-to-learn and fun-to-wear sandals. Adjustable hook-and-loop ankle straps make it easy for kids to put them on and take them off while providing a secure fit. And, of course, molded Croslite™ construction means they'll stay comfortably supported from breakfast to bedtime.",
    price: 35,
    category: "kids",
    image:
      "https://res.cloudinary.com/dark3xnme/image/upload/v1607635867/81hVnFKtQlL._AC_SR255_340__vdbvjc.jpg",
  },
];

SneakerModel.deleteMany()
  .then(async () => {
    await SneakerModel.insertMany(sneakers);
  })
  .catch((err) => {
    console.error(err);
  });
