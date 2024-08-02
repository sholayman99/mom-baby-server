const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
    image1:{type:String,required:true},
    image2:{type:String,required:true},
    image3:{type:String,required:true},
    desc:{type:String,required:true},
    color:{type:String,required:true},
    size:{type:String,required:true},
},
{timestamps:true,versionKey:false});

const productDetailsModel = mongoose.model("productdetails",dataSchema);
module.exports = productDetailsModel;