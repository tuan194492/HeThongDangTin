const express = require('express');
const router = express.Router();
const advertisementController = require('../controller/AdvertisementController')

router.post('/', advertisementController.createAdvertisement);
router.get('/my-advertisement', advertisementController.getAllAdvertisements);
router.put('/:id', advertisementController.updateAdvertisementById);
router.get('/:id', advertisementController.getAdvertisementById);
router.delete('/:id', advertisementController.deleteAdvertisementById);


module.exports = router;
