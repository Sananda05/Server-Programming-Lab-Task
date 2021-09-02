const mongoose = require('mongoose');

const MoSchema = new mongoose.Schema(
    {
        name :{type : String, required : true },
        category :{type : String, required : true },
        contact :{type : String, required : true },
        email : {type : String, required : false},
        institution :{type : String, required : true },
        total :{type : Number, required : true },
        paid :{type : Number, required : true },
        selected :{type : Boolean, required : true },
        tshirt :{type : String, required : true },
        hashedId:{type:String,required:false},
        date :{type:Date, default:Date.now},
        
    });

const Matholympiad = mongoose.model("MathOlympiad", MoSchema);
module.exports = Matholympiad;
