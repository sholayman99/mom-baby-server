const {
  createProductService,
  createProductDetailsService,
  updateProductService,
  updateProductDetailsService,
  deleteProductService,
  createAdminService,
  removeUserService,
} = require("../services/adminService");

exports.createProduct = async (req, res) => {
  let data = await createProductService(req);
  res.status(200).json(data);
};

exports.createProductDetails = async (req, res) => {
  let data = await createProductDetailsService(req);
  res.status(200).json(data);
};

exports.updateProduct = async (req, res) => {
  let data = await updateProductService(req);
  res.status(200).json(data);
};

exports.updateProductdetails = async (req, res) => {
  let data = await updateProductDetailsService(req);
  res.status(200).json(data);
};

exports.createAdmin = async (req, res) => {
  let data = await deleteProductService(req);
  res.status(200).json(data);
};

exports.deleteProduct = async (req, res) => {
  let data = await createAdminService(req);
  res.status(200).json(data);
};

exports.removeUser = async (req, res) => {
  let data = await removeUserService(req);
  res.status(200).json(data);
};
