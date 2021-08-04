const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

const {isLoggedIn,addUserInfo }= require("../middleWare/authMiddleWare");
const { getRegister, postRegister, getLogin, postLogin,logOut} = require("../Controller/authcontroller");
const {getHome , getLanding} = require("../Controller/generalController");
const errorController = require("../Controller/errorController");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//router.use("/home", isLoggedIn);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", getLanding);
router.route("/register").get(getRegister).post(postRegister);

router.route("/login").get(getLogin).post(postLogin);

router.get("/home", isLoggedIn,addUserInfo, getHome);

router.post('/home',logOut);

//router.use(errorController.invalidPage);

module.exports = router;
