const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController')


router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/admin', authController.createAdmin);

module.exports = router;
