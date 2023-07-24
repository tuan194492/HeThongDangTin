const fileUpload = require("express-fileupload");
const path = require("path");
const { resolve } = require("path");
const absolutePath = resolve("");
const Attachment = require('../models/Attachment');

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
  }) 

};

const uploadFileForAttachment = async (file, advertisement_id) => {
  return new Promise((resolve, reject) => {
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
          url: `/files/${file.name}`
        }).then(() => {
          result = {
            success: true,
            data: `/files/${file.name}`,
          };
          resolve(result);
        }).catch(err => {
          reject({
            success: false,
            message: 'Upload file failed.'
          })
        })

      }
    });
  })

};

const uploadFilesForAttachment = async (files) => {
  return new Promise((resolve, reject) => {
    let result;
    for (let file in files) {

    }
    resolve(result);

  })

};

const findAttachmentsByAdvertisementId = async (advertisement_id) => {
  return Attachment.findAll({
    where: {
      advertisement_id: advertisement_id
    }
  });
}

module.exports = { uploadFiles, uploadFileForAttachment, uploadFilesForAttachment, findAttachmentsByAdvertisementId };
