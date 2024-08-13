const {featureListService} = require("../services/featureService");

exports.featureList = async(req,res)=>{
    let data = await featureListService(req);
    res.status(200).json(data);
}