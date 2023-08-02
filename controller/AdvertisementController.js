const { validationResult, check } = require("express-validator");
const User = require("../models/User");
const advertisementServices = require("../services/AdvertisementServices");
const fileServices = require("../services/FilesServices");



const createAdvertisement = async (req, res, next) => {
    try {
        const data = req.body;
        const image = req.files.file;
        console.log('image', image)
        console.log(req.body);
        const advertisement = await advertisementServices.createAdvertisement(data);
        let result = { success: true }
        if (image instanceof Array) {
            result = await fileServices.uploadFilesForAttachment(image, advertisement.id);
        } else {
            result = await fileServices.uploadFileForAttachment(image, advertisement.id);
        }
        if (result.success) {
            res.status(201).json({ message: "Create Advertisement Successful" });
        } else {
            res.status(401).json({ message: "Create Advertisement Failed" });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error creating Advertisement" });
    }
};

const getAllAdvertisementsByUserId = async (req, res, next) => {
    try {
        const result = await advertisementServices.getAllAdvertisementsByUserId(req.user.userId);
        const advertisements = [];
        for (let advertisement of result) {
            const attachmentList = await fileServices.findAttachmentsByAdvertisementId(advertisement.id);
            const attachments = [];
            for (let attachment of attachmentList) {
                attachments.push(attachment.dataValues.url);
            }
            advertisements.push({
                ...advertisement.dataValues,
                attachments: attachments
            })

        }
        res.status(201).json({ message: "Get All Advertisement Successful", data: advertisements });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error getting Advertisement" });
    }
};

const getAllAdvertisements = async (req, res, next) => {
    try {
        
        const result = await advertisementServices.getAllAdvertisements();
        const advertisements = [];
        for (let advertisement of result) {
            const attachmentList = await fileServices.findAttachmentsByAdvertisementId(advertisement.id);
            const attachments = [];
            for (let attachment of attachmentList) {
                attachments.push(attachment.dataValues.url);
            }
            advertisements.push({
                ...advertisement.dataValues,
                attachments: attachments
            })

        }
        res.status(201).json({ message: "Get All Advertisement Successful", data: advertisements });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error getting Advertisement" });
    }
};

const updateAdvertisementById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await advertisementServices.updateAdvertisement(id, data);
        res.status(200).json({
            ...result.dataValues,
            message: 'Update advertisement successful'
        });
    } catch (err) {
        res.status(422).json({
            message: 'Advertisement Not Found'
        })
    }
};

const approveAdvertisement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await advertisementServices.approveAdvertisement(id);
        res.status(200).json({
            ...result.dataValues,
            message: 'Approve advertisement successful'
        });
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Advertisement Not Found'
        })
    }
};

const rejectAdvertisement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await advertisementServices.rejectAdvertisement(id);
        res.status(200).json({
            ...result.dataValues,
            message: 'Reject advertisement successful'
        });
    } catch (err) {
        res.status(422).json({
            message: 'Advertisement Not Found'
        })
    }
};

const getAdvertisementById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await advertisementServices.getAdvertisementById(id);
        const attachmentList = await fileServices.findAttachmentsByAdvertisementId(id);
        const attachments = [];
        for (let attachment of attachmentList) {
            attachments.push(attachment.dataValues.url);
        }
        res.status(200).json({
            ...result.dataValues,
            attachments: attachments,
            message: 'Get advertisement successful'
        });
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Advertisement Not Found'
        })
    }
};

const deleteAdvertisementById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await advertisementServices.deleteAdvertisement(id);
        res.status(200).json({
            message: 'Delete advertisement successful'
        });
    } catch (err) {
        res.status(422).json({
            message: 'Advertisement Not Found'
        })
    }
};

module.exports = {
    createAdvertisement,
    getAllAdvertisements,
    updateAdvertisementById,
    getAdvertisementById,
    deleteAdvertisementById,
    getAllAdvertisementsByUserId,
    approveAdvertisement,
    rejectAdvertisement,
};
