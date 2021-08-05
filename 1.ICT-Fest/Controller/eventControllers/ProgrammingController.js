var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const alert = require("alert");

const ProgrammingContest = require("../../model/eventsModel/programmingModel");


const current_user = localStorage.getItem("user");

const getPcRegister = (req, res) => {
    res.render("eventView/ProgrammingContest/programmingcontestReg.ejs",{user:current_user});
};

const postPcRegister = async(req,res) =>{
    const {name,category,contact,email,institution,tshirt}=req.body;
    console.log(name);
    console.log(category);
    console.log(contact);
    console.log(email);
    console.log(institution);
    console.log(tshirt);

    let regFee =0;

    if(category == "School"){
        regFee = 250;
    }
    else if (category == "College")
    {
        regFee = 400;
    }
    else{
        regFee = 500;
    }

    const total = regFee;
    const paid = 0.0;
    const selected = false;
    const error="";

   const participant = await ProgrammingContest.findOne({name:name , contact:contact});
        if(participant){
            alert("Participant with this name and contact number already exists");
            res.redirect("/pc/register");
        }
        else{

            try{
                const participant = await ProgrammingContest.create({
                    name,
                    category,
                    contact,
                    email,
                    institution,
                    total,
                    paid,
                    selected,
                    tshirt,
                });
                alert("Successfully Registered!");
                
                res.redirect("/home");
            }catch(error){
                alert("Registration Failed :(");
                res.redirect("/pc/register");
                console.log(error);
            }
          
        }

};

const getList = async (req,res) =>{
    let allParticipants =[];
    ProgrammingContest.find().then((data)=>{
        allParticipants=data;
        
        res.render("eventView/ProgrammingContest/programmingContestList.ejs",{
            user:current_user,
            participants:allParticipants,
        });
    }).catch((error)=>{
        alert("Failed");
        console.log(error),
        
        res.render("eventView/ProgrammingContest/programmingContestList.ejs",{
            user:current_user,
            participants:allParticipants,
            
        });
    });
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