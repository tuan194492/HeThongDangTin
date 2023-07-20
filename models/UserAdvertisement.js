const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const UserAdvertisement = sequelize.define('UserAdvertisement', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    advertisement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type: {
      type: DataTypes.CHAR,
    },
  },
  {
      tableName: 'user_advertisement'
  });

module.exports = UserAdvertisement