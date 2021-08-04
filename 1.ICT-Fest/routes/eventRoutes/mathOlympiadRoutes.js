const express = require("express");
const router = express.Router();

const {isLoggedIn, addUserInfo} = require("../../middleWare/authMiddleWare");

const { getMoRegister, postMoRegister, getList, getDelete,postEdit,getPayment,getSelected} = require("../../Controller/eventControllers/matholympiadController");



router.get("/mo/register", isLoggedIn, addUserInfo, getMoRegister);

router.post('/mo/register',isLoggedIn,addUserInfo, postMoRegister);

router.get('/mo/list',isLoggedIn,addUserInfo, getList);

router.get('/mo/delete/:id', isLoggedIn,addUserInfo,  getDelete);

router.post('/mo/edit/:id',isLoggedIn, addUserInfo, postEdit);

router.get('/mo/paymentdone/:id',isLoggedIn, addUserInfo, getPayment);

router.get('/mo/selected/:id',isLoggedIn, addUserInfo, getSelected);

module.exports = router;