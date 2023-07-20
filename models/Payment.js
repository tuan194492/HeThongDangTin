const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    total_amt: {
      type: DataTypes.DOUBLE,
    },
    discount_amt: {
      type: DataTypes.DOUBLE,
    },
    balance_amt: {
      type: DataTypes.DOUBLE,
    },
    remark: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
      tableName: 'payment'
  });

module.exports = Payment