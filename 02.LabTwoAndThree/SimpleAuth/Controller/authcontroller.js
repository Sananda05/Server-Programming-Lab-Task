const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const alert = require("alert");
const jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const User = require("../model/usersModel/user");

JWT_SECRET = "aghddshjhdhebgdshdjkhxsnakjdsjsjdd674773$%$#sshsshhsdhssj";

const getRegister = (req, res) => {
  res.sendFile("register.html", { root: "./views/authView" });
};

const postRegister = async (req, res) => {
  const { username, email, gender, password, Confirm_password } = req.body;

  if (!username || typeof username !== "string") {
    alert("Inavlid Username");
    res.redirect("/");
  }
  if (!email || typeof email !== "string") {
    alert("Inavlid email");
    res.redirect("/");
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
      res.redirect("/");
    }
  } else {
    alert("Password must be at least 6 digits");
    res.redirect("/");
  }
};

const getLogin = (req, res) => {
  res.sendFile("login.html", { root: "./views/authView" });
};

const postLogin = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (bcrypt.compareSync(password, user.pass)) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET
      );
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
    res.redirect("/");
  }
};


module.exports = { getRegister, postRegister, getLogin, postLogin};
