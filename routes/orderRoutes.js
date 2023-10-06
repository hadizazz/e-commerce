// const router = require ('express').Router();
// const order = require('../controllers/orderCtr.js')

// router.get('/allorder', order.getAllOrder)
// router.post('/createorder', order.createOrder)
// router.patch('/notifikasi', order.updateOrder)
// router.get('/status/:order_id', order.getOrderById)

// module.exports = router;

var express = require("express");
var router = express.Router();
const db = require("../models");
const Order = db.order;
const midtransClient = require("midtrans-client");
const { route } = require(".");

var coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-3jM-KDoycjZgp8RfWo_2U_X_",
  clientKey: "SB-Mid-client-ASgnhNRgypZh4Jii",
});

var snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-3jM-KDoycjZgp8RfWo_2U_X_",
  clientKey: "SB-Mid-client-ASgnhNRgypZh4Jii",
});
router.get("/all", function (req, res, next) {
  Order.findAll()
    .then((data) => {
      var tampilData = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          email: req.body.email,
          response_midtrans: JSON.parse(item.response_midtrans),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      res.json({
        status: true,
        pesan: "Berhasil Tampil",
        data: tampilData,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        pesan: "Gagal tampil: " + err.message,
        data: [],
      });
    });
});

router.post("/charge", function (req, res, next) {
  let parameterTransaction = {
    transaction_details: {
      order_id: req.body.transaction_details.order_id,
      gross_amount: req.body.transaction_details.gross_amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: req.body.name,
      last_name: req.body.name,
      email: req.body.email,
      phone: "08111222333",
    },
  };
  snap
    .createTransaction(parameterTransaction)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);
      var dataOrder = {
        id: req.body.transaction_details.order_id,
        name: req.body.name,
        email: req.body.email,
        response_midtrans: JSON.stringify(transaction),
      };
      Order.create(dataOrder)
        .then((data) => {
          res.json({
            status: true,
            pesan: "Berhasil Order",
            data: data,
            token: transactionToken,
          });
        })
        .catch((err) => {
          res.json({
            status: false,
            pesan: err.message,
            data: [],
          });
        });
    })
    .catch((e) => {
      res.json({
        status: false,
        pesan: "Gagal order: " + e.message,
        data: [],
      });
    });
});

router.post("/notifikasi", function (req, res, next) {
  coreApi.transaction.notification(req.body).then((statusResponse) => {
    let orderId = statusResponse.order_id;
    let responseMidtrans = JSON.stringify(statusResponse);
    Order.update(
      { response_midtrans: responseMidtrans },
      {
        where: { id: orderId },
      }
    )
      .then(() => {
        res.json({
          status: true,
          pesan: "Berhasil Notifikasi",
          data: [],
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          pesan: "Gagal Notifikasi: " + err.message,
          data: [],
        });
      });
  });
});

router.get("/status/:order_id", function (req, res, next) {
  coreApi.transaction.status(req.params.order_id).then((statusResponse) => {
    let responseMidtrans = JSON.stringify(statusResponse);
    Order.update(
      { response_midtrans: responseMidtrans },
      {
        where: { id: req.params.order_id },
      }
    )
      .then(() => {
        res.json({
          status: true,
          pesan: "Berhasil cek status",
          data: statusResponse,
        });
      })
      .catch((err) => {
        res.json({
          status: false,
          pesan: "Gagal cek status: " + err.message,
          data: [],
        });
      });
  });
});

module.exports = router;
