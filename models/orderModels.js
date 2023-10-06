module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
     id:{
        type: DataTypes.STRING,
        primaryKey: true
     },
     name:{
        type: DataTypes.STRING
     },
     email:{
        type: DataTypes.STRING
     },
     response_midtrans:{
        type: DataTypes.TEXT
     }
    });
    return Order;
  };
  