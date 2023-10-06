const dbconfig = require('../config/database.js');
const a = require("./productModels.js");
const b = require('./reviewModels.js');
const userModels = require("./userModels.js");
const roleModels = require("./roleModels.js")
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorsAliases: false,
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.login = userModels(sequelize, DataTypes);
db.role = roleModels(sequelize, DataTypes);
db.products = a(sequelize, DataTypes);
db.reviews = b(sequelize, DataTypes);
db.transaction = require('./transactionModels.js')(sequelize, DataTypes);
db.order = require('./orderModels.js')(sequelize, DataTypes);
db.role.belongsToMany(db.login, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.login.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  db.ROLES = ["user", "admin", "moderator"];

  
  db.products.hasMany(db.reviews, {
      foreignKey: 'product_id',
      as: 'review'
    })
    db.reviews.belongsTo(db.products, {
        foreignKey: 'product_id',
        as: 'product'
    })
    db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
module.exports = db