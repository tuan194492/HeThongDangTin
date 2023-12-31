const fileUpload = require("express-fileupload");
const path = require("path");
const { resolve } = require("path");
const absolutePath = resolve("");
const Attachment = require("../models/Attachment");

const uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    file.mv(`${absolutePath}/files/${file.filename}`, (err) => {
      let result;
      if (err) {
        result = {
          success: false,
          data: "Upload file not successful",
        };
        reject(result);
      } else {
        result = {
          success: true,
          data: `/files/${file.name}`,
        };
        resolve(result);
      }
    });
  });
};

const uploadFileForAttachment = async (file, advertisement_id) => {
  return new Promise((resolve, reject) => {
    console.log(file)
    file.mv(`${absolutePath}/files/${file.name}`, (err) => {
      let result;
      if (err) {
        result = {
          success: false,
          data: "Upload file not successful",
        };
        reject(result);
      } else {
        Attachment.create({
          advertisement_id: advertisement_id,
          url: `/files/${file.name}`,
        })
          .then(() => {
            result = {
              success: true,
              data: `/files/${file.name}`,
            };
            resolve(result);
          })
          .catch((err) => {
            reject({
              success: false,
              message: "Upload file failed.",
            });
          });
      }
    });
  });
};

const validateUpload = (req, res, next) => {
  if (!req.files) {
    return res
        .status(400)
        .json({ message: "No files were uploaded"});
  }
  console.log(req.files)
  if (!(req.files.file instanceof Array)) {
    if (!req.files.file.mimetype.startsWith("image")) {
      return res
        .status(400)
        .json({message: "Only image files are allowed" });
    }
  } else {
    if (!req.files || !req.files["file"] || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "No files were uploaded" });
    }

    req.files["file"].forEach((file) => {
      // Check if each uploaded file is an image (MIME types)
      if (!file.mimetype.startsWith("image")) {
        return res
          .status(400)
          .json({ message: "Only image files are allowed" });
      }
    });
  }
  console.log('Still calling next')
  next();
};

const uploadFilesForAttachment = async (files, advertisement_id) => {
  console.log("Upload multipulte file")
  for (let file of files) {
    const res = await uploadFileForAttachment(file, advertisement_id);
    if (!res.success) {
      return {
        success: false
      }
    }
  }
  return {success: true};
};

const findAttachmentsByAdvertisementId = async (advertisement_id) => {
  return Attachment.findAll({
    where: {
      advertisement_id: advertisement_id,
    },
  });
};

module.exports = {
  uploadFiles,
  uploadFileForAttachment,
  uploadFilesForAttachment,
  findAttachmentsByAdvertisementId,
  validateUpload,
};
