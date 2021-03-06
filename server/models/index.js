//const config = require("../config/db.config.js");
//const env = require("../config/db.heroku.js");

const Sequelize = require("sequelize");

/*{
  database: env.database,
  username: env.username,
  password: env.password,
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
  operatorsAliases: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
}*/

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

/*const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});*/



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.article = require("../models/article.model.js")(sequelize, Sequelize);
db.articleimg = require("../models/articleimg.model.js")(sequelize, Sequelize);
db.articlecom = require("../models/articlecom.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.productimg = require("../models/productimg.model.js")(sequelize, Sequelize);
db.productcom = require("../models/productcom.model.js")(sequelize, Sequelize);
db.productrating = require("../models/product_rating.model.js")(
  sequelize,
  Sequelize
);
db.mail = require("../models/mail.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
