var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const alert = require("alert");


const current_user = localStorage.getItem("user");

const getPcRegister = (req, res) => {
    res.render("eventView/Matholympiad/mathOlympiadReg.ejs",{user:current_user});
};

const postPcRegister = async(req,res) =>{

};

const getList = async (req,res) =>{
};

const getDelete = (req,res) =>{
};

const getPayment =(req,res) =>{
};

const getSelected =(req,res) =>{
};

const postEdit = async (req,res) => {
};

module.exports ={getPcRegister,postPcRegister,getList,getDelete,postEdit,getPayment,getSelected};  