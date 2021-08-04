const express = require("express");
const router = express.Router();

const {isLoggedIn, addUserInfo} = require("../../middleWare/authMiddleWare");

const { getMoRegister, postMoRegister, getList, getDelete,getEdit} = require("../../Controller/eventControllers/matholympiadController");



router.get("/mo/register", isLoggedIn, addUserInfo, getMoRegister);

router.post('/mo/register',isLoggedIn,addUserInfo, postMoRegister);

router.get('/mo/list',isLoggedIn,addUserInfo, getList);

router.get('/delete/:id', isLoggedIn,addUserInfo,  getDelete);

router.get('/edit/:id',isLoggedIn, addUserInfo, getEdit);

module.exports = router;