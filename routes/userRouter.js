const express = require('express');
const router = express.Router();
const userController = require('../controller/UserControllers')
const authController = require('../controller/AuthController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/all', authController.authenticateToken , userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);


module.exports = router;
