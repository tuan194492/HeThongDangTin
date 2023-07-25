const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../utils/database");
const USER_STATUS = require("../enum/USER_STATUS");
// Define User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    zalo_number: {
      type: DataTypes.STRING,
    },
    facebook: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.CHAR,
      default: USER_STATUS.ACTIVE
    }
  },
  {
    tableName: "user", 
  }
);

module.exports = User;
