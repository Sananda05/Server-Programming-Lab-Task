const express = require("express");
const router = express.Router();

const {isLoggedIn} = require("../../middleWare/authMiddleWare");

const { getPcRegister, postPcRegister, getList, getDelete,postEdit,getPayment,getSelected} = require("../../Controller/eventControllers/ProgrammingController");



router.get("/pc/register", isLoggedIn, getPcRegister);

router.post('/pc/register',isLoggedIn, postPcRegister);

router.get('/pc/list',isLoggedIn, getList);

router.get('/pc/delete/:id', isLoggedIn,  getDelete);

router.post('/pc/edit',isLoggedIn, postEdit);

router.get('/pc/paymentdone/:id',isLoggedIn, getPayment);

router.get('/pc/selected/:id',isLoggedIn, getSelected);

module.exports = router;