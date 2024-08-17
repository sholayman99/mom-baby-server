const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cartModel = require("../models/cartModel");
const profileModel = require("../models/profileModel");
const invoiceModel = require("../models/invoiceModel");
const invoiceProductModel = require("../models/invoiceProductModel");
const paymentSettingModel = require("../models/paymentSettingModel");
const FormData = require("form-data");

const axios = require("axios");


const createInvoiceService = async (req) => {
  try {
    let userID = new ObjectId(req.headers["userID"]);
    let cus_email = req.headers["email"];
    let matchStage = { $match: { userID: userID } };
    let paymentSetting = await paymentSettingModel.find({});
    let joinWithproductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProduuctStage = { $unwind: "$product" };
    let cartProducts = await cartModel.aggregate([
      matchStage,
      joinWithproductStage,
      unwindProduuctStage,
    ]);
    let totalAmout = 0;
    cartProducts.forEach((element) => {
      let price;
      if (element["product"]["discount"]) {
        price = parseFloat(element["product"]["discountPrice"]);
      } else {
        price = parseFloat(element["product"]["price"]);
      }
      totalAmout += parseFloat(element["qty"]) * price;
    });
    let vat = totalAmout * 0.05; //5% vat
    let payable = totalAmout + vat;

    //profile details
    let profile = await profileModel.aggregate([matchStage]);
    let cus_details = `Name:${profile[0]["cus_name"]},Email:${cus_email},Address:${profile[0]["cus_add"]},Phone:${profile[0]["cus_phone"]}`;
    let ship_details = `Name:${profile[0]["ship_name"]},City:${profile[0]["ship_city"]},Address:${profile[0]["ship_add"]},Phone:${profile[0]["ship_phone"]}`;
    let deliveryStatus = "pending";
    let paymentStatus = "pending";
    let val_id = 0;
    let tran_id = Math.floor(10000000 + Math.random() * 90000000);

    //invoice creation
    let createInvoice = await invoiceModel.create({
      userID: userID,
      payable: payable,
      cus_details: cus_details,
      ship_details: ship_details,
      tran_id: tran_id,
      val_id: val_id,
      delivery_status: deliveryStatus,
      payment_status: paymentStatus,
      total: totalAmout,
      vat: vat,
    });

    let invoiceID = createInvoice["_id"];
    cartProducts.forEach(async (element) => {
      await invoiceProductModel.create({
        userID: userID,
        invoiceID: invoiceID,
        productID: element["productID"],
        qty: element["qty"],
        color: element["color"],
        size: element["size"],
        price: element["product"]["discount"]
          ? element["product"]["discountPrice"]
          : element["product"]["price"],
      });
    });
    await cartModel.deleteMany({ userID: userID });
    //prepare for SSLComerz
    let form = new FormData();
    //paymentsettings
    form.append('store_id', `${process.env.STORE_ID}`);
    form.append('store_passwd',`${process.env.STORE_PASS}`);
    form.append('total_amount',payable.toString());
    form.append('currency',await paymentSetting[0]?.currency);
    form.append('tran_id',tran_id);
    form.append('success_url',await paymentSetting[0]?.success_url);
    form.append('fail_url',await paymentSetting[0]?.fail_url);
    form.append('cancel_url',await paymentSetting[0]?.cancel_url);
    form.append('ipn_url',await paymentSetting[0]?.ipn_url);
    //customer details
    form.append('cus_name',profile[0]?.cus_name);
    form.append('cus_email',cus_email);
    form.append('cus_add1',profile[0]?.cus_add);
    form.append('cus_add2',profile[0]?.cus_add);
    form.append('cus_city',profile[0]?.cus_city);
    form.append('cus_state',profile[0]?.cus_state);
    form.append('cus_postcode',profile[0]?.cus_postcode);
    form.append('cus_country',profile[0]?.cus_country);
    form.append('cus_phone',profile[0]?.cus_phone);
    //ship_details
    form.append('shipping_method' ,'YES')
    form.append('ship_name',profile[0]?.ship_name);
    form.append('ship_add1',profile[0]?.ship_add);
    form.append('ship_add2',profile[0]?.ship_add);
    form.append('ship_city',profile[0]?.ship_city);
    form.append('ship_phone',profile[0]?.ship_phone);
    form.append('ship_country',profile[0]?.ship_country);
    form.append('ship_postcode',profile[0]?.ship_postcode);
    //product details
    form.append('product_name',"According to Invoice");
    form.append('product_category',"According to Invoice");
    form.append('product_profile',"According to Invoice");
    form.append('product_amount',"According to Invoice");

    

    let SSL = await axios.post("https://sandbox.sslcommerz.com/gwprocess/v3/api.php",form);

    return { status: "success", data:SSL.data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

module.exports = { createInvoiceService };
