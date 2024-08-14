const {createInvoiceService} = require("../services/invoiceService");


exports.createInvoice = async(req,res)=>{
  let data = await createInvoiceService(req);
  res.status(200).json(data);
}