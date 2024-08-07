const {userRegistrationService,userVerificationService,loginService,updatePassOtpService,
  resetPassService,userInfoService,updateNameService,updateMobileService,updateAvatarService
} = require("../services/userService")

//create user
exports.userRegistration =async(req,res)=>{
  let data = await userRegistrationService(req);
  res.status(200).json(data);
}

//user verification
exports.userVerify =async(req,res)=>{
let data = await userVerificationService(req);
res.status(200).json(data);
}


//login user
exports.userLogin =async(req,res)=>{
  let data = await loginService(req);
  if(data['message'] !== "valid user!"){
   res.status(200).json(data);
  }else{
   let cookieOption = {expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),httpOnly:false};
   res.cookie("token",data['data'],cookieOption);
   res.status(200).json(data);
}};

//user logout
exports.logout= async(req,res)=>{
  let cookieOption = {expires: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),httpOnly:false};
  res.cookie("token","",cookieOption);
  res.status(200).json({status:"success" , message:"logout successfull"});
}

exports.updatePassOtp = async(req,res)=>{
  let data = await updatePassOtpService(req);
  res.status(200).json(data);
}

exports.resetPass=async(req,res)=>{
  let data = await resetPassService(req);
  res.status(200).json(data);
}

exports.userInfo = async(req,res)=>{
  let data = await userInfoService(req);
  res.status(200).json(data);
}

exports.updateMobile = async(req,res)=>{
  let data = await updateMobileService(req);
  res.status(200).json(data);
}

exports.updateName = async(req,res)=>{
  let data = await updateNameService(req);
  res.status(200).json(data);
}

exports.updateAvatar = async(req,res)=>{
  let data = await updateAvatarService(req);
  res.status(200).json(data);
}