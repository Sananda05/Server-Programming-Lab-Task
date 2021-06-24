const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.get("/", (req,res) =>{
    res.send("Landing");
})

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./views/authView" });
});

router.post("/register", async (req, res) => {
  res.send("Reg done");
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./views/authView" });
});

router.post("/login", (req, res) => {
  res.send("Login done");
});

router.get("/home",  (req, res) => {
    res.send("Home")
});

router.use( (req, res) => {
    res.status(401).send("404! Page doesn't exist");
});

module.exports = router;