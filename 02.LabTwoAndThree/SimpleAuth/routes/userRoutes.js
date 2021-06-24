const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const isLoggedIn = require("../middleWare/authMiddleWare");
const { getRegister, postRegister, getLogin, postLogin} = require("../Controller/authcontroller");
const {getHome , getLanding} = require("../Controller/generalController");

router.use("/home", isLoggedIn);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use("/home", isLoggedIn);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", getLanding);
router.route("/register").get(getRegister).post(postRegister);

router.route("/login").get(getLogin).post(postLogin);

router.get("/home", getHome);

router.use((req, res) => {
  res.status(401).send("404! Page doesn't exist");
});

module.exports = router;
