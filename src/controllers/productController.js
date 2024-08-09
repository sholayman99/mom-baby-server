const {categoryListService,subCategoryListService,productListService} = require("../services/productService");

exports.categoryList = async(req,res)=>{
    let data = await categoryListService();
    res.status(200).json(data);
}

exports.subCategoryList = async(req,res)=>{
    let data = await subCategoryListService();
    res.status(200).json(data);
}

exports.productList = async(req,res)=>{
    let data = await productListService(req);
    res.status(200).json(data);
}