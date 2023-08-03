
const { Op } = require('sequelize');
const User = require("../models/User");
const PaymentAccount = require("../models/PaymentAccount");
const AdvertisementUpgradeOutstanding = require("../models/AdvertisementUpgradeOutstanding");
const AdvertisementUpgradeHistory = require("../models/AdvertisementUpgradeHistory");
const userService = require("../services/UserServices");
const fileServices = require("../services/FilesServices");
const paymentService = require("../services/PaymentServices");
const pricePerHour = 10000;


const getPaymentAccount = async (req, res) => {
    try {
        const result = await paymentService.getPaymentAccountByUserId(req.user.userId);
        console.log('REsult', req.user.userId, result)
        res.status(200).json({ message: "Get Payment Account Successful", data: result });
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Some error happened. Please try again later!'
        })
    }   
}


const addAmtToPaymentAccount = async (req, res) => {
    try {
        const {amt} = req.body;
        await paymentService.addAmtToPaymentAccountByUserId(req.user.userId, amt);
        res.status(200).json({ message: "Nạp tiền thành công"});
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Some error happened. Please try again later!'
        })
    }   
}

const getAddAmtToPaymentAccountHistory = async (req, res) => {
    try {
        const list = await paymentService.getAddAmtToPaymentAccountByUserId(req.user.userId);
        res.status(200).json({ message: "Get list successful", list});
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Some error happened. Please try again later!'
        })
    }   
}

const getPaymentAccountHistory = async (req, res) => {
    try {
        const list = await paymentService.getPaymentHistory(req.user.userId);
        let returnResult = []
        for (let element of list) {
            const res = await AdvertisementUpgradeOutstanding.findOne({
                where: {
                    payment_id: element.id
                }
            })      
            if (res) {
                returnResult = [...returnResult, {...element.dataValues, dateBegin: res.date_begin, duration: res.duration / 3600}];
            }
            const res2 = await AdvertisementUpgradeHistory.findOne({
                where: {
                    payment_id: element.id
                }
            })      
            if (res2) {
                returnResult = [...returnResult, {...element.dataValues, dateBegin: res2.date_begin, duration: res2.duration / 3600}];
            }
        }
        res.status(200).json({ message: "Get list successful", list: returnResult});
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Some error happened. Please try again later!'
        })
    }   
}

module.exports = {
    getPaymentAccount,
    addAmtToPaymentAccount,
    getAddAmtToPaymentAccountHistory,
    getPaymentAccountHistory
}