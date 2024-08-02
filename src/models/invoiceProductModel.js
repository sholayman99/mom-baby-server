const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    invoiceID:{type:mongoose.Schema.Types.ObjectId,required:true},
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
    qty:{type:String,required:true},
    color:{type:String,required:true},
    size:{type:String,required:true},
    
 
},
{timestamps:true,versionKey:false});

const invoiceProductModel = mongoose.model("invoiceproducts",dataSchema);
module.exports = invoiceProductModel;