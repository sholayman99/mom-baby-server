const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    subCategoryName:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const subCategoryModel = mongoose.model("subcategories",dataSchema);
module.exports = subCategoryModel;