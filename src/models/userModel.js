const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    fullName:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:String,required:true},
    role:{type:String,required:true,default:"user"},
    avatar:{type:String},
},
{timestamps:true,versionKey:false});

const userModel = mongoose.model("users",dataSchema);
module.exports = userModel;