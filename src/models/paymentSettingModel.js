const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    currency:{type:String,required:true},
    success_url:{type:String,required:true},
    fail_url:{type:String,required:true},
    cancel_url:{type:String,required:true},
    ipn_url:{type:String,required:true},
    init_url:{type:String,required:true},
},
{timestamps:true,versionKey:false});

const paymentSettingModel = mongoose.model("paymentsettings",dataSchema);
module.exports = paymentSettingModel;