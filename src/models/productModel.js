const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    discount:{type:String,required:true},
    discountPrice:{type:String,required:true},
    categoryID:{type:mongoose.Schema.Types.ObjectId,required:true},
    subCategoryID:{type:mongoose.Schema.Types.ObjectId,required:true},
    stock:{type:String,required:true},
    countryOfOrigin:{type:String,required:true},
    remark:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const productModel = mongoose.model("products",dataSchema);
module.exports = productModel;