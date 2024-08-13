const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createCartService = async (req) => {
  try {
    let userID = req.headers["userID"];
    let reqBody = req.body;
    reqBody.userID = userID;
    let data = await cartModel.create(reqBody);
    return {
      status: "success",
      data: data,
      message: "created cart successfully",
    };
  } catch (e) {
    return {
      status: "fail",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const updateCartService = async (req) => {
  try {
    let userID = req.headers["userID"];
    let cartID = req.params["cartID"];
    let reqBody = req.body;
    let data = await cartModel.updateOne(
      { _id: cartID, userID: userID },
      { $set: reqBody }
    );
    return {
      status: "success",
      data: data,
      message: "updated cart successfully",
    };
  } catch (e) {
    return {
      status: "fail",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const deleteCartService = async (req) => {
  try {
    let userID = req.headers["userID"];
    let cartID = req.params["cartID"];
    let data = await cartModel.deleteOne({ _id: cartID, userID: userID });
    return {
      status: "success",
      data: data,
      message: "deleted cart successfully",
    };
  } catch (e) {
    return {
      status: "fail",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const cartListService = async (req) => {
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
    let projectStage = {$project:{ "_id":0 ,"categoryID":0,"brandID":0,
      "product._id":0 , "product.subCategoryID":0 ,"product.categoryID":0 ,"subCategory._id":0,
      "category._id":0
  }};
    let data = await cartModel.aggregate([
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

module.exports = {
  createCartService,
  updateCartService,
  deleteCartService,
  cartListService,
};
