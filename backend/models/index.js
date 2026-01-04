const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const User = require("./users");
const Trip = require("./trips");
const Photo = require("./photos");
const Post = require("./posts");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User=User
db.Trip=Trip
db.Photo=Photo
db.Post=Post

User.init(sequelize)
Trip.init(sequelize)
Photo.init(sequelize)
Post.init(sequelize)

User.associate(db)
Trip.associate(db)
Photo.associate(db)
Post.associate(db)

module.exports = db;
