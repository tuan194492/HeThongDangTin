const express = require('express');
const router = express.Router();
const paymentController = require('../controller/PaymentController')
const authController = require('../controller/AuthController')

router.get('/add-history', authController.authenticateToken, paymentController.getAddAmtToPaymentAccountHistory);
router.get('/:id', authController.authenticateToken, paymentController.getPaymentAccount);
router.post('/:id', authController.authenticateToken, paymentController.addAmtToPaymentAccount);

module.exports = router;