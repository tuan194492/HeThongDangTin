const express = require('express');
const router = express.Router();
const advertisementController = require('../controller/AdvertisementController')
const authController = require('../controller/AuthController')
const fileServices = require('../services/FilesServices');

// Guest
router.get('/guest', advertisementController.getAdvertisementForGuest);
router.get('/guest/post/:id', advertisementController.getAdvertisementByIdForGuest);
router.get('/guest/related', advertisementController.getRelatedAdvertisementForGuest);
// Admin And Owner
router.post('/', authController.authenticateToken, fileServices.validateUpload, advertisementController.createAdvertisement);
router.get('/my-advertisement', authController.authenticateToken, advertisementController.getAllAdvertisementsByUserId);
router.get('/all', authController.authenticateToken, authController.authorizeAdmin, advertisementController.getAllAdvertisements);
router.post('/upgrade/:id', authController.authenticateToken, advertisementController.upgradeAdvertisement);
router.post('/approve/:id', authController.authenticateToken, authController.authorizeAdmin, advertisementController.approveAdvertisement);
router.post('/reject/:id', authController.authenticateToken, authController.authorizeAdmin, advertisementController.rejectAdvertisement);
router.put('/:id', authController.authenticateToken, advertisementController.updateAdvertisementById);
router.get('/:id', authController.authenticateToken, advertisementController.getAdvertisementById);
router.delete('/:id', authController.authenticateToken, advertisementController.deleteAdvertisementById);


module.exports = router;
