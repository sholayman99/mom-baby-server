const featureModel = require("../models/featureModel");

const featureListService =async(req)=>{
    try{
      let data = await featureModel.aggregate([{$match:{}}]);
      return {status:"success",data:data};
    }
    catch(e){
        return {status:"fail",data:e.message};
    }
}

module.exports ={featureListService}