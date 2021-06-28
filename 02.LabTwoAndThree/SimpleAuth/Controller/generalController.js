var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const alert = require("alert");

const getLanding = (req, res) => {
  res.sendfile("landing.html" , {root : "./views"});
};

const getHome =  (req, res) => {
    
    const current_user = localStorage.getItem("user");
    res.sendfile("starter.html", { root: "./views" })
    alert(`Welcome  ${current_user} !`);

};


module.exports = { getHome,getLanding };
