const userModel = require("../models/userModel");
const emailSend = require("../utility/emailUtility");
const otpModel = require("../models/otpModel");
const { encodeToken } = require("../utility/tokenUtility");

const userRegistrationService =async (req)=>{
 try{
    let reqBody = req.body;
    let email = reqBody['email'];
    let code = Math.round(Math.floor(100000+Math.random()*900000));
    await emailSend(email,"User Verification",`Your Otp Verification Code is ${code}`);
    await otpModel.create({email:email,otp:code});
    let data = await userModel.create(reqBody);
    return ({status:"success", data:data});
 }
 catch(e){
    return ({status:"fail", data:e});
 }
}

const userVerificationService = async(req)=>{
   try{
      console.log(req.params)
      let otp = req.params['otp'];
      let email = req.params['email'];
      let status = 0;
      let updatedStatus =1;
      let otpCount = await otpModel.aggregate([{$match:{email:email,otp:otp}}]);
      console.log(req)
      if(otpCount.length === 1){
         let data = await otpModel.updateOne({email:email,otp:otp,status:status},
            {email:email,otp:otp,status:updatedStatus});
      return {status:"success",data:data};      
      }
   }
   catch(e){
      return {status:"fail",data:e};
   }
}

const loginService = async(req)=>{
   try{
     let email = req.body['email'];
     let password = req.body['password'];
     let userCount = await userModel.aggregate([{$match:{email:email,password:password}}]);
     if(userCount.length === 1){
       let user_id = await userModel.find({email:email}).select("_id");
       let userID = user_id[0]['_id'];
       let role = userCount[0]['role'];
       let token = await encodeToken(email,userID.toString(),role);
       return {status:"success",data:token,message:"valid user!"}
     }
   }
   catch(e){
     return {status:"fail",data:e};
   }
}



module.exports = {userRegistrationService,userVerificationService,loginService}