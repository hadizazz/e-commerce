// import Product from "../models/productModels.js";
const db = require("../models");
const Transaction = db.transaction;



const createTransaction = async (req, res) => {

  let info = {
    user_id: req.body.user_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone_number: req.body.phone_number,
    province: req.body.province,
    city: req.body.city,
    district: req.body.district,
    zip: req.body.zip,
    fullAddress: req.body.fullAddress,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    subTotal: req.body.subTotal,
    total: req.body.total,
    shipping: req.body.shipping,
    shippingPrice: req.body.shippingPrice,
    status: req.body.status,
    price: req.body.price
  }
  const transaction = await Transaction.create(info);
  res.status(200).send(transaction);
};

module.exports = {
    createTransaction
};
