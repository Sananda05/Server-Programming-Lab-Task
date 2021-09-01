var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const programmingContest = require("../../model/eventsModel/programmingModel");
const nodemailer = require("nodemailer");



const current_user = localStorage.getItem("user");

const getPcRegister = (req, res) => {
    
    res.render("eventView/ProgrammingContest/programmingcontestReg.ejs",{error:req.flash('error'),user:current_user});
};

const postPcRegister = async(req,res) =>{
    const{teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body;

    let regFee =500;
    
    const total = regFee;
    const paid = 0;
    const selected = false;
    let error="";

   const team = await programmingContest.findOne({teamname:teamname,coachname:coachname});
        if(team){
            

            error="Team with this name and Coach name already exists"
             
            req.flash('error',error)
            res.redirect("/pc/register");
        }
        else{

            try{
                const team = await programmingContest.create({
                teamname,
                institution,
                coachname,
                coachcontact,
                coachemail,
                coachtshirt,
                leadername,
                leadercontact,
                leaderemail,
                leadertshirt,
                member1name,
                member1contact,
                member1email,
                member1tshirt,
                member2name,
                member2contact,
                member2email,
                member2tshirt,
                paid,
                total,
                selected,
                });
                error='Team has been registered successfully!!'
                req.flash('error',error)

                const sendmail = `
                <p>Hello Team ${teamname}!<br> Your Team have been registered in Programming Contest Event successfully!</p>
                <h4>Check Your Teams's Details </h4>
                <ul>
                    <li>Team Name : ${teamname}</li>
                    <li>Institution : ${institution}</li>
                    <li>Coach Name  : ${coachname}</li>
                    <li>Coach Email : ${coachemail}</li>
                    <li>Coach Contact : ${coachcontact}</li>
                    <li>Coach T-shirt size : ${coachtshirt}</li>
                    <li>Team Leader : ${leadername}</li>
                    <li>Leader Contact : ${leadercontact}</li>
                    <li>Leader Email : ${leaderemail}</li>
                    <li>Leader T-shirt size : ${leadertshirt}</li>
                    <li>Team Member1 : ${member1name}</li>
                    <li>Member1 T-shirt size : ${member1tshirt}</li>
                    <li>Team Member2 : ${member2name}</li>
                    <li>Member2 T-shirt size : ${member2tshirt}</li>
                </ul>
                <p><b>For any kind of problem,please contact in Administration.</b></p><br><p><b>Thank You.</b></p>
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
                    to: leaderemail, // list of receivers
                    
                    subject: "Regarding 10th ICT Fest Registration Details", // Subject line
                    text: "Hello Team" +{teamname}+ ".Thank you for your registration in Math Olympiad event.",
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

                res.redirect("/pc/register");
            }catch(error){

                res.redirect("/pc/register");
                console.log(error);
            }
          
        }

};

const getList = async (req,res) =>{
    
    let allTeams =[];
    let error ="";
    programmingContest.find().then((data)=>{
        allTeams=data;
        
        res.render("eventView/ProgrammingContest/programmingContestList.ejs",{
            error:req.flash('error'),
            user:current_user,
            teams:allTeams,
        });
    }).catch((error)=>{
      
        console.log(error),
        
        res.render("eventView/ProgrammingContest/programmingContestList.ejs",{
            error:req.flash('error'),
            user:current_user,
            teams:allTeams,
            
        });
    });
};

const getDelete = (req,res) =>{
    const id  = req.params.id;
    programmingContest.deleteOne({_id:id},(err)=>{
        if(err){

            error='Failed to delete data!'
            req.flash('error',error)

            res.redirect("/pc/list");
        }else{
            error='Data has been deleted successfully!'
            req.flash('error',error)

            res.redirect("/pc/list");
        }
    })
    console.log(id);
};

const getPayment =(req,res) =>{
    const id  = req.params.id;

    programmingContest.findOne({_id:id})
    .then((team)=>{
        team.paid = team.total;
        team
        .save()
        .then(()=>{
            error="Payment completed succesfully"
            req.flash('error',error)

            res.redirect("/pc/list");
        }).catch(()=>{
           error="Data could not be updated"
            req.flash('error',error)

            res.redirect("/pc/list");
        })
        })
};

const getSelected =(req,res) =>{
    const id  = req.params.id;

    programmingContest.findOne({_id:id})
    .then((team)=>{
        team.selected = true;
        team
        .save()
        .then(()=>{
            error="Team has been selected succesfully"
            req.flash('error',error)

            res.redirect("/pc/list");
        }).catch(()=>{
            error="Something went wrong"
            req.flash('error',error)

            res.redirect("/pc/list");
        })
        })
    
};

const postEdit = async (req,res) => {
    
    const{id,teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body;
    console.log(req.body);
    
    programmingContest.findOne({ teamname: teamname, coachname: coachname })
    .then((participant)=>{
        if (participant && participant._id!=id) {
            error = "Team with this name and contact already exists!";
            req.flash("error", error);
            res.redirect("/pc/list");
        }else {
            programmingContest.findOneAndUpdate(
              { _id: id }, 
              {teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt})
              .then((data) => {
                error = "Team Information updated successfully!";
                    req.flash("error", error);
                    res.redirect("/pc/list");
              })
              .catch((e) => {
                console.log(e);
                error = "Failed to update team details";
                res.redirect("/pc/list");
              });
          }
        
        })
    };

module.exports ={getPcRegister,postPcRegister,getList,getDelete,postEdit,getPayment,getSelected};  