const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const productModel = require("../models/productModel");

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
    let matchStage = { $match:{_id: productID } };
    let joinWithDetails = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField:"productID",
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

module.exports = {
  categoryListService,
  subCategoryListService,
  productListService,
  productListByCategoryService,
  productListByKeywordService,
  productDetailsService
};
