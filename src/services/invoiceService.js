const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const productModel =require("../models/productModel");
const cartModel = require("../models/cartModel");

const axios = require("axios");
const formData = require("form-data");


const createInvoiceService = async(req)=>{
    try{
         let userID = new ObjectId(req.headers['userID']);
         let cus_email = req.headers['email'];
         let matchStage = {$match:{userID:userID}};
         let joinWithproductStage ={$lookup:{
            from:"products",localField:"productID",foreignField:"_id",as:"product"
         }};
         let unwindProduuctStage ={$unwind:"$product"};
         let cartProducts = await cartModel.aggregate([matchStage,joinWithproductStage,unwindProduuctStage])
         let totalAmout = 0;
          cartProducts.forEach((element) => {
            let price;
            if(element['product']['discount']){
                price = parseFloat(element['product']['discountPrice'])
            }
            else{
                price = parseFloat(element['product']['price'] )
            }
            totalAmout += parseFloat(element['qty'])*price;
        });
        return {status:"success" , data:totalAmout}
    }
    catch(e){
        return {status:"fail" , data:e.message}
    }
}


module.exports = {createInvoiceService}