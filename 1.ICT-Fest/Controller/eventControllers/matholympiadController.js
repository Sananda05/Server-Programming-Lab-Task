const MathOlympiad = require ("../../model/eventsModel/MatholympiadModel");

var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const alert = require("alert");
const Matholympiad = require("../../model/eventsModel/MatholympiadModel");

const current_user = localStorage.getItem("user");
const nodemailer = require("nodemailer");
const crypto = require("crypto")



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
    const hashedId = "pass";
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
                    hashedId,
                });
            
                error='Participant has been registered successfully!!'
                req.flash('error',error)

                 // generating unique code 

                 const str =(participant._id).toString()
                
                 const secret = "shhh it's a secret";
 
                 // create a sha-256 hasher
                 const sha256Hasher = crypto.createHmac("sha256", secret);
 
                 const hashed = sha256Hasher.update(str).digest("hex");
 
                 console.log(hashed);
                 pid= participant._id

                MathOlympiad.findOne({_id:pid})
                .then((participant)=>{
                    participant.hashedId = hashed;
                    participant
                    .save()
                    .then(()=>{
                        console.log("Done")
                        res.redirect("/mo/list");
                    }).catch(()=>{
                        console.log("Something went wrong")
                    })
                    })

                
                const sendmail = `
                <p>Hello ${name},<br> Thank you for registering for the 10th ICT Fest <b>Math Olympiad</b> Event.
                </p>
                <h5>Check Your ID </h5>
                <ul>
                <li><b>ID </b>: ${hashed}</li>
                </ul>
                <p>For any kind of support do reach out to the following contacts</p>
                <ul>
                <li> Sananda: +8801776451545 </li>
                <li> Fahim Abrar: +8801776451545 </li>
                </ul>
                <p>Regards</p></br>
                <p>ICT Fest 2019</p>
                 `;

                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS, 
                    },
                });

                const mailDetails ={

                    from: 'sanandazohora@gmail.com', // sender address
                    to: email, // list of receivers
                    
                    subject: "Regarding 10th ICT Fest Registration.", // Subject line
                    text: "Hello"+{name}+",Thank you for your registration in Math Olympiad event.",
                    html : sendmail,
                }  
            
                // send mail with defined transport object
                let info = await transporter.sendMail(mailDetails, function(err,data){
                    
                if(err) {
                    console.log(err);
                } else {
                    error="Confirmantion E-mail has been sent."
                    req.flash('error',error)
                    console.log('Email sent successfully');
                }
                });

                res.redirect("/mo/register");

            }catch(error){
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
    console.log(req.body);

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
    MathOlympiad.findOne({ name: name, contact: contact })
    .then((participant)=>{
        if (participant && participant._id!=id) {
            error = "Participant with this name and contact already exists!";
            req.flash("error", error);
            res.redirect("/mo/list");
        }
        else {
            MathOlympiad.findOneAndUpdate(
              { _id: id }, 
              { name, contact, category, email,total, institution, tshirt })
              .then((data) => {
                error = "Participant updated successfully!";
                    req.flash("error", error);
                    res.redirect("/mo/list");
              })
              .catch((e) => {
                console.log(e);
                error = "Failed to update participant details";
                res.redirect("/mo/list");
              });
          }
        
        })
    };
module.exports ={getMoRegister,postMoRegister,getList,getDelete,postEdit,getPayment,getSelected};  