const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const AdvertisementUpgradeHistory = sequelize.define('AdvertisementUpgradeHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    advertisement_id: {
      type: DataTypes.INTEGER,
    },
    payment_id: {
      type: DataTypes.INTEGER,
    },
    service_type: {
      type: DataTypes.CHAR,
    },
    date_begin: {
      type: DataTypes.DATEONLY,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
      tableName: 'advertisement_upgrade_history'
  });

module.exports = AdvertisementUpgradeHistory