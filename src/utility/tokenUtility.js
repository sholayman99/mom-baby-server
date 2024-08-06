const jwt = require("jsonwebtoken");


exports.encodeToken=(email,userID,role)=>{
    console.log(email,userID)
   let key = "123-secret-xyz";
   let expire = {expiresIn:"72hrs"};
   let payload={email:email,userID:userID,role:role};
   return jwt.sign(payload,key,expire);
}


exports.decodeToken=(token)=>{
    try{
        let key = "123-secret-xyz";
        jwt.verify(token,key);

    }
    catch(e){
         return null;
    }
}