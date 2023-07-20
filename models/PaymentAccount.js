const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const PaymentAccount = sequelize.define('PaymentAccount', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance_amt: {
      type: DataTypes.DOUBLE,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
      tableName: 'payment_account'
  });

module.exports = PaymentAccount;