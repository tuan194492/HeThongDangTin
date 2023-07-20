const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')
// Define User model
const User = sequelize.define('User', {
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
    type: DataTypes.BLOB,
  },
  created_at: {
    type: DataTypes.DATE,
  },
},
    {
        tableName: 'user'
    }
);

module.exports = User;