const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username :{type : String, required : true , unique : true},
        email : {type : String, required : true , unique : true},
        gender : {type : String, required : true},
        pass : {type : String , required : true}
    },
    {collection : 'users'}
)

const model = mongoose.model('User_Schema', UserSchema);

module.exports= model;