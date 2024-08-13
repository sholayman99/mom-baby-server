const {
  createCartService,
  updateCartService,
  deleteCartService,
  cartListService,
} = require("../services/cartService");


exports.createCart = async(req,res)=>{
 let data = await createCartService(req);
 res.status(200).json(data);
}

exports.updateCart = async(req,res)=>{
    let data = await updateCartService(req);
    res.status(200).json(data);
   }

   exports.deleteCart = async(req,res)=>{
    let data = await deleteCartService(req);
    res.status(200).json(data);
   }

   exports.cartList = async(req,res)=>{
    let data = await cartListService(req);
    res.status(200).json(data);
   }