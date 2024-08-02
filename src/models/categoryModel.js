const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    categoryName:{type:String,required:true},
    image:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const categoryModel = mongoose.model("categories",dataSchema);
module.exports = categoryModel;