module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define("products", {
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
  });
  return Product;
};
