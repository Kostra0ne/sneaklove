module.exports = function devMode(req, res, next) {
  req.session.currentUser = {
    _id: "5f08221dd4c0f83bdff8e04d", // change the user id here to fit your needs
    name: "demo-admin",
    avatar: "https://cdn.onlinewebfonts.com/img_258083.png",
    role: "admin",
    email: "admin@sneaklove.com",
  };
  next();
};
