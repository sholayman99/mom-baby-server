const { decodeToken } = require("../utility/tokenUtility");

module.exports = (req,res,next)=>{
    let token = req.headers['token'];
    if(!token){
        token = req.cookies['token'];
    }
    let decoded = decodeToken(token);
    if(decoded.role === 'admin'){
        req.headers.role =decoded.role;
       next()
     }
     else{
        return res.status(401).json({status:"fail" , message:"unauthorized"});
     }
}