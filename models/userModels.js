module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define("users", {
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    user_name:{
      type: DataTypes.STRING
    },
    // birth_date:{
    //   type: DataTypes.STRING
    // },
    gender:{
      type: DataTypes.STRING
    },
    phone_number:{
      type: DataTypes.INTEGER
    }
  });
  return Login;
};
