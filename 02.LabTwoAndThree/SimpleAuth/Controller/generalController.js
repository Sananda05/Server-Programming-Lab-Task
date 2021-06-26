var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const getLanding = (req, res) => {
  res.sendfile("landing.html" , {root : "./views"});
};

const getHome =  (req, res) => {
    res.sendfile("starter.html", { root: "./views" })
};


module.exports = { getHome,getLanding };
