const {
  categoryListService,
  subCategoryListService,
  productListService,
  productListByCategoryService,
  productListByKeywordService,
  productDetailsService,
  productListByRemarkService,
  similarProductListService,
  productReviewService,
  createReviewService,
  productBySubCategoryService,
  productByFilterService,
  averageRatingProductService
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

exports.productByCategory = async (req, res) => {
  let data = await productListByCategoryService(req);
  res.status(200).json(data);
};

exports.productBySubCategory = async (req, res) => {
  let data = await productBySubCategoryService(req);
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

exports.productByRemark = async(req,res)=>{
  let data = await productListByRemarkService(req);
  res.status(200).json(data);
}

exports.similarProduct = async(req,res)=>{
  let data = await similarProductListService(req);
  res.status(200).json(data);
}

exports.productReview=async(req,res)=>{
  let data = await productReviewService(req);
  res.status(200).json(data);
}

exports.createReview=async(req,res)=>{
  let data = await createReviewService(req);
  res.status(200).json(data);
}

exports.productByFilter = async(req,res)=>{
  let data = await productByFilterService(req);
  res.status(200).json(data);
}

exports.avgProductRating = async(req,res)=>{
  let data = await averageRatingProductService(req);
  res.status(200).json(data);
}

