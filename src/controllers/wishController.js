const {SaveWishService,deleteWishService,wishListService} = require("../services/wishService");


exports.saveWish = async(req,res)=>{
   let data = await SaveWishService(req);
   res.status(200).json(data);
}


exports.deleteWish = async(req,res)=>{
    let data = await deleteWishService(req);
   res.status(200).json(data);
}



exports.wishList = async(req,res)=>{
    let data = await wishListService(req);
   res.status(200).json(data);
}