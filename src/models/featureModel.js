const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const featureModel = mongoose.model("features",dataSchema);
module.exports = featureModel;