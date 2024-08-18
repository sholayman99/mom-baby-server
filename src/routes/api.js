const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const featureController = require("../controllers/featureController");
const wishController = require("../controllers/wishController");
const invoiceController = require("../controllers/invoiceController");
const adminController = require("../controllers/adminController");

//middlewares
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");
const adminVerifyMiddlewre = require("../middlewares/adminVerifyMiddlewre");

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
router.get("/productByCategory/:pageNo/:perPage/:categoryID",productController.productByCategory);
router.get("/productBySubCategory/:pageNo/:perPage/:subCategoryID" , productController.productBySubCategory);
router.get("/productByKeyword/:pageNo/:perPage/:keyword",productController.productByKeyword);
router.get('/productDetails/:productID' ,authVerifyMiddleware, productController.productDetails);
router.get('/avgProductRating/:productID' ,authVerifyMiddleware, productController.avgProductRating);
router.get('/productByRemark/:pageNo/:perPage/:remark',productController.productByRemark);
router.get('/similarProduct/:categoryID' , productController.similarProduct);
router.get("/productReview/:productID" , productController.productReview);
router.post('/createReview' , authVerifyMiddleware , productController.createReview);
router.post('/productByFilter/:pageNo/:perPage',productController.productByFilter);

//feature
router.get('/featureList' , featureController.featureList);

//cart
router.post('/createCart',authVerifyMiddleware,cartController.createCart);
router.post('/updateCart/:cartID',authVerifyMiddleware,cartController.updateCart);
router.get('/deleteCart/:cartID',authVerifyMiddleware,cartController.deleteCart);
router.get('/cartList',authVerifyMiddleware,cartController.cartList);

//wish
router.post('/saveWish',authVerifyMiddleware, wishController.saveWish);
router.get('/deleteWish/:wishID', authVerifyMiddleware, wishController.deleteWish);
router.get('/wishList',authVerifyMiddleware, wishController.wishList);

//invoice
router.post('/createInvoice',authVerifyMiddleware,invoiceController.createInvoice);
router.post('/paymentSuccess/:txtID', invoiceController.paymentSuccess);
router.post('/paymentFail/:txtID',  invoiceController.paymentFail);
router.post('/paymentCancel/:txtID',  invoiceController.paymentCancel);
router.post('/paymentIPN/:txtID', invoiceController.paymentIpn);
router.get('/invoiceList',authVerifyMiddleware,invoiceController.invoiceList)
router.get('/invoiceProductList/:invoiceID',authVerifyMiddleware,invoiceController.invoiceProductList)

//admin
router.post('/createProduct',authVerifyMiddleware,adminVerifyMiddlewre,adminController.createProduct);
router.post('/createProductDetails',authVerifyMiddleware,adminVerifyMiddlewre,adminController.createProductDetails);
router.post('/updateProduct/:productID',authVerifyMiddleware,adminVerifyMiddlewre,adminController.updateProduct);
router.post('/updateProductdetails/:detailID',authVerifyMiddleware,adminVerifyMiddlewre,adminController.updateProductdetails);
router.post('/deleteProduct/:productID',authVerifyMiddleware,adminVerifyMiddlewre,adminController.deleteProduct);
router.post('/createAdmin/:userID',authVerifyMiddleware,adminVerifyMiddlewre,adminController.createAdmin);
router.post('/removeUser/:userID',authVerifyMiddleware,adminVerifyMiddlewre,adminController.removeUser);
router.post('/deleteProduct/:productID',authVerifyMiddleware,adminVerifyMiddlewre,adminController.deleteProduct);


module.exports = router;