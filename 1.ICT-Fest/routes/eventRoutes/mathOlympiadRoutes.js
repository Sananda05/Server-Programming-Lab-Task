const express = require("express");
const router = express.Router();

const {isLoggedIn} = require("../../middleWare/authMiddleWare");

const { getMoRegister, postMoRegister, getList, getDelete,postEdit,getPayment,getSelected} = require("../../Controller/eventControllers/matholympiadController");



router.get("/mo/register", isLoggedIn, getMoRegister);

router.post('/mo/register',isLoggedIn, postMoRegister);

router.get('/mo/list',isLoggedIn, getList);

router.get('/mo/delete/:id', isLoggedIn,  getDelete);

router.post('/mo/edit',isLoggedIn,postEdit);

router.get('/mo/paymentdone/:id',isLoggedIn, getPayment);

router.get('/mo/selected/:id',isLoggedIn, getSelected);

module.exports = router;