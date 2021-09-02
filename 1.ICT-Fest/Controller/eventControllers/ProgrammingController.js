var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

const programmingContest = require("../../model/eventsModel/programmingModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");



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
    let hashedId="pass";
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
                hashedId,
                });
                error='Team has been registered successfully!!'
                req.flash('error',error)

                // generating unique code for email

                const str =(team._id).toString()
                
                const secret = "shhh it's a secret";

                // create a sha-256 hasher
                const sha256Hasher = crypto.createHmac("sha256", secret);

                const hash = sha256Hasher.update(str).digest("hex");

                console.log(hash);

                tid= team._id

                programmingContest.findOne({_id:tid})
                .then((participant)=>{
                    participant.hashedId = hash;
                    participant
                    .save()
                    .then(()=>{
                        console.log("Done")
                       
                    }).catch(()=>{
                        console.log("Something went wrong")
                    })
                    })


                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS, 
                    },
                });

                let participantInfo=[
                    {name: coachname, email:coachemail},
                    {name: leadername, email:leaderemail},
                    {name: member1name, email:member1email},
                    {name: member2name, email:member2email},
                ];

                participantInfo.forEach((p)=>{

                    const mailDetails ={

                        from: 'sanandazohora@gmail.com', // sender address
                        to: p.email,// list of receivers
                        subject: "Regarding 10th ICT Fest Registration.", // Subject line
                        //text: `Hello ${p.name},Thank you and your team ${teamname} for registering for the 10th ICT Programming Contest.`,
                        html: `<p>Hello ${p.name},<br>Thank you and your team <b> ${teamname} </b> for registering for the 10th ICT Fest <b>Programming Contest</b><p>
                               <h5>Check Your Team's ID </h5>
                               <ul>
                               <li><b> Team ID </b>: ${hash}</li>
                               </ul>
                               <p>For any kind of support do reach out to the following contacts</p>
                               <ul>
                               <li> Sananda: +8801776451545 </li>
                               <li> Fahim Abrar: +8801776451545 </li>
                               </ul>
                               <p>Regards</p></br>
                               <p>ICT Fest 2019</p>
                               `
                    }; 

                      // send mail with defined transport object
                    let info =transporter.sendMail(mailDetails, function(err,data){
                    
                        if(err) {
                            console.log(err);
                        } else {
                            error="Confirmantion E-mail has been sent."
                            req.flash('error',error)
                            console.log('Email sent successfully');
                        }
                        });

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