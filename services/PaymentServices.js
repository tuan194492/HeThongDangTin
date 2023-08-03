const User = require("../models/User");
const Payment = require("../models/Payment");
const PaymentAccount = require("../models/PaymentAccount");
const sequelize = require('sequelize')
const getPaymentAccountByUserId = async (userId) => {
    return await PaymentAccount.findByPk(userId);
}

const addAmtToPaymentAccountByUserId = async (userId, amt) => {
    console.log("Amttttttttttt", amt)
    const paymentAccount = await PaymentAccount.findByPk(userId);
    await Payment.create({
        user_id: userId,
        type: "Add amt",
        total_amt: Number(amt),
        discount_amt: 0,
        balance_amt: Number(amt) + Number(paymentAccount.balance_amt),
        remark: "Nạp tiền vào tài khoản"

    })
    return await PaymentAccount.update(
        {
            balance_amt: Number(paymentAccount.balance_amt) + Number(amt),
        },
        {
        where: {
            
            id: userId
        }
    })
}

const deductAmtToPaymentAccountByUserId = async (userId, amt, remark) => {
    const paymentAccount = await PaymentAccount.findByPk(userId);
    if (Number(amt) > Number(paymentAccount.balance_amt)) {
        throw new Error("Not enough amt. Please add more.")
    }
    const payment = await Payment.create({
        user_id: userId,
        type: "Upgrade Amt",
        total_amt: Number(amt),
        discount_amt: 0,
        balance_amt: -Number(amt) + Number(paymentAccount.balance_amt),
        remark: remark

    })
    await PaymentAccount.update(
        {
            balance_amt: Number(paymentAccount.balance_amt) - Number(amt),
        },
        {
        where: {
            
            id: userId
        }
    })
    return payment;
}

const getAddAmtToPaymentAccountByUserId = async (userId) => {
    const paymentAccount = await Payment.findAll({
        where: {
            user_id: userId,
            type: "Add amt",
        }
    });
    if (!paymentAccount) {
        throw new Error("Payment history not found");
        }
    return paymentAccount;
    
}

const getPaymentHistory = async (userId) => {
    const paymentAccount = await Payment.findAll({
        where: {
            user_id: userId,
            type: {[sequelize.Op.not]: "Add amt"},
        }
    });
    if (!paymentAccount) {
        throw new Error("Payment history not found");
        }
    return paymentAccount;
    
}

module.exports = {
    getPaymentAccountByUserId,
    addAmtToPaymentAccountByUserId,
    getAddAmtToPaymentAccountByUserId,
    deductAmtToPaymentAccountByUserId,
    getPaymentHistory
}