const express = require('express')
const cors = require ('cors')
const app = express();
const cookieSession = require("cookie-session");

const db = require("./config/database.js");
const Role = db.role;
const productRouter = require('./routes/index.js')
const reviewRouter = require ('./routes/reviewRoutes.js')
const transactionRouter = require('./routes/transactionRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')

app.use(cors());
app.use(express.json());
app.use('/products', productRouter)
app.use('/review', reviewRouter)
app.use('/transaction', transactionRouter)
app.use('/order', orderRouter)
app.use("/image", express.static('./image'))
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);

app.listen(3001, () => console.log ('Server Up and Running... '));