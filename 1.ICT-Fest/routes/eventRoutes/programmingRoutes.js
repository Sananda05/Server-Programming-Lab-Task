const express = require("express");
const router = express.Router();

const {isLoggedIn, addUserInfo} = require("../../middleWare/authMiddleWare");

const { getPcRegister, postPcRegister, getList, getDelete,postEdit,getPayment,getSelected} = require("../../Controller/eventControllers/ProgrammingController");



router.get("/pc/register", isLoggedIn, addUserInfo, getPcRegister);

router.post('/pc/register',isLoggedIn,addUserInfo, postPcRegister);

router.get('/pc/list',isLoggedIn,addUserInfo, getList);

router.get('/pc/delete/:id', isLoggedIn,addUserInfo,  getDelete);

router.post('/pc/edit',isLoggedIn, addUserInfo, postEdit);

router.get('/pc/paymentdone/:id',isLoggedIn, addUserInfo, getPayment);

router.get('/pc/selected/:id',isLoggedIn, addUserInfo, getSelected);

module.exports = router;