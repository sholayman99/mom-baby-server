const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

//middlewares
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");

//user
router.post("/registration" , userController.userRegistration);
router.get("/userVerify/:email/:otp",userController.userVerify);
router.post('/login' , userController.userLogin);
router.get("/updatePassOtp" , authVerifyMiddleware , userController.updatePassOtp);
router.post('/resetPass/:otp',authVerifyMiddleware,userController.resetPass);
router.get("/userInfo",authVerifyMiddleware,userController.userInfo);
router.post("/updateName",authVerifyMiddleware,userController.updateName);
router.post("/updateMobile",authVerifyMiddleware,userController.updateMobile);
router.post("/updateAvatar",authVerifyMiddleware,userController.updateAvatar);

//product
router.get("/categoryList" , productController.categoryList);
router.get("/subCategoryList" , productController.subCategoryList);
router.get("/productList/:pageNo/:perPage" , productController.productList);





module.exports = router;