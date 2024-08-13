const wishModel = require("../models/wishModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const SaveWishService = async (req) => {
  try {
    let userID = req.headers["userID"];
    let reqBody = req.body;
    reqBody.userID = userID;
    let data = await wishModel.updateOne(
      reqBody,
      { $set: reqBody },
      { upsert: true }
    );
    return {
      status: "success",
      data: data,
      message: "wish list create successfully",
    };
  } catch {
    return {
      status: "fail",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const deleteWishService = async (req) => {
  try {
    let userID = req.headers["userID"];
    let wishID = req.params["wishID"];
    let data = await wishModel.deleteOne({ userID:userID, _id:wishID });
    return {
      status: "success",
      data: data,
      message: "wish list delete successfully",
    };
  } catch {
    return {
      status: "fail",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const wishListService = async (req) => {
  try {
    let userID = new ObjectId(req.headers["userID"]);
    let matchStage = { $match: { userID: userID } };
    let joinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let joinWithSubCategoryStage = {
      $lookup: {
        from: "subcategories",
        localField: "product.subCategoryID",
        foreignField: "_id",
        as: "subCategory",
      },
    };
    let unwindSubCategoryStage = { $unwind: "$subCategory" };
    let projectStage = {
      $project: {
        _id: 0,
        categoryID: 0,
        brandID: 0,
        "product._id": 0,
        "product.subCategoryID": 0,
        "product.categoryID": 0,
        "subCategory._id": 0,
        "category._id": 0,
      },
    };
    let data = await wishModel.aggregate([
      matchStage,
      joinWithProductStage,
      unwindProductStage,
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


module.exports ={SaveWishService,deleteWishService,wishListService}
