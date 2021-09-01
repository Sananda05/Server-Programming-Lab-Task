const mongoose=require('mongoose')

const PCSchema=new mongoose.Schema({
    teamname:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    },
    coachname:{
        type:String,
        required:true
    },
    coachcontact:{
        type:String,
        required:true
    },
    coachemail:{
        type:String,
        required:false
    },
    coachtshirt:{
        type:String,
        required:true
    },
    leadername:{
        type:String,
        required:true
    },
    leadercontact:{
        type:String,
        required:true
    },
    leaderemail:{
        type:String,
        required:false
    },
    leadertshirt:{
        type:String,
        required:true
    },
    member1name:{
        type:String,
        required:true
    },
    member1contact:{
        type:String,
        required:true
    },
    member1email:{
        type:String,
        required:false
    },
    member1tshirt:{
        type:String,
        required:true
    },
    member2name:{
        type:String,
        required:true
    },
    member2contact:{
        type:String,
        required:true
    },
    member2email:{
        type:String,
        required:false
    },
    member2tshirt:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    paid:{
        type:Number,
        required:true
    },
    selected:{
        type:Boolean,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const pContest=mongoose.model('pContest',PCSchema)
module.exports=pContest