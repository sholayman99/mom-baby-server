const {userRegistrationService,userVerificationService} = require("../services/userService")

//create user
exports.userRegistration =async(req,res)=>{
  let data = await userRegistrationService(req);
  res.status(200).json(data);
}

//login user
exports.userVerify =async(req,res)=>{
let data = await userVerificationService(req);
res.status(200).json(data);
}


//login user
exports.userLogin =(req,res)=>{

}