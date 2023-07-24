const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const Advertisement = sequelize.define('Advertisement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    publish_user_id: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.CHAR,
    },
    title: { 
      type: DataTypes.TEXT,
    },
    remark: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    area: {
      type: DataTypes.DOUBLE,
    }
  },
  {
      tableName: 'advertisement'
  });

module.exports = Advertisement