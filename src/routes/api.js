const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controllers/userController");

//middlewares
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");


router.post("/registration" , userController.userRegistration);
router.get("/userVerify/:email/:otp",userController.userVerify);
router.post('/login' , userController.userLogin);
router.get("/updatePassOtp" , authVerifyMiddleware , userController.updatePassOtp);
router.post('/resetPass/:otp',authVerifyMiddleware,userController.resetPass);




module.exports = router;