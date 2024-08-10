const {
  categoryListService,
  subCategoryListService,
  productListService,
  productListByCategoryService,
  productListByKeywordService,
  productDetailsService
} = require("../services/productService");

exports.categoryList = async (req, res) => {
  let data = await categoryListService();
  res.status(200).json(data);
};

exports.subCategoryList = async (req, res) => {
  let data = await subCategoryListService();
  res.status(200).json(data);
};

exports.productList = async (req, res) => {
  let data = await productListService(req);
  res.status(200).json(data);
};

exports.productBycategory = async (req, res) => {
  let data = await productListByCategoryService(req);
  res.status(200).json(data);
};

exports.productByKeyword = async (req, res) => {
  let data = await productListByKeywordService(req);
  res.status(200).json(data);
};

exports.productDetails = async(req,res)=>{
    let data = await productDetailsService(req);
    res.status(200).json(data);
}
