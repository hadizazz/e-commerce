module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("reviews", {
    product_id: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Review;
};
