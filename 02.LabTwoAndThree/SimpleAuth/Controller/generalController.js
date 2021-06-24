var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const getLanding = (req, res) => {
  res.send("Landing");
};

const getHome =  (req, res) => {
    res.sendfile("home.html", { root: "./views/homeView" })
};


module.exports = { getHome,getLanding };
