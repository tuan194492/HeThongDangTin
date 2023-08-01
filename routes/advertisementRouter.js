const express = require('express');
const router = express.Router();
const advertisementController = require('../controller/AdvertisementController')
const authController = require('../controller/AuthController')
const fileServices = require('../services/FilesServices');

router.post('/', authController.authenticateToken, fileServices.validateUpload, advertisementController.createAdvertisement);
router.get('/my-advertisement', authController.authenticateToken, advertisementController.getAllAdvertisements);
router.put('/:id', authController.authenticateToken, advertisementController.updateAdvertisementById);
router.get('/:id', authController.authenticateToken, advertisementController.getAdvertisementById);
router.delete('/:id', authController.authenticateToken, advertisementController.deleteAdvertisementById);


module.exports = router;
