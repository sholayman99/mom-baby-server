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
router.get("/userInfo",authVerifyMiddleware,userController.userInfo);
router.post("/updateName",authVerifyMiddleware,userController.updateName)
router.post("/updateMobile",authVerifyMiddleware,userController.updateMobile)
router.post("/updateAvatar",authVerifyMiddleware,userController.updateAvatar)





module.exports = router;