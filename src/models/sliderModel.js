const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    image:{type:String,required:true}
},
{timestamps:true,versionKey:false});

const sliderModel = mongoose.model("sliders",dataSchema);
module.exports = sliderModel;