// const db = require("../models");
// const Order = db.order;
// const midtransClient = require("midtrans-client");

// var coreApi = new midtransClient.CoreApi({
//   isProduction: false,
//   serverKey: "SB-Mid-server-3jM-KDoycjZgp8RfWo_2U_X_",
//   clientKey: "SB-Mid-client-ASgnhNRgypZh4Jii",
// });
// var snap = new midtransClient.Snap({
//   isProduction: false,
//   serverKey: "SB-Mid-server-3jM-KDoycjZgp8RfWo_2U_X_",
//   clientKey: "SB-Mid-client-ASgnhNRgypZh4Jii",
// });

// const getAllOrder = async (req, res, next) => {
//   Order.findAll()
//     .then((data) => {
//       let order = data.map((item) => {
//         return {
//           id: item.id,
//           name: item.name,
//           response_midtrans: JSON.parse(item.response_midtrans),
//           createdAt: item.createdAt,
//           updatedAt: item.updatedAt,
//         };
//       });
//       console.log(item.response_midtrans);
//       res.json(order);
//     })
//     .catch((err) => {
//       res.json({ message: err.message });
//     });
// };

// const createOrder = async (req, res, next) => {
//   let parameterTransaction = {
//     transaction_details: {
//       order_id: req.body.transaction_details.order_id,
//       gross_amount: req.body.transaction_details.gross_amount,
//     },
//     credit_card: {
//       secure: true,
//     },
//     customer_details: {
//       first_name: req.body.name,
//       last_name: req.body.name,
//       email: req.body.email,
//       phone: "08111222333",
//     },
//   };
//   snap
//     .createTransaction(parameterTransaction)
//     .then((transaction) => {
//       // transaction token
//       let transactionToken = transaction.token;
//       console.log("transactionToken:", transactionToken);
//       var dataOrder = {
//         id: req.body.transaction_details.order_id,
//         name: req.body.name,
//         email: req.body.email,
//         response_midtrans: JSON.stringify(transaction),
//       };
//       Order.create(dataOrder)
//         .then((data) => {
//           res.json({
//             status: true,
//             pesan: "Berhasil Order",
//             data: data,
//             token: transactionToken,
//           });
//         })
//         .catch((err) => {
//           res.json({
//             status: false,
//             pesan: err.message,
//             data: [],
//           });
//         });
//     })
//     .catch((e) => {
//       res.json({
//         status: false,
//         pesan: "Gagal order: " + e.message,
//         data: [],
//       });
//     });
// };

// const updateOrder = async (req, res) => {
//   coreApi.transaction.notification(req.body).then((statusResponse) => {
//     let orderId = statusResponse.order_id;
//     let responseMidtrans = JSON.stringify(statusResponse);

//     Order.update(
//       { response_midtrans: responseMidtrans },
//       {
//         where: { id: orderId },
//       }
//     );
//   });
//   try {
//     res.json({
//       status: true,
//       data: [],
//     });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// const getOrderById = async (req, res) => {
//   coreApi.transaction.status(req.params.order_id).then((statusResponse) => {
//     let responseMidtrans = JSON.stringify(statusResponse);

//     Order.update(
//       { response_midtrans: responseMidtrans },
//       {
//         where: { id: req.params.order_id },
//       }
//     );
//   });
//   try {
//     res.json(statusResponse);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// module.exports = {
//   createOrder,
//   getAllOrder,
//   updateOrder,
//   getOrderById,
// };
