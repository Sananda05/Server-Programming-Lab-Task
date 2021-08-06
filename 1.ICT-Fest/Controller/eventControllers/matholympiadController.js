const MathOlympiad = require ("../../model/eventsModel/MatholympiadModel");

var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const alert = require("alert");
const Matholympiad = require("../../model/eventsModel/MatholympiadModel");

const current_user = localStorage.getItem("user");


const getMoRegister = (req, res) => {
    res.render("eventView/Matholympiad/mathOlympiadReg.ejs",{error:req.flash('error'),user:current_user});
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
    let error="";

   const participant = await MathOlympiad.findOne({name:name , contact:contact});
        if(participant){
            alert("Participant with this name and contact number already exists");

            error="Participant with same name and contact exists"
             
            req.flash('error',error)
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

                error='Participant has been registered successfully!!'
                req.flash('error',error)

                res.redirect("/mo/register");
            }catch(error){
                alert("Registration Failed :(");

                error='Unexpected error'
                req.flash('error',error)

                res.redirect("/mo/register");
                console.log(error);
            }
          
        }
    };

const getList = async (req,res) =>{

    let allParticipants =[];
    let error ="";
    Matholympiad.find().then((data)=>{
        allParticipants=data;
        
        res.render("eventView/Matholympiad/mathOlympiadList.ejs",{
            error:req.flash('error'),
            user:current_user,
            participants:allParticipants,
        });
    }).catch((error)=>{
        alert("Failed");
        console.log(error),
        
        res.render("eventView/Matholympiad/mathOlympiadList.ejs",{
            error:req.flash('error'),
            user:current_user,
            participants:allParticipants,
            
        });
    });
};

const getDelete = (req,res) =>{
    const id  = req.params.id;
    MathOlympiad.deleteOne({_id:id},(err)=>{
        if(err){
            
            error='Failed to delete data!'
            req.flash('error',error)
            
            res.redirect("/mo/list");
        }else{
            error='Data has been deleted successfully!'
            req.flash('error',error)

            res.redirect("/mo/list");
        }
    })
    console.log(id);
   
}

const getPayment =(req,res) =>{
    const id  = req.params.id;

    MathOlympiad.findOne({_id:id})
    .then((participant)=>{
        participant.paid = participant.total;
        participant
        .save()
        .then(()=>{
            error="Payment completed succesfully"
            req.flash('error',error)

            res.redirect("/mo/list");
        }).catch(()=>{
            error="Data could not be updated"
            req.flash('error',error)

            res.redirect("/mo/list");
        })
        })
}

const getSelected =(req,res) =>{
    const id  = req.params.id;

    MathOlympiad.findOne({_id:id})
    .then((participant)=>{
        participant.selected = true;
        participant
        .save()
        .then(()=>{
            error="Participant has been selcted succesfully"
            req.flash('error',error)

            res.redirect("/mo/list");
        }).catch(()=>{
            error="Something went wrong"
            req.flash('error',error)
            res.redirect("/mo/list");
        })
        })
    
}
    

const postEdit = async (req,res) => {
   

    const {id,name,category,contact,email,institution,tshirt}=req.body;
    console.log(name);
    console.log(category);
    console.log(contact);
    console.log(email);
    console.log(institution);
    console.log(tshirt);

    console.log(id);

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
    MathOlympiad.findOne({_id:id})
    .then((participant)=>{
        participant.name=name;
        participant.category=category;
        participant.contact=contact;
        participant.email=email;
        participant.institution=institution;
        participant.tshirt=tshirt;
        participant.total=total;
        console.log(participant.name);
        participant
        .save()
        .then(()=>{
            error="Participant's information has been updated successfully!!"
            req.flash('error',error)

            res.redirect("/mo/list");
        }).catch((error)=>{
            error="Something went wrong"
            req.flash('error',error)

            res.redirect("/mo/list");
            console.log(error);
        })
        })
    };
module.exports ={getMoRegister,postMoRegister,getList,getDelete,postEdit,getPayment,getSelected};  