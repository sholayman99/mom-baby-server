const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    status:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const otpModel = mongoose.model("otps",dataSchema);
module.exports = otpModel;