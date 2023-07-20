const sequelize = require('./database')

const User = require('../models/User');
const PaymentAccount = require('../models/PaymentAccount');
const Payment = require('../models/Payment');
const Advertisement = require('../models/Advertisement');
const Attachment = require('../models/Attachment');
const UserAdvertisement = require('../models/UserAdvertisement');
const AdvertisementUpgradeOutstanding = require('../models/AdvertisementUpgradeOutstanding');
const AdvertisementUpgradeHistory = require('../models/AdvertisementUpgradeHistory');

const databaseInit = () => {
    sequelize.sync()
        .then(() => {
            console.log('Models synchronized with the database.');
            // You can start your Express server or perform other operations here
        })
        .catch((error) => {
            console.error('Error synchronizing models:', error);
        });
}

module.exports = databaseInit