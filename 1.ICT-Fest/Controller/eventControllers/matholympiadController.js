const MathOlympiad = require ("../../model/eventsModel/MatholympiadModel");

var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const alert = require("alert");
const Matholympiad = require("../../model/eventsModel/MatholympiadModel");

const current_user = localStorage.getItem("user");


const getMoRegister = (req, res) => {
    res.render("eventView/Matholympiad/mathOlympiadReg.ejs",{user:current_user});
};

const postMoRegister = async(req,res) =>{
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

   const participant = await MathOlympiad.findOne({name:name , contact:contact});
        if(participant){
            alert("Participant with this name and contact number already exists");
            res.redirect("/mo/register");
        }
        else{

            try{
                const participant = await MathOlympiad.create({
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
                res.redirect("/mo/register");
                console.log(error);
            }
          
        }
    };

const getList = (req,res) =>{

    let allParticipants =[];
    Matholympiad.find().then((data)=>{
        allParticipants=data;
        res.render("eventView/Matholympiad/mathOlympiadList.ejs",{
            user:current_user,
            participants:allParticipants,
        });
    }).catch(()=>{
        alert("Failed");
        res.render("eventView/Matholympiad/mathOlympiadList.ejs",{
            user:current_user,
            participants:allParticipants,
            
        });
    });
};

const getDelete = (req,res) =>{
    const id  = req.params.id;
    console.log(id);
    res.render("eventView/Matholympiad/mathOlympiadList.ejs");
}

const getEdit = (req,res) => {
    const id  = req.params.id;
    console.log(id);
    res.render("eventView/Matholympiad/mathOlympiadList.ejs");
}
module.exports ={getMoRegister,postMoRegister,getList,getDelete,getEdit};  