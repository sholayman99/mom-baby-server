const productModel = require("../models/productModel");
const productDetailsModel = require("../models/productDetailsModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createProductService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let reqBody = req.body;
      let data = await productModel.create(reqBody);
      return {
        status: "success",
        data: data,
        message: "product create successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const createProductDetailsService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let reqBody = req.body;
      let data = await productDetailsModel.create(reqBody);
      return {
        status: "success",
        data: data,
        message: "product details create successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const updateProductService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let id = req.params.productID;
      let reqBody = req.body;
      let data = await productModel.updateOne({ _id: id }, reqBody, {
        $upsert: true,
      });
      return {
        status: "success",
        data: data,
        message: "product update successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const updateProductDetailsService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let id = req.params.detailID;
      let reqBody = req.body;
      let data = await productDetailsModel.updateOne({ _id: id }, reqBody, {
        $upsert: true,
      });
      return {
        status: "success",
        data: data,
        message: "product details update successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const deleteProductService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let id = req.params.productID;
      let data = await productModel.deleteOne({ _id: id });
      return {
        status: "success",
        data: data,
        message: "product delete successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const createAdminService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let id = req.params.userID;
      let data = await userModel.updateOne(
        { _id: id },
        { $set: { role: "admin" } }
      );
      return {
        status: "success",
        data: data,
        message: "admin create successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

const removeUserService = async (req) => {
  try {
    let admin = req.headers["role"];
    if (admin) {
      let id = req.params.userID;
      let data = await userModel.deleteOne({ _id: id });
      return {
        status: "success",
        data: data,
        message: "admin remove successfully!",
      };
    }
  } catch (e) {
    return {
      status: "success",
      data: e.message,
      message: "something went wrong!",
    };
  }
};

module.exports = {
  createProductService,
  createProductDetailsService,
  updateProductService,
  updateProductDetailsService,
  deleteProductService,
  createAdminService,
  removeUserService,
};
