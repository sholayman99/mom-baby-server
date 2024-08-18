const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const sliderModel = require("../models/sliderModel");

const categoryListService = async () => {
  try {
    let data = await categoryModel.aggregate([{ $match: {} }]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
};

const subCategoryListService = async () => {
  try {
    let data = await subCategoryModel.aggregate([{ $match: {} }]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
};

const sliderList = async(req)=>{
  try {
    let data = await sliderModel.aggregate([{ $match:{}}]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
}

const productListService = async (req) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    let matchStage = { $match: {} };
    let skipRowStage = { $skip: skipRow };
    let limitStage = { $limit: perPage };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let projectStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        subCategoryID: 0,
        categoryID: 0,
        stock: 0,
        remark: 0,
        "subCategory._id": 0,
        "category._id": 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      skipRowStage,
      limitStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
      projectStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const productListByCategoryService = async (req) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    let categoryID = new ObjectId(req.params["categoryID"]);
    let matchStage = { $match: { categoryID: categoryID } };
    let skipRowStage = { $skip: skipRow };
    let limitStage = { $limit: perPage };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let projectStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        subCategoryID: 0,
        categoryID: 0,
        stock: 0,
        remark: 0,
        "subCategory._id": 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      skipRowStage,
      limitStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
      projectStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const productBySubCategoryService = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    let subCategoryID = new ObjectId(req.params["subCategoryID"]);
    let matchStage = { $match: { subCategoryID: subCategoryID } };
    let skipRowStage = { $skip: skipRow };
    let limitStage = { $limit: perPage };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        subCategoryID: 0,
        categoryID: 0,
        stock: 0,
        remark: 0,
        "subCategory._id": 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      skipRowStage,
      limitStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      projectStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const productListByKeywordService = async (req) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    let keyword = req.params["keyword"];
    let searchRegex = { $regex: keyword, $options: "i" };
    let searchParams = [
      { title: searchRegex },
      { countryOfOrigin: searchRegex },
    ];
    let searchQuery = { $or: searchParams };
    let matchStage = { $match: searchQuery };
    let skipRowStage = { $skip: skipRow };
    let limitStage = { $limit: perPage };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let projectStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        subCategoryID: 0,
        categoryID: 0,
        stock: 0,
        remark: 0,
        "subCategory._id": 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      skipRowStage,
      limitStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
      projectStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const productDetailsService = async (req) => {
  try {
    let productID = new ObjectId(req.params["productID"]);
    let matchStage = { $match: { _id: productID } };
    let joinWithDetails = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    let unwindDetailsStage = { $unwind: "$details" };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let data = await productModel.aggregate([
      matchStage,
      joinWithDetails,
      unwindDetailsStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const productListByRemarkService = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    let remark = req.params["remark"];
    let matchStage = { $match: { remark: remark } };
    let skipRowStage = { $skip: skipRow };
    let limitStage = { $limit: perPage };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let data = await productModel.aggregate([
      matchStage,
      skipRowStage,
      limitStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const similarProductListService = async (req) => {
  try {
    let categoryID = new ObjectId(req.params["categoryID"]);
    let matchStage = { $match: { categoryID: categoryID } };
    let limitStage = { $limit: 20 };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let projectStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        subCategoryID: 0,
        categoryID: 0,
        stock: 0,
        remark: 0,
        "subCategory._id": 0,
        "category._id": 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      limitStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
      projectStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {}
};

const productReviewService = async (req) => {
  try {
    let productID = new ObjectId(req.params["productID"]);
    let matchStage = { $match: { productID: productID } };
    let joinProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let unwindProfileStage = { $unwind: "$profile" };
    let projectionStage = {
      $project: { comment: 1, rating: 1, "profile.cus_name": 1 },
    };
    let data = await reviewModel.aggregate([
      matchStage,
      joinProfileStage,
      unwindProfileStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const createReviewService = async (req) => {
  try {
    let userID = req.headers["userID"];
    let reqBody = req.body;
    reqBody.userID = userID;
    let data = await reviewModel.create(reqBody);
    return {
      status: "success",
      message: "review created successfully",
      data: data,
    };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const productByFilterService = async (req) => {
  try {
    let matchConditions = {};
    if (req.body["categoryID"]) {
      matchConditions.categoryID = new ObjectId(req.body["categoryID"]);
    }
    if (req.body["subCategoryID"]) {
      matchConditions.subCategoryID = new ObjectId(req.body["subCategoryID"]);
    }
    let matchStage = { $match: matchConditions };
    let addFieldStage = {
      $addFields: { numericPrice: { $toInt: "$price" } },
    };
    let priceMin = parseInt(req.body["priceMin"]);
    let priceMax = parseInt(req.body["priceMax"]);
    let priceConditions = {};
    if (!isNaN(priceMin)) {
      priceConditions["numericPrice"] = { $gte: priceMin };
    }
    if (!isNaN(priceMax)) {
      priceConditions["numericPrice"] = {
        ...(priceConditions["numericPrice"] || {}),
        $lte: priceMax,
      };
    }
    let priceMatchStage = { $match: priceConditions };
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    let skipRowStage = { $skip: skipRow };
    let limitStage = { $limit: perPage };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let projectStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        subCategoryID: 0,
        categoryID: 0,
        stock: 0,
        remark: 0,
        "subCategory._id": 0,
        "category._id": 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      addFieldStage,
      priceMatchStage,
      skipRowStage,
      limitStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      joinWithSubCategoryStage,
      unwindSubCategoryStage,
      projectStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const averageRatingProductService = async(req)=>{
 try{
  let productID = new ObjectId(req.params.productID);
  let matchStage = {$match:{productID:productID}};
  let groupByStage ={$group:{
    _id:"",
    avgRating:{$avg:"$rating"}
  }};
  let data = await reviewModel.aggregate([matchStage,groupByStage]);
  return {status:"success" , data:data};
 }
 catch(e){
  return {status:"fail" , data:e.message};
 }
}

module.exports = {
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
};
