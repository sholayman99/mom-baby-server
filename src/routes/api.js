const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controllers/userController");


router.post("/registration" , userController.userRegistration);
router.get("/userVerify/:email/:otp",userController.userVerify);




module.exports = router;