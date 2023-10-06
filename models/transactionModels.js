module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    fullAddress: {
      type: DataTypes.STRING,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    subTotal: {
      type: DataTypes.INTEGER,
    },
    price:{
        type: DataTypes.STRING
    },
    total: {
      type: DataTypes.INTEGER,
    },
    shipping: {
      type: DataTypes.STRING,
    },
    shippingPrice: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return Transaction;
};
