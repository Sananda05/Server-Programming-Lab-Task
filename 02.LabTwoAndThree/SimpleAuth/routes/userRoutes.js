const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const alert = require("alert");
var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const User = require("../model/usersModel/user");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get("/", (req,res) =>{
    res.send("Landing");
})

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./views/authView" });
});

router.post("/register", async (req, res) => {
    const { username, email, gender, password, Confirm_password } = req.body;

    if (!username || typeof username !== "string") {
      alert("Inavlid Username");
      res.redirect("/register");
    }
    if (!email || typeof email !== "string") {
      alert("Inavlid email");
      res.redirect("/register");
    }
  
    if (password.length >= 6) {
      if (password === Confirm_password) {
        const pass = await bcrypt.hash(password, 10);
  
        try {
          const newUser = await User.create({
            username,
            email,
            gender,
            pass,
          });
          console.log("User created successfully", newUser);
          res.redirect("/login");
        } catch (error) {
          if (error.code === 11000) {
            alert("Username or Email already registered");
          }
          console.log(error);
        }
      } else {
        alert("Password doesn't match !");
        res.redirect("/register");
      }
    } else {
      alert("Password must be at least 6 digits");
      res.redirect("/register");
    }
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./views/authView" });
});

router.post("/login", async (req, res) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (user) {
      if (bcrypt.compareSync(password, user.pass)) {

        localStorage.setItem("user", user.username);
        res.cookie("user", user.username);
        alert("Login Successful !");
        res.redirect("/home");
      } else {
        alert("Wrong Password");
        res.redirect("/login");
      }
    } else {
      alert("User not registered");
      res.redirect("/register");
    }
});

router.get("/home",  (req, res) => {
    res.send("Home")
});

router.use( (req, res) => {
    res.status(401).send("404! Page doesn't exist");
});

module.exports = router;