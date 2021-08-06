const express = require("express");
let cookieParser = require("cookie-parser");
const alert = require("alert");

const app = express();
app.use(cookieParser);

var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const isLoggedIn = (req, res, next) => {
  const current_user = localStorage.getItem("user");
  
  if (current_user) {
    res.clearCookie("user");
    res.cookie("user", current_user);
    //res.send(`Welcome ${current_user} !`);
    next();
  } else {
    alert("please Log in first!");
    res.redirect("/login");
  }
};


module.exports ={isLoggedIn};