const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const Attachment = sequelize.define('Attachment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    advertisement_id: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
      tableName: 'attachment'
  });

module.exports = Attachment