const {createInvoiceService,paymentSuccessService,paymentFailService,
  paymentCancelService,paymentIpnService,invoiceListService,invoiceProductListService} = require("../services/invoiceService");


exports.createInvoice = async(req,res)=>{
  let data = await createInvoiceService(req);
  res.status(200).json(data);
}

exports.paymentSuccess = async(req,res)=>{
  let data = await paymentSuccessService(req);
  res.status(200).json(data);
}

exports.paymentFail = async(req,res)=>{
  let data = await paymentFailService(req);
  res.status(200).json(data);
}

exports.paymentCancel = async(req,res)=>{
  let data = await paymentCancelService(req);
  res.status(200).json(data);
}

exports.paymentIpn = async(req,res)=>{
  let data = await paymentIpnService(req);
  res.status(200).json(data);
}

exports.invoiceList = async(req,res)=>{
  let data = await invoiceListService(req);
  res.status(200).json(data);
}

exports.invoiceProductList = async(req,res)=>{
  let data = await invoiceProductListService(req);
  res.status(200).json(data);
}