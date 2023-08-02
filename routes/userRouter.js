const express = require('express');
const router = express.Router();
const userController = require('../controller/UserControllers')
const authController = require('../controller/AuthController')
const fileUtils = require('../utils/FileUtils')

router.get('/all', authController.authenticateToken, authController.authorizeAdmin, userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
