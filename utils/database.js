const Sequelize = require("sequelize");

const sequelize = new Sequelize("quan_ly_tin", "root", "#Tuan267.", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
 