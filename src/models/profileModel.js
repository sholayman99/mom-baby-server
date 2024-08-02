const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    cus_add:{type:String,required:true},
    cus_city:{type:String,required:true},
    cus_country:{type:String,required:true},
    cus_name:{type:String,required:true},
    cus_phone:{type:String,required:true},
    cus_postcode:{type:String,required:true},
    ship_add:{type:String,required:true},
    ship_city:{type:String,required:true},
    ship_country:{type:String,required:true},
    ship_name:{type:String,required:true},
    ship_phone:{type:String,required:true},
    ship_postcode:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const profileModel = mongoose.model("profiles",dataSchema);
module.exports = profileModel;